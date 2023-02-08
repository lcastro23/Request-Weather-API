let searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", onSubmit);

let profileDiv = document.createElement("div");
document.body.appendChild(profileDiv);

		displayLastSearch();

		function onSubmit(event)
		{
			let cityName = document.getElementById("city").value;

			fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=cf768bb3798b3ea838e0beb817cf9fc7`).then
			(
				(response) => response.json()
			).then
			(
				constructWeatherInfo
			).catch
			(
				(err) => alert("That city name is invalid")
			);

			event.preventDefault();
		}

		function constructWeatherInfo(data)
		{
			profileDiv.innerHTML = "";

			constructWeatherElement("City", data.name);
			constructWeatherElement("Country", data.sys.country);
			constructWeatherElement("Currently", data.main.temp);
			constructWeatherElement("Low", data.main.temp_min);
			constructWeatherElement("High", data.main.temp_max);
			constructWeatherElement("Weather", data.weather[0].description);
		}

		function constructWeatherElement(name, value)
		{
			if(value != null)
			{
				localStorage.setItem(name, value);

				let element = document.createElement("p");
				let textValue = document.createTextNode(name + ":  " + value);
				element.appendChild(textValue);
				profileDiv.appendChild(element);
			}
		}

		function displayLastSearch()
		{
			if(localStorage.getItem("City") != null)
			{
				constructWeatherElement("City", localStorage.getItem("City"));
				constructWeatherElement("Country", localStorage.getItem("Country"));
				constructWeatherElement("Currently", localStorage.getItem("Currently"));
				constructWeatherElement("Low", localStorage.getItem("Low"));
				constructWeatherElement("High", localStorage.getItem("High"));
				constructWeatherElement("Weather", localStorage.getItem("Weather"));
			}
		}
