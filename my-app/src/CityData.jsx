// CityData.jsx

// import pharmacyIcon from './icons/pharmacy-icon.png';
import hospitalIcon from './icons/hospital-icon.png';
// import churchIcon from './icons/pharmacy-icon.png';
import libraryIcon from './icons/library-icon.png';
import groceryIcon from './icons/grocery-icon.png';
import schoolIcon from './icons/school-icon.png';
import {FirstAid, BookOpen, ShoppingCartSimple, GraduationCap} from "@phosphor-icons/react";


export const cityPointLayers = [
  // {
  //   id: 'pharmacies',
  //   source: 'pharmacies',
  //   visibility: true,
  //   color: '#D08770',
  //   title:'Pharmacies',
  //   icon: pharmacyIcon
  // },
  {
    id: 'hospitals',
    source: 'hospitals',
    visibility: false, // set to false to control EyeSlash icon
    color: '#EF6074',
    title: 'Hospitals',
    icon: hospitalIcon,
    title: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FirstAid size={24} weight="fill" /> 
        <span style={{ marginLeft: 8 }}>Hospitals</span>
      </div>
    )
  },
  // {
  //   id: 'churches',
  //   source: 'churches',
  //   color: '#5E81AC',
  //   visibility: true,
  //   title:'Churches',
  //   icon: churchIcon
  // },
  {
    id: 'libraries',
    source: 'libraries',
    visibility: false,
    color: '#40B2AA',
    title: (<div style={{ display: 'flex', alignItems: 'center' }}>
    <BookOpen size={24} weight="fill" /> 
    <span style={{ marginLeft: 8 }}>Libraries</span>
  </div>),
    icon: libraryIcon
  },
  {
    id: 'grocery',
    source: 'grocery',
    visibility: false,
    color: '#A9C213',
    title:(<div style={{ display: 'flex', alignItems: 'center' }}>
    <ShoppingCartSimple size={24} weight="fill" /> 
    <span style={{ marginLeft: 8 }}>Libraries</span>
  </div>),
    icon: groceryIcon
  },
  {
    id: 'schools',
    source: 'schools',
    visibility: false,
    color: '#3269B1',
    title:(<div style={{ display: 'flex', alignItems: 'center' }}>
    <GraduationCap size={24} weight="fill" /> 
    <span style={{ marginLeft: 8 }}>Schools</span>
  </div>),
    icon: schoolIcon
  },
];

export const addCityPointLayers = (map) => {
  cityPointLayers.forEach(layer => {
    map.addSource(layer.id, {
      type: 'geojson',
      data: `https://raw.githubusercontent.com/crescendochu/data-visualization/main/data/Seattle_GeoData_Points/Seattle_${layer.id}_centroids.geojson`
    });
    
    map.loadImage(
      layer.icon,
      function(error, image) {
        if (error) throw error;
        map.addImage(layer.icon, image);
      
        map.addLayer({
          id: layer.id,
          type: 'symbol',
          source: layer.id,
          layout: {
            'icon-image': layer.icon,
            'icon-size': 0.5,
            visibility: 'none'
          }
        });
      }
    );
  });
};
