# Sidewalk-Access-Score-FP
## Deployment Page
https://cse512-23s.github.io/Sidewalk-Access-Score-FP/

## Intro
The increasing importance of complying with the Americans with Disabilities Act (ADA) has created a need for effective decision-making tools to aid in prioritization and planning. Our project aims to address this challenge by developing an interactive visualization dashboard that leverages data from [Project Sidewalk](projectsidewalk.org), an open-source crowd-sourcing platform. Project Sidewalk is an open-source crowdsourcing platform where online users remotely label sidewalk features in Google Street View (GSV), including curb ramps, missing curb ramps, obstacles, surface problems, and missing sidewalks. For each label, users can provide a severity rating on a 5-point scale (5 is most severe and represents a non-passable barrier for wheelchair users).

To enhance the accuracy and depth of our analysis, we cross-reference Project Sidewalk's Seattle dataset with data from the [Seattle Open Data Portal](https://data.seattle.gov/), [Open Street Maps](https://www.openstreetmap.org/), and the [American Community Survey](https://www.census.gov/programs-surveys/acs/news/data-releases.html). These additional datasets provide valuable information on public facilities and neighborhood socioeconomic factors. By integrating multiple data sources, we can triangulate maps to identify areas of immediate need, supporting effective decision-making. Our platform combines visual techniques including spatial visualization, dynamic filtering, and interactive querying.

## Key Functionalities and Interactions
The data visualization dashboard comprises two modes: explore and analysis. Here is a flow diagram of the [Key Tasks and Interactions](https://github.com/cse512-23s/Sidewalk-Access-Score-FP/assets/60413478/c8dddd56-5c70-492f-b3ca-e949c3041472).
### Explore Mode:
In the explore mode, users can access the raw Project Sidewalk labels of the five different types of sidewalk features and apply various filters based on different attributes. Additionally, users can enable data points for public facilities and filter them based on wheelchair accessibility. A unique feature is the creation of access shed visualizations, which highlight sidewalk problems within a defined range of a specified location. 
### Analysis Mode:
The analysis mode offers three types of analysis:
- **Access Score Analysis:** <br>
This analysis considers the different types of labels and their severity within a specific geographical unit, such as a sidewalk segment or census block group. The system calculates an average access score, ranging from -1 (least accessible) to 0 (most accessible). Users can customize their access score results by adjusting the weights assigned to different label types.
- **ADA Transition Prioritization Mode:** <br>
In this mode, users can choose specific factors to prioritize the fixing of curb ramps. Factors such as population density, transit locations, public facility locations, percentage of people with disabilities, and low-income neighborhoods can be considered. The visualization categorizes missing curb ramps into five priority groups, with group 1 representing the most urgent problems. Fixing the ramps in this group would address the user-selected factors. (Please note that this feature is currently under development, and all factor combinations yield the same result at present.)
- **Correlation Analysis:** <br>
Users can compare a sidewalk feature with a socioeconomic factor by generating a scatter plot with a regression line. Various sidewalk features can be compared with socioeconomic factors such as population density, income per capita, median gross rent, and the percentage of people who walk to work.


Our project aims to contribute to the field of urban accessibility visualization and support cities, communities, and advocacy groups in their ADA transition plans. By providing an intuitive and comprehensive visualization platform, we aim to empower stakeholders, especially those with limited resources and expertise in data science and geospatial analysis, to make informed decisions and improve urban accessibility for all.


