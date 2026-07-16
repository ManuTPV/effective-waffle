const API_URL = "./api/dashboard.json";

let dashboardData = null;

let currentSlide = 0;

let rotationTimer = null;

const REFRESH_INTERVAL = 60 * 1000;


// DOM elements

const siteName =
    document.getElementById("siteName");

const locationElement =
    document.getElementById("location");

const slideImage =
    document.getElementById("slideImage");

const slideTitle =
    document.getElementById("slideTitle");

const slideDescription =
    document.getElementById("slideDescription");

const slideCounter =
    document.getElementById("slideCounter");

const statusMessage =
    document.getElementById("statusMessage");

const lastUpdated =
    document.getElementById("lastUpdated");

const connectionIndicator =
    document.getElementById("connectionIndicator");

const connectionText =
    document.getElementById("connectionText");


// Application startup

startApplication();


async function startApplication() {

    await loadDashboardData();

    startAutomaticRefresh();

    setupNavigation();

    setupConnectionMonitoring();

}


// Load dashboard data

async function loadDashboardData() {

    try {

        const response =
            await fetch(API_URL, {
                cache: "no-store"
            });

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }

dashboardData =
    await response.json();

cacheDashboardData(
    dashboardData
);

renderDashboard();

        updateConnectionStatus(true);

    }

    catch (error) {

        console.warn(
            "Network request failed",
            error
        );

        updateConnectionStatus(false);

        await loadCachedDashboardData();

    }

}


// Cache data locally in localStorage

function cacheDashboardData(data) {

    localStorage.setItem(
        "dashboard-data",
        JSON.stringify(data)
    );

}


// Load locally cached data

async function loadCachedDashboardData() {

    const cachedData =
        localStorage.getItem(
            "dashboard-data"
        );


    if (!cachedData) {

        console.error(
            "No cached dashboard data available"
        );

        return;

    }


    dashboardData =
        JSON.parse(cachedData);


    console.log(
        "Dashboard data loaded from local cache"
    );


    renderDashboard();

}


// Render the current dashboard

function renderDashboard() {

    if (!dashboardData) {

        return;

    }


    siteName.textContent =
        dashboardData.site.name;


    locationElement.textContent =
        dashboardData.site.location;


    statusMessage.textContent =
        dashboardData.status.message;


    lastUpdated.textContent =
        `Updated: ${dashboardData.updatedAt}`;


    renderCurrentSlide();

}


// Render current slide

function renderCurrentSlide() {

    const slides =
        dashboardData.slides;


    const slide =
        slides[currentSlide];


    slideImage.src =
        slide.image;


    slideImage.alt =
        slide.title;


    slideTitle.textContent =
        slide.title;


    slideDescription.textContent =
        slide.description;


    slideCounter.textContent =
        `${currentSlide + 1} / ${slides.length}`;


    restartRotationTimer(
        slide.duration
    );

}


// Next slide

function nextSlide() {

    currentSlide++;

    if (
        currentSlide >=
        dashboardData.slides.length
    ) {

        currentSlide = 0;

    }


    renderCurrentSlide();

}


// Previous slide

function previousSlide() {

    currentSlide--;

    if (currentSlide < 0) {

        currentSlide =
            dashboardData.slides.length - 1;

    }


    renderCurrentSlide();

}


// Automatic rotation

function restartRotationTimer(
    duration
) {

    clearTimeout(
        rotationTimer
    );


    rotationTimer =
        setTimeout(
            nextSlide,
            duration
        );

}


// Keyboard / remote control navigation
const errorMessage =
    document.getElementById(
        "errorMessage"
    );

function setupNavigation() {

    document.addEventListener(
        "keydown",
        event => {

            switch (event.key) {

                case "ArrowRight":

                case "Enter":

                    nextSlide();

                    break;


                case "ArrowLeft":

                    previousSlide();

                    break;

            }

        }
    );


    document
        .getElementById(
            "nextButton"
        )
        .addEventListener(
            "click",
            nextSlide
        );


    document
        .getElementById(
            "previousButton"
        )
        .addEventListener(
            "click",
            previousSlide
        );

}


// Refresh API periodically

function startAutomaticRefresh() {

    setInterval(

        loadDashboardData,

        REFRESH_INTERVAL

    );

}


// Network status

function setupConnectionMonitoring() {

    window.addEventListener(

        "online",

        () => {

            updateConnectionStatus(
                true
            );

            loadDashboardData();

        }

    );


    window.addEventListener(

        "offline",

        () => {

            updateConnectionStatus(
                false
            );

        }

    );


    updateConnectionStatus(
        navigator.onLine
    );

}


// Display network status

function updateConnectionStatus(
    online
) {

    if (online) {

        connectionText.textContent =
            "Online";

        connectionIndicator
            .classList
            .remove(
                "offline"
            );

    }

    else {

        connectionText.textContent =
            "Offline";

        connectionIndicator
            .classList
            .add(
                "offline"
            );

    }

}
