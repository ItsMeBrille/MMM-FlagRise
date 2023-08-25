Module.register("MMM-FlagRise", {
    // Default module config
    defaults: {
        city: "Oslo", // Default city
        summerMonths: [3, 4, 5, 6, 7, 8, 9, 10], // Months with daylight saving time
    },

    // Initialize module data
    start: function () {
        this.sunTimes = null;
        this.flagIsUp = false; // Flag state
        this.fetchingSunTimes = true; // Indicates if sun times are being fetched
        this.getSunTimes(); // Fetch sun times immediately
        this.scheduleFlagUpdates();
        this.scheduleSunTimeUpdates();
    },

    // Schedule flag updates
    scheduleFlagUpdates: function () {
        const self = this;
        setInterval(function () {
            self.updateFlag();
        }, 60000); // Update flag every minute
    },

    // Schedule sun time updates every 20 hours
    scheduleSunTimeUpdates: function () {
        const self = this;
        setInterval(function () {
            self.getSunTimes();
        }, 72000000); // Update sun times every 20 hours
    },

    // Update the flag state
    updateFlag: function () {
        const now = new Date();
        const sunrise = this.sunTimes ? new Date(this.sunTimes.sun_rise) : null;
        const sunset = this.sunTimes ? new Date(this.sunTimes.sun_set) : null;

        if (sunrise && sunset) {
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const isSummerMonth = this.config.summerMonths.includes(now.getMonth() + 1);

            if (isSummerMonth && hours >= 8 && hours < sunset.getHours()) {
                this.flagIsUp = true; // Flag should be up
            } else if (isSummerMonth && hours === sunset.getHours() && minutes <= sunset.getMinutes()) {
                this.flagIsUp = true; // Flag should be up until sunset
            } else if (!isSummerMonth || hours >= 21) {
                this.flagIsUp = false; // Flag should be down
            } else {
                this.flagIsUp = false; // Flag should be down by default
            }
        }

        this.updateDom();
    },

    // Override dom generator
    getDom: function () {
        const wrapper = document.createElement("div");

        if (this.sunTimes && this.flagIsUp) {
            const flagImage = document.createElement("img");
            flagImage.src = "modules/MMM-FlagRise/flag.png"; // Path to the flag image
            flagImage.alt = "Norwegian Flag";
            flagImage.className = "flag-image"; // CSS class for styling
            wrapper.appendChild(flagImage);
        }

        return wrapper;
    },

    // Get sunrise and sunset times using the provided API
    getSunTimes: function () {
        const self = this;

        fetch(`https://steder-api.no/api?q=${encodeURIComponent(self.config.city)}&include_sun_times=1`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                self.sunTimes = data.sun_times;
                self.fetchingSunTimes = false; // Sun times are fetched
                self.updateFlag();
            })
            .catch(function (error) {
                console.error("Error fetching sun times:", error);
                self.fetchingSunTimes = false; // Failed to fetch sun times
                self.updateDom();
            });
    },

    // Load CSS file
    getStyles: function () {
        return ["MMM-FlagRise.css"];
    },
});  