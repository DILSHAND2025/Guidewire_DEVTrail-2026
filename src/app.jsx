import { useState, useEffect, useCallback, useRef } from "react";

// ─── ALL INDIA STATES + DISTRICTS ─────────────────────────────────────────────
const INDIA_DATA = {
  "Tamil Nadu": [
    {id:"tn-ariyalur",name:"Ariyalur",lat:11.14,lon:79.08,flood:false,safe:true},
    {id:"tn-chengalpattu",name:"Chengalpattu",lat:12.69,lon:79.98,flood:true,safe:false},
    {id:"tn-chennai",name:"Chennai",lat:13.08,lon:80.27,flood:true,safe:false},
    {id:"tn-coimbatore",name:"Coimbatore",lat:11.02,lon:76.96,flood:false,safe:true},
    {id:"tn-cuddalore",name:"Cuddalore",lat:11.74,lon:79.77,flood:true,safe:false},
    {id:"tn-dharmapuri",name:"Dharmapuri",lat:12.14,lon:78.16,flood:false,safe:true},
    {id:"tn-dindigul",name:"Dindigul",lat:10.36,lon:77.97,flood:false,safe:true},
    {id:"tn-erode",name:"Erode",lat:11.34,lon:77.72,flood:false,safe:true},
    {id:"tn-kallakurichi",name:"Kallakurichi",lat:11.74,lon:78.96,flood:false,safe:true},
    {id:"tn-kancheepuram",name:"Kancheepuram",lat:12.82,lon:79.69,flood:true,safe:false},
    {id:"tn-karur",name:"Karur",lat:10.96,lon:78.08,flood:false,safe:true},
    {id:"tn-krishnagiri",name:"Krishnagiri",lat:12.52,lon:78.21,flood:false,safe:true},
    {id:"tn-madurai",name:"Madurai",lat:9.93,lon:78.12,flood:false,safe:false},
    {id:"tn-mayiladuthurai",name:"Mayiladuthurai",lat:11.10,lon:79.65,flood:true,safe:false},
    {id:"tn-nagapattinam",name:"Nagapattinam",lat:10.77,lon:79.84,flood:true,safe:false},
    {id:"tn-namakkal",name:"Namakkal",lat:11.22,lon:78.17,flood:false,safe:true},
    {id:"tn-nilgiris",name:"Nilgiris",lat:11.49,lon:76.73,flood:false,safe:true},
    {id:"tn-perambalur",name:"Perambalur",lat:11.23,lon:78.88,flood:false,safe:true},
    {id:"tn-pudukkottai",name:"Pudukkottai",lat:10.38,lon:78.82,flood:false,safe:true},
    {id:"tn-ramanathapuram",name:"Ramanathapuram",lat:9.36,lon:78.84,flood:true,safe:false},
    {id:"tn-ranipet",name:"Ranipet",lat:12.92,lon:79.33,flood:false,safe:true},
    {id:"tn-salem",name:"Salem",lat:11.66,lon:78.15,flood:false,safe:true},
    {id:"tn-sivaganga",name:"Sivaganga",lat:9.85,lon:78.48,flood:false,safe:true},
    {id:"tn-tenkasi",name:"Tenkasi",lat:8.96,lon:77.32,flood:false,safe:true},
    {id:"tn-thanjavur",name:"Thanjavur",lat:10.79,lon:79.14,flood:true,safe:false},
    {id:"tn-theni",name:"Theni",lat:10.01,lon:77.48,flood:false,safe:true},
    {id:"tn-thoothukudi",name:"Thoothukudi",lat:8.76,lon:78.13,flood:true,safe:false},
    {id:"tn-tiruchirappalli",name:"Tiruchirappalli",lat:10.79,lon:78.70,flood:false,safe:false},
    {id:"tn-tirunelveli",name:"Tirunelveli",lat:8.71,lon:77.76,flood:false,safe:false},
    {id:"tn-tirupathur",name:"Tirupathur",lat:12.50,lon:78.57,flood:false,safe:true},
    {id:"tn-tiruppur",name:"Tiruppur",lat:11.11,lon:77.34,flood:false,safe:true},
    {id:"tn-tiruvallur",name:"Tiruvallur",lat:13.14,lon:79.91,flood:true,safe:false},
    {id:"tn-tiruvannamalai",name:"Tiruvannamalai",lat:12.23,lon:79.07,flood:false,safe:true},
    {id:"tn-tiruvarur",name:"Tiruvarur",lat:10.77,lon:79.64,flood:true,safe:false},
    {id:"tn-vellore",name:"Vellore",lat:12.92,lon:79.13,flood:false,safe:true},
    {id:"tn-viluppuram",name:"Viluppuram",lat:11.94,lon:79.49,flood:false,safe:false},
    {id:"tn-virudhunagar",name:"Virudhunagar",lat:9.59,lon:77.95,flood:false,safe:true},
    {id:"tn-kanniyakumari",name:"Kanniyakumari",lat:8.09,lon:77.54,flood:true,safe:false},
  ],
  "Karnataka": [
    {id:"ka-bagalkot",name:"Bagalkot",lat:16.18,lon:75.70,flood:false,safe:true},
    {id:"ka-bangalore",name:"Bengaluru Urban",lat:12.97,lon:77.59,flood:false,safe:true},
    {id:"ka-bangalore-rural",name:"Bengaluru Rural",lat:13.21,lon:77.50,flood:false,safe:true},
    {id:"ka-belagavi",name:"Belagavi",lat:15.85,lon:74.50,flood:true,safe:false},
    {id:"ka-bellary",name:"Ballari",lat:15.14,lon:76.92,flood:false,safe:true},
    {id:"ka-bidar",name:"Bidar",lat:17.91,lon:77.52,flood:false,safe:true},
    {id:"ka-chamarajanagar",name:"Chamarajanagar",lat:11.92,lon:76.94,flood:false,safe:true},
    {id:"ka-chikballapur",name:"Chikballapur",lat:13.43,lon:77.73,flood:false,safe:true},
    {id:"ka-chikmagalur",name:"Chikkamagaluru",lat:13.32,lon:75.78,flood:false,safe:true},
    {id:"ka-chitradurga",name:"Chitradurga",lat:14.23,lon:76.40,flood:false,safe:true},
    {id:"ka-dakshina-kannada",name:"Dakshina Kannada",lat:12.84,lon:75.25,flood:true,safe:false},
    {id:"ka-davanagere",name:"Davanagere",lat:14.46,lon:75.92,flood:false,safe:true},
    {id:"ka-dharwad",name:"Dharwad",lat:15.46,lon:75.01,flood:false,safe:true},
    {id:"ka-gadag",name:"Gadag",lat:15.42,lon:75.63,flood:false,safe:true},
    {id:"ka-gulbarga",name:"Kalaburagi",lat:17.33,lon:76.82,flood:false,safe:false},
    {id:"ka-hassan",name:"Hassan",lat:13.00,lon:76.10,flood:false,safe:true},
    {id:"ka-haveri",name:"Haveri",lat:14.79,lon:75.40,flood:false,safe:true},
    {id:"ka-kodagu",name:"Kodagu",lat:12.42,lon:75.74,flood:true,safe:false},
    {id:"ka-kolar",name:"Kolar",lat:13.14,lon:78.13,flood:false,safe:true},
    {id:"ka-koppal",name:"Koppal",lat:15.35,lon:76.15,flood:false,safe:true},
    {id:"ka-mandya",name:"Mandya",lat:12.52,lon:76.90,flood:false,safe:true},
    {id:"ka-mysore",name:"Mysuru",lat:12.30,lon:76.65,flood:false,safe:true},
    {id:"ka-raichur",name:"Raichur",lat:16.21,lon:77.36,flood:true,safe:false},
    {id:"ka-ramanagara",name:"Ramanagara",lat:12.72,lon:77.28,flood:false,safe:true},
    {id:"ka-shimoga",name:"Shivamogga",lat:13.93,lon:75.56,flood:true,safe:false},
    {id:"ka-tumkur",name:"Tumakuru",lat:13.34,lon:77.10,flood:false,safe:true},
    {id:"ka-udupi",name:"Udupi",lat:13.34,lon:74.74,flood:true,safe:false},
    {id:"ka-uttara-kannada",name:"Uttara Kannada",lat:14.80,lon:74.68,flood:true,safe:false},
    {id:"ka-vijayapura",name:"Vijayapura",lat:16.83,lon:75.72,flood:false,safe:true},
    {id:"ka-yadgir",name:"Yadgir",lat:16.77,lon:77.14,flood:false,safe:false},
  ],
  "Maharashtra": [
    {id:"mh-ahmednagar",name:"Ahmednagar",lat:19.09,lon:74.74,flood:false,safe:true},
    {id:"mh-akola",name:"Akola",lat:20.70,lon:77.00,flood:false,safe:true},
    {id:"mh-amravati",name:"Amravati",lat:20.93,lon:77.75,flood:false,safe:true},
    {id:"mh-aurangabad",name:"Chhatrapati Sambhajinagar",lat:19.88,lon:75.32,flood:false,safe:true},
    {id:"mh-beed",name:"Beed",lat:18.99,lon:75.76,flood:false,safe:true},
    {id:"mh-bhandara",name:"Bhandara",lat:21.17,lon:79.65,flood:true,safe:false},
    {id:"mh-buldhana",name:"Buldhana",lat:20.53,lon:76.18,flood:false,safe:true},
    {id:"mh-chandrapur",name:"Chandrapur",lat:19.95,lon:79.30,flood:false,safe:false},
    {id:"mh-dhule",name:"Dhule",lat:20.90,lon:74.78,flood:false,safe:true},
    {id:"mh-gadchiroli",name:"Gadchiroli",lat:20.18,lon:80.00,flood:true,safe:false},
    {id:"mh-gondia",name:"Gondia",lat:21.46,lon:80.20,flood:true,safe:false},
    {id:"mh-hingoli",name:"Hingoli",lat:19.72,lon:77.15,flood:false,safe:true},
    {id:"mh-jalgaon",name:"Jalgaon",lat:21.00,lon:75.57,flood:false,safe:true},
    {id:"mh-jalna",name:"Jalna",lat:19.84,lon:75.88,flood:false,safe:true},
    {id:"mh-kolhapur",name:"Kolhapur",lat:16.70,lon:74.24,flood:true,safe:false},
    {id:"mh-latur",name:"Latur",lat:18.40,lon:76.56,flood:false,safe:true},
    {id:"mh-mumbai",name:"Mumbai",lat:19.08,lon:72.88,flood:true,safe:false},
    {id:"mh-mumbai-suburban",name:"Mumbai Suburban",lat:19.10,lon:72.85,flood:true,safe:false},
    {id:"mh-nagpur",name:"Nagpur",lat:21.15,lon:79.09,flood:false,safe:true},
    {id:"mh-nanded",name:"Nanded",lat:19.16,lon:77.32,flood:false,safe:true},
    {id:"mh-nandurbar",name:"Nandurbar",lat:21.37,lon:74.24,flood:false,safe:false},
    {id:"mh-nashik",name:"Nashik",lat:19.99,lon:73.79,flood:false,safe:true},
    {id:"mh-osmanabad",name:"Dharashiv",lat:18.18,lon:76.04,flood:false,safe:true},
    {id:"mh-palghar",name:"Palghar",lat:19.70,lon:72.77,flood:true,safe:false},
    {id:"mh-parbhani",name:"Parbhani",lat:19.27,lon:76.78,flood:false,safe:true},
    {id:"mh-pune",name:"Pune",lat:18.52,lon:73.86,flood:false,safe:true},
    {id:"mh-raigad",name:"Raigad",lat:18.52,lon:73.18,flood:true,safe:false},
    {id:"mh-ratnagiri",name:"Ratnagiri",lat:16.99,lon:73.30,flood:true,safe:false},
    {id:"mh-sangli",name:"Sangli",lat:16.86,lon:74.57,flood:true,safe:false},
    {id:"mh-satara",name:"Satara",lat:17.69,lon:74.00,flood:false,safe:true},
    {id:"mh-sindhudurg",name:"Sindhudurg",lat:16.35,lon:73.77,flood:true,safe:false},
    {id:"mh-solapur",name:"Solapur",lat:17.68,lon:75.90,flood:false,safe:true},
    {id:"mh-thane",name:"Thane",lat:19.22,lon:72.98,flood:true,safe:false},
    {id:"mh-wardha",name:"Wardha",lat:20.75,lon:78.60,flood:false,safe:true},
    {id:"mh-washim",name:"Washim",lat:20.11,lon:77.15,flood:false,safe:true},
    {id:"mh-yavatmal",name:"Yavatmal",lat:20.39,lon:78.12,flood:false,safe:false},
  ],
  "Delhi": [
    {id:"dl-central",name:"Central Delhi",lat:28.65,lon:77.23,flood:false,safe:false},
    {id:"dl-east",name:"East Delhi",lat:28.67,lon:77.30,flood:true,safe:false},
    {id:"dl-new-delhi",name:"New Delhi",lat:28.61,lon:77.21,flood:false,safe:true},
    {id:"dl-north",name:"North Delhi",lat:28.73,lon:77.21,flood:false,safe:true},
    {id:"dl-north-east",name:"North East Delhi",lat:28.69,lon:77.31,flood:true,safe:false},
    {id:"dl-north-west",name:"North West Delhi",lat:28.73,lon:77.10,flood:false,safe:true},
    {id:"dl-shahdara",name:"Shahdara",lat:28.67,lon:77.29,flood:true,safe:false},
    {id:"dl-south",name:"South Delhi",lat:28.53,lon:77.22,flood:false,safe:true},
    {id:"dl-south-east",name:"South East Delhi",lat:28.55,lon:77.29,flood:false,safe:true},
    {id:"dl-south-west",name:"South West Delhi",lat:28.58,lon:77.07,flood:false,safe:true},
    {id:"dl-west",name:"West Delhi",lat:28.65,lon:77.10,flood:false,safe:true},
  ],
  "Telangana": [
    {id:"tg-adilabad",name:"Adilabad",lat:19.67,lon:78.53,flood:false,safe:true},
    {id:"tg-bhadradri",name:"Bhadradri Kothagudem",lat:17.55,lon:80.62,flood:true,safe:false},
    {id:"tg-hyderabad",name:"Hyderabad",lat:17.39,lon:78.49,flood:false,safe:true},
    {id:"tg-jagtial",name:"Jagtial",lat:18.79,lon:78.91,flood:false,safe:true},
    {id:"tg-jangaon",name:"Jangaon",lat:17.73,lon:79.15,flood:false,safe:true},
    {id:"tg-jayashankar",name:"Jayashankar Bhupalpally",lat:18.43,lon:79.91,flood:true,safe:false},
    {id:"tg-jogulamba",name:"Jogulamba Gadwal",lat:16.23,lon:77.80,flood:false,safe:true},
    {id:"tg-kamareddy",name:"Kamareddy",lat:18.32,lon:78.34,flood:false,safe:true},
    {id:"tg-karimnagar",name:"Karimnagar",lat:18.44,lon:79.13,flood:false,safe:true},
    {id:"tg-khammam",name:"Khammam",lat:17.25,lon:80.15,flood:true,safe:false},
    {id:"tg-komaram-bheem",name:"Komaram Bheem",lat:19.42,lon:79.60,flood:false,safe:true},
    {id:"tg-mahabubabad",name:"Mahabubabad",lat:17.60,lon:80.01,flood:false,safe:true},
    {id:"tg-mahabubnagar",name:"Mahabubnagar",lat:16.74,lon:78.00,flood:false,safe:true},
    {id:"tg-mancherial",name:"Mancherial",lat:18.87,lon:79.46,flood:false,safe:true},
    {id:"tg-medak",name:"Medak",lat:18.05,lon:78.27,flood:false,safe:true},
    {id:"tg-medchal",name:"Medchal-Malkajgiri",lat:17.59,lon:78.54,flood:false,safe:true},
    {id:"tg-mulugu",name:"Mulugu",lat:18.19,lon:80.54,flood:true,safe:false},
    {id:"tg-nagarkurnool",name:"Nagarkurnool",lat:16.48,lon:78.32,flood:false,safe:true},
    {id:"tg-nalgonda",name:"Nalgonda",lat:17.05,lon:79.27,flood:false,safe:true},
    {id:"tg-narayanpet",name:"Narayanpet",lat:16.75,lon:77.50,flood:false,safe:true},
    {id:"tg-nirmal",name:"Nirmal",lat:19.10,lon:78.35,flood:false,safe:true},
    {id:"tg-nizamabad",name:"Nizamabad",lat:18.67,lon:78.10,flood:false,safe:true},
    {id:"tg-peddapalli",name:"Peddapalli",lat:18.61,lon:79.37,flood:false,safe:true},
    {id:"tg-rajanna",name:"Rajanna Sircilla",lat:18.39,lon:78.84,flood:false,safe:true},
    {id:"tg-rangareddy",name:"Ranga Reddy",lat:17.24,lon:78.39,flood:false,safe:true},
    {id:"tg-sangareddy",name:"Sangareddy",lat:17.62,lon:78.09,flood:false,safe:true},
    {id:"tg-siddipet",name:"Siddipet",lat:18.10,lon:78.85,flood:false,safe:true},
    {id:"tg-suryapet",name:"Suryapet",lat:17.14,lon:79.62,flood:false,safe:true},
    {id:"tg-vikarabad",name:"Vikarabad",lat:17.34,lon:77.90,flood:false,safe:true},
    {id:"tg-wanaparthy",name:"Wanaparthy",lat:16.37,lon:78.06,flood:false,safe:true},
    {id:"tg-warangal-rural",name:"Warangal Rural",lat:17.97,lon:79.60,flood:false,safe:true},
    {id:"tg-warangal-urban",name:"Warangal Urban",lat:17.99,lon:79.59,flood:false,safe:true},
    {id:"tg-yadadri",name:"Yadadri Bhuvanagiri",lat:17.59,lon:78.98,flood:false,safe:true},
  ],
  "Uttar Pradesh": [
    {id:"up-agra",name:"Agra",lat:27.18,lon:78.01,flood:false,safe:true},
    {id:"up-aligarh",name:"Aligarh",lat:27.88,lon:78.08,flood:false,safe:true},
    {id:"up-allahabad",name:"Prayagraj",lat:25.45,lon:81.84,flood:true,safe:false},
    {id:"up-ambedkarnagar",name:"Ambedkar Nagar",lat:26.47,lon:82.54,flood:true,safe:false},
    {id:"up-amethi",name:"Amethi",lat:26.16,lon:81.81,flood:false,safe:true},
    {id:"up-amroha",name:"Amroha",lat:28.90,lon:78.47,flood:false,safe:true},
    {id:"up-auraiya",name:"Auraiya",lat:26.47,lon:79.51,flood:false,safe:true},
    {id:"up-azamgarh",name:"Azamgarh",lat:26.07,lon:83.18,flood:true,safe:false},
    {id:"up-baghpat",name:"Baghpat",lat:28.95,lon:77.21,flood:true,safe:false},
    {id:"up-bahraich",name:"Bahraich",lat:27.57,lon:81.59,flood:true,safe:false},
    {id:"up-ballia",name:"Ballia",lat:25.76,lon:84.15,flood:true,safe:false},
    {id:"up-banda",name:"Banda",lat:25.48,lon:80.34,flood:false,safe:true},
    {id:"up-bareilly",name:"Bareilly",lat:28.36,lon:79.42,flood:false,safe:true},
    {id:"up-bijnor",name:"Bijnor",lat:29.37,lon:78.14,flood:true,safe:false},
    {id:"up-bulandshahr",name:"Bulandshahr",lat:28.41,lon:77.85,flood:false,safe:true},
    {id:"up-gorakhpur",name:"Gorakhpur",lat:26.76,lon:83.37,flood:true,safe:false},
    {id:"up-kanpur",name:"Kanpur Nagar",lat:26.46,lon:80.35,flood:false,safe:true},
    {id:"up-lucknow",name:"Lucknow",lat:26.85,lon:80.95,flood:false,safe:true},
    {id:"up-mathura",name:"Mathura",lat:27.49,lon:77.67,flood:false,safe:true},
    {id:"up-meerut",name:"Meerut",lat:28.98,lon:77.71,flood:false,safe:true},
    {id:"up-moradabad",name:"Moradabad",lat:28.84,lon:78.77,flood:true,safe:false},
    {id:"up-noida",name:"Gautam Buddha Nagar",lat:28.57,lon:77.32,flood:false,safe:true},
    {id:"up-saharanpur",name:"Saharanpur",lat:29.97,lon:77.55,flood:false,safe:true},
    {id:"up-varanasi",name:"Varanasi",lat:25.32,lon:83.01,flood:true,safe:false},
  ],
  "Gujarat": [
    {id:"gj-ahmedabad",name:"Ahmedabad",lat:23.03,lon:72.58,flood:false,safe:true},
    {id:"gj-amreli",name:"Amreli",lat:21.60,lon:71.22,flood:false,safe:true},
    {id:"gj-anand",name:"Anand",lat:22.56,lon:72.95,flood:false,safe:true},
    {id:"gj-aravalli",name:"Aravalli",lat:23.70,lon:73.00,flood:false,safe:true},
    {id:"gj-banaskantha",name:"Banaskantha",lat:24.17,lon:72.42,flood:false,safe:true},
    {id:"gj-bharuch",name:"Bharuch",lat:21.70,lon:72.99,flood:true,safe:false},
    {id:"gj-bhavnagar",name:"Bhavnagar",lat:21.77,lon:72.15,flood:false,safe:true},
    {id:"gj-botad",name:"Botad",lat:22.17,lon:71.67,flood:false,safe:true},
    {id:"gj-chhota-udaipur",name:"Chhota Udaipur",lat:22.30,lon:74.02,flood:false,safe:true},
    {id:"gj-dahod",name:"Dahod",lat:22.84,lon:74.26,flood:false,safe:true},
    {id:"gj-dang",name:"Dang",lat:20.75,lon:73.69,flood:true,safe:false},
    {id:"gj-gandhinagar",name:"Gandhinagar",lat:23.22,lon:72.64,flood:false,safe:true},
    {id:"gj-jamnagar",name:"Jamnagar",lat:22.47,lon:70.07,flood:false,safe:true},
    {id:"gj-junagadh",name:"Junagadh",lat:21.52,lon:70.46,flood:false,safe:true},
    {id:"gj-kutch",name:"Kutch",lat:23.73,lon:69.86,flood:false,safe:false},
    {id:"gj-mehsana",name:"Mehsana",lat:23.60,lon:72.38,flood:false,safe:true},
    {id:"gj-morbi",name:"Morbi",lat:22.82,lon:70.84,flood:false,safe:true},
    {id:"gj-narmada",name:"Narmada",lat:21.87,lon:73.50,flood:true,safe:false},
    {id:"gj-navsari",name:"Navsari",lat:20.95,lon:72.92,flood:true,safe:false},
    {id:"gj-panchmahal",name:"Panchmahal",lat:22.76,lon:73.52,flood:false,safe:true},
    {id:"gj-patan",name:"Patan",lat:23.85,lon:72.12,flood:false,safe:true},
    {id:"gj-porbandar",name:"Porbandar",lat:21.64,lon:69.61,flood:false,safe:true},
    {id:"gj-rajkot",name:"Rajkot",lat:22.30,lon:70.80,flood:false,safe:true},
    {id:"gj-sabarkantha",name:"Sabarkantha",lat:23.59,lon:73.01,flood:false,safe:true},
    {id:"gj-surat",name:"Surat",lat:21.17,lon:72.83,flood:true,safe:false},
    {id:"gj-surendranagar",name:"Surendranagar",lat:22.73,lon:71.64,flood:false,safe:true},
    {id:"gj-tapi",name:"Tapi",lat:21.27,lon:73.42,flood:true,safe:false},
    {id:"gj-vadodara",name:"Vadodara",lat:22.31,lon:73.19,flood:false,safe:true},
    {id:"gj-valsad",name:"Valsad",lat:20.60,lon:72.93,flood:true,safe:false},
  ],
  "Rajasthan": [
    {id:"rj-ajmer",name:"Ajmer",lat:26.45,lon:74.64,flood:false,safe:true},
    {id:"rj-alwar",name:"Alwar",lat:27.56,lon:76.63,flood:false,safe:true},
    {id:"rj-barmer",name:"Barmer",lat:25.75,lon:71.39,flood:false,safe:true},
    {id:"rj-bikaner",name:"Bikaner",lat:28.02,lon:73.31,flood:false,safe:true},
    {id:"rj-churu",name:"Churu",lat:28.30,lon:74.97,flood:false,safe:true},
    {id:"rj-jaipur",name:"Jaipur",lat:26.91,lon:75.79,flood:false,safe:true},
    {id:"rj-jaisalmer",name:"Jaisalmer",lat:26.92,lon:70.90,flood:false,safe:true},
    {id:"rj-jodhpur",name:"Jodhpur",lat:26.28,lon:73.02,flood:false,safe:true},
    {id:"rj-kota",name:"Kota",lat:25.21,lon:75.86,flood:true,safe:false},
    {id:"rj-nagaur",name:"Nagaur",lat:27.20,lon:73.73,flood:false,safe:true},
    {id:"rj-pali",name:"Pali",lat:25.77,lon:73.33,flood:false,safe:true},
    {id:"rj-sikar",name:"Sikar",lat:27.61,lon:75.14,flood:false,safe:true},
    {id:"rj-udaipur",name:"Udaipur",lat:24.58,lon:73.71,flood:false,safe:true},
  ],
  "West Bengal": [
    {id:"wb-bankura",name:"Bankura",lat:23.23,lon:87.07,flood:false,safe:true},
    {id:"wb-bardhaman",name:"Paschim Bardhaman",lat:23.23,lon:87.86,flood:false,safe:true},
    {id:"wb-birbhum",name:"Birbhum",lat:23.89,lon:87.53,flood:false,safe:true},
    {id:"wb-coochbehar",name:"Cooch Behar",lat:26.33,lon:89.44,flood:true,safe:false},
    {id:"wb-darjeeling",name:"Darjeeling",lat:27.04,lon:88.27,flood:true,safe:false},
    {id:"wb-hooghly",name:"Hooghly",lat:22.90,lon:88.39,flood:true,safe:false},
    {id:"wb-howrah",name:"Howrah",lat:22.59,lon:88.31,flood:true,safe:false},
    {id:"wb-jalpaiguri",name:"Jalpaiguri",lat:26.54,lon:88.72,flood:true,safe:false},
    {id:"wb-kolkata",name:"Kolkata",lat:22.57,lon:88.36,flood:true,safe:false},
    {id:"wb-malda",name:"Malda",lat:25.01,lon:88.14,flood:true,safe:false},
    {id:"wb-murshidabad",name:"Murshidabad",lat:24.19,lon:88.27,flood:true,safe:false},
    {id:"wb-nadia",name:"Nadia",lat:23.47,lon:88.56,flood:true,safe:false},
    {id:"wb-north-24-parganas",name:"North 24 Parganas",lat:22.86,lon:88.64,flood:true,safe:false},
    {id:"wb-purulia",name:"Purulia",lat:23.33,lon:86.37,flood:false,safe:true},
    {id:"wb-south-24-parganas",name:"South 24 Parganas",lat:22.19,lon:88.75,flood:true,safe:false},
  ],
  "Punjab": [
    {id:"pb-amritsar",name:"Amritsar",lat:31.63,lon:74.87,flood:false,safe:true},
    {id:"pb-bathinda",name:"Bathinda",lat:30.21,lon:74.95,flood:false,safe:true},
    {id:"pb-faridkot",name:"Faridkot",lat:30.67,lon:74.76,flood:false,safe:true},
    {id:"pb-fatehgarh-sahib",name:"Fatehgarh Sahib",lat:30.65,lon:76.39,flood:false,safe:true},
    {id:"pb-ferozepur",name:"Ferozepur",lat:30.93,lon:74.62,flood:true,safe:false},
    {id:"pb-gurdaspur",name:"Gurdaspur",lat:32.04,lon:75.41,flood:true,safe:false},
    {id:"pb-hoshiarpur",name:"Hoshiarpur",lat:31.53,lon:75.91,flood:false,safe:true},
    {id:"pb-jalandhar",name:"Jalandhar",lat:31.33,lon:75.58,flood:false,safe:true},
    {id:"pb-kapurthala",name:"Kapurthala",lat:31.38,lon:75.38,flood:false,safe:true},
    {id:"pb-ludhiana",name:"Ludhiana",lat:30.90,lon:75.85,flood:false,safe:true},
    {id:"pb-moga",name:"Moga",lat:30.82,lon:75.17,flood:false,safe:true},
    {id:"pb-muktsar",name:"Sri Muktsar Sahib",lat:30.47,lon:74.52,flood:false,safe:true},
    {id:"pb-pathankot",name:"Pathankot",lat:32.27,lon:75.66,flood:true,safe:false},
    {id:"pb-patiala",name:"Patiala",lat:30.34,lon:76.39,flood:false,safe:true},
    {id:"pb-rupnagar",name:"Rupnagar",lat:30.97,lon:76.52,flood:false,safe:true},
    {id:"pb-sangrur",name:"Sangrur",lat:30.25,lon:75.84,flood:false,safe:true},
    {id:"pb-sbs-nagar",name:"Shaheed Bhagat Singh Nagar",lat:31.39,lon:76.07,flood:false,safe:true},
    {id:"pb-tarn-taran",name:"Tarn Taran",lat:31.45,lon:74.93,flood:false,safe:true},
  ],
  "Kerala": [
    {id:"kl-alappuzha",name:"Alappuzha",lat:9.49,lon:76.33,flood:true,safe:false},
    {id:"kl-ernakulam",name:"Ernakulam",lat:10.02,lon:76.31,flood:true,safe:false},
    {id:"kl-idukki",name:"Idukki",lat:9.92,lon:77.10,flood:true,safe:false},
    {id:"kl-kannur",name:"Kannur",lat:11.87,lon:75.37,flood:false,safe:true},
    {id:"kl-kasaragod",name:"Kasaragod",lat:12.50,lon:74.99,flood:false,safe:true},
    {id:"kl-kollam",name:"Kollam",lat:8.89,lon:76.61,flood:true,safe:false},
    {id:"kl-kottayam",name:"Kottayam",lat:9.59,lon:76.52,flood:true,safe:false},
    {id:"kl-kozhikode",name:"Kozhikode",lat:11.25,lon:75.78,flood:false,safe:true},
    {id:"kl-malappuram",name:"Malappuram",lat:11.07,lon:76.07,flood:false,safe:true},
    {id:"kl-palakkad",name:"Palakkad",lat:10.78,lon:76.65,flood:false,safe:true},
    {id:"kl-pathanamthitta",name:"Pathanamthitta",lat:9.27,lon:76.79,flood:true,safe:false},
    {id:"kl-thiruvananthapuram",name:"Thiruvananthapuram",lat:8.52,lon:76.94,flood:false,safe:true},
    {id:"kl-thrissur",name:"Thrissur",lat:10.53,lon:76.22,flood:true,safe:false},
    {id:"kl-wayanad",name:"Wayanad",lat:11.61,lon:76.08,flood:true,safe:false},
  ],
  "Andhra Pradesh": [
    {id:"ap-anantapur",name:"Anantapur",lat:14.68,lon:77.60,flood:false,safe:true},
    {id:"ap-chittoor",name:"Chittoor",lat:13.22,lon:79.10,flood:false,safe:true},
    {id:"ap-east-godavari",name:"East Godavari",lat:17.00,lon:82.20,flood:true,safe:false},
    {id:"ap-guntur",name:"Guntur",lat:16.31,lon:80.44,flood:true,safe:false},
    {id:"ap-kadapa",name:"YSR Kadapa",lat:14.47,lon:78.82,flood:false,safe:true},
    {id:"ap-krishna",name:"Krishna",lat:16.61,lon:80.81,flood:true,safe:false},
    {id:"ap-kurnool",name:"Kurnool",lat:15.83,lon:78.04,flood:false,safe:true},
    {id:"ap-nellore",name:"Sri Potti Sriramulu Nellore",lat:14.44,lon:79.99,flood:false,safe:true},
    {id:"ap-prakasam",name:"Prakasam",lat:15.34,lon:79.77,flood:false,safe:true},
    {id:"ap-srikakulam",name:"Srikakulam",lat:18.30,lon:83.90,flood:true,safe:false},
    {id:"ap-visakhapatnam",name:"Visakhapatnam",lat:17.69,lon:83.22,flood:true,safe:false},
    {id:"ap-vizianagaram",name:"Vizianagaram",lat:18.12,lon:83.40,flood:false,safe:true},
    {id:"ap-west-godavari",name:"West Godavari",lat:16.93,lon:81.34,flood:true,safe:false},
  ],
  "Madhya Pradesh": [
    {id:"mp-bhopal",name:"Bhopal",lat:23.26,lon:77.41,flood:false,safe:true},
    {id:"mp-gwalior",name:"Gwalior",lat:26.22,lon:78.18,flood:false,safe:true},
    {id:"mp-indore",name:"Indore",lat:22.72,lon:75.86,flood:false,safe:true},
    {id:"mp-jabalpur",name:"Jabalpur",lat:23.17,lon:79.94,flood:false,safe:true},
    {id:"mp-katni",name:"Katni",lat:23.83,lon:80.40,flood:false,safe:true},
    {id:"mp-rewa",name:"Rewa",lat:24.53,lon:81.30,flood:false,safe:true},
    {id:"mp-sagar",name:"Sagar",lat:23.84,lon:78.74,flood:false,safe:true},
    {id:"mp-satna",name:"Satna",lat:24.60,lon:80.83,flood:false,safe:true},
    {id:"mp-ujjain",name:"Ujjain",lat:23.18,lon:75.78,flood:false,safe:true},
    {id:"mp-vidisha",name:"Vidisha",lat:23.52,lon:77.81,flood:false,safe:true},
  ],
  "Haryana": [
    {id:"hr-ambala",name:"Ambala",lat:30.38,lon:76.78,flood:false,safe:true},
    {id:"hr-faridabad",name:"Faridabad",lat:28.41,lon:77.31,flood:false,safe:true},
    {id:"hr-gurugram",name:"Gurugram",lat:28.46,lon:77.03,flood:false,safe:true},
    {id:"hr-hisar",name:"Hisar",lat:29.15,lon:75.72,flood:false,safe:true},
    {id:"hr-jhajjar",name:"Jhajjar",lat:28.61,lon:76.65,flood:false,safe:true},
    {id:"hr-karnal",name:"Karnal",lat:29.69,lon:76.99,flood:false,safe:true},
    {id:"hr-panipat",name:"Panipat",lat:29.39,lon:76.97,flood:false,safe:true},
    {id:"hr-rohtak",name:"Rohtak",lat:28.90,lon:76.58,flood:false,safe:true},
    {id:"hr-sirsa",name:"Sirsa",lat:29.53,lon:75.03,flood:false,safe:true},
    {id:"hr-sonipat",name:"Sonipat",lat:28.99,lon:77.02,flood:false,safe:true},
    {id:"hr-yamunanagar",name:"Yamunanagar",lat:30.13,lon:77.27,flood:true,safe:false},
  ],
};

const STATE_LIST = Object.keys(INDIA_DATA).sort();

const PLANS = [
  { id:"basic",   name:"Basic Shield", weeklyBase:20, color:"#2ed573", icon:"🛡️",
    payout:{rain:500,heat:700,storm:600,curfew:400,pollution:350},
    features:["Rain & Flood cover","Heat disruption cover","₹500 max rain payout","24hr claim processing"] },
  { id:"premium", name:"Pro Shield",   weeklyBase:40, color:"#7c8cf8", icon:"⚡",
    payout:{rain:850,heat:1200,storm:1050,curfew:800,pollution:700},
    features:["All Basic features","Storm & Wind cover","Curfew disruption cover","Zero-touch instant payout"] },
  { id:"elite",   name:"Elite Shield", weeklyBase:70, color:"#ffa502", icon:"👑",
    payout:{rain:1500,heat:2000,storm:1800,curfew:1500,pollution:1200},
    features:["All Pro features","₹2000 max heat payout","Accident cover","Income guarantee"] },
];

const PLATFORMS = ["Swiggy","Zomato","Amazon","Zepto","Blinkit","Dunzo","Porter","BigBasket","Other"];

const TRIGGERS = [
  { type:"rain",      icon:"🌧️", label:"Heavy Rain",   color:"#7c8cf8", desc:"Cannot deliver safely"  },
  { type:"heat",      icon:"🔥", label:"Extreme Heat",  color:"#ff6b6b", desc:"Unsafe outdoor work"    },
  { type:"storm",     icon:"⛈️", label:"Severe Storm",  color:"#ffa502", desc:"High wind & lightning"  },
  { type:"curfew",    icon:"🚫", label:"Curfew",        color:"#a29bfe", desc:"No movement allowed"    },
  { type:"pollution", icon:"🌫️", label:"Pollution",     color:"#74b9ff", desc:"AQI outdoor restriction" },
];

const CLAIM_STEPS = [
  { id:"detect",  label:"Detecting Disruption", icon:"📡", ms:1400 },
  { id:"verify",  label:"Verifying Identity",   icon:"🔐", ms:1200 },
  { id:"fraud",   label:"Fraud Check",          icon:"🛡️", ms:1600 },
  { id:"approve", label:"Approving Claim",      icon:"✅", ms:1000 },
  { id:"credit",  label:"Crediting Payout",     icon:"💰", ms:900  },
];

// ── Weather ──
function genWeather(d) {
  const s = d.lat*100+d.lon;
  const r = o => Math.sin((s+o)*127.1)*0.5+0.5;
  const coastal = d.lat < 22 && (d.lon < 76 || d.lon > 79.5);
  const hilly   = d.lat > 27 || (d.lon < 77 && d.lat < 14);
  const south   = d.lat < 12;
  const north   = d.lat > 27;
  const rain  = Math.min(1,Math.max(0,(coastal?0.52:hilly?0.42:south?0.45:0.25)+r(1)*0.5-0.15));
  const heat  = Math.min(1,Math.max(0,(south?0.75:north?0.70:hilly?0.18:0.50)+r(2)*0.4-0.12));
  const storm = Math.min(1,Math.max(0,(coastal?0.55:0.22)+r(3)*0.45-0.1));
  const aqi   = Math.round((d.flood?80:north?90:40)+r(7)*60);
  const temp  = Math.round(hilly?14+r(4)*14:south?32+r(4)*10:north?28+r(4)*14:28+r(4)*10);
  const hum   = Math.round(coastal?72+r(5)*22:38+r(5)*35);
  const wind  = Math.round(coastal?16+r(6)*22:7+r(6)*16);
  let cond="Partly Cloudy";
  if(storm>0.68) cond="Thunderstorm";
  else if(rain>0.72) cond="Heavy Rain";
  else if(rain>0.5)  cond="Moderate Rain";
  else if(heat>0.8)  cond="Extreme Heat";
  else if(heat>0.65) cond="Hot & Sunny";
  else if(hilly)     cond="Cool & Misty";
  return { temp, humidity:hum, wind, condition:cond, rain, heat, storm, aqi };
}

// ── Risk ──
function overallRisk(w) {
  if(!w) return {level:"LOADING",score:0,color:"#555",bg:"rgba(80,80,80,0.1)"};
  const score = Math.round((w.rain*0.4+w.heat*0.35+w.storm*0.25)*100);
  if(score>=66) return {level:"HIGH",  score,color:"#ff4757",bg:"rgba(255,71,87,0.12)"};
  if(score>=38) return {level:"MEDIUM",score,color:"#ffa502",bg:"rgba(255,165,2,0.12)"};
  return              {level:"LOW",   score,color:"#2ed573",bg:"rgba(46,213,115,0.12)"};
}
const rainRisk  = v => v>=0.72?{l:"Severe",  c:"#ff4757"}:v>=0.48?{l:"Moderate",c:"#ffa502"}:{l:"Low",     c:"#2ed573"};
const heatRisk  = v => v>=0.78?{l:"Extreme", c:"#ff4757"}:v>=0.5 ?{l:"High",    c:"#ffa502"}:{l:"Bearable",c:"#2ed573"};
const stormRisk = v => v>=0.65?{l:"Danger",  c:"#ff4757"}:v>=0.4 ?{l:"Watch",   c:"#ffa502"}:{l:"Clear",   c:"#2ed573"};

// ── Premium Engine ──
function calcPremium(plan, dist, w) {
  if(!plan||!dist||!w) return null;
  let m=1.0; const reasons=[],savings=[];
  if(dist.flood)      { m+=0.25; reasons.push({label:"Flood-prone area",delta:"+25%",color:"#ff4757"}); }
  if(w.rain>0.70)     { m+=0.20; reasons.push({label:`Heavy rain (${Math.round(w.rain*100)}%)`,delta:"+20%",color:"#ff6b6b"}); }
  else if(w.rain<0.25){ m-=0.10; savings.push({label:"Low rain forecast",delta:"-10%",color:"#2ed573"}); }
  if(w.heat>0.75)     { m+=0.15; reasons.push({label:`Extreme heat (${w.temp}°C)`,delta:"+15%",color:"#ffa502"}); }
  if(w.storm>0.65)    { m+=0.20; reasons.push({label:"High storm risk",delta:"+20%",color:"#ff4757"}); }
  if(w.aqi>100)       { m+=0.10; reasons.push({label:`Poor AQI (${w.aqi})`,delta:"+10%",color:"#a29bfe"}); }
  if(dist.safe)       { m-=0.20; savings.push({label:"✅ Safe Zone Discount",delta:"-20%",color:"#2ed573"}); }
  const sc=Math.round((w.rain*0.4+w.heat*0.35+w.storm*0.25)*100);
  if(sc<30)           { m-=0.10; savings.push({label:"Low overall risk",delta:"-10%",color:"#2ed573"}); }
  m=Math.max(0.7,Math.min(2.0,m));
  return {base:plan.weeklyBase,finalPremium:Math.round(plan.weeklyBase*m),multiplier:m,reasons,savings,score:sc};
}

// ── CSS ──
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@700&display=swap');
  html,body,#root{margin:0;padding:0;width:100%;min-height:100vh;background:#080810;}
  *{box-sizing:border-box;}
  input,select{font-family:'DM Sans',sans-serif;}
  input:focus,select:focus{outline:none;border-color:rgba(124,140,248,0.45)!important;}
  @keyframes spin{to{transform:rotate(360deg);}}
  @keyframes slideUp{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
  @keyframes glow{0%,100%{box-shadow:0 0 10px rgba(255,71,87,0.3);}50%{box-shadow:0 0 24px rgba(255,71,87,0.65);}}
  @keyframes ticker{from{transform:translateX(0);}to{transform:translateX(-50%);}}
  @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.35;}}
  ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#222236;border-radius:2px;}
  @media(max-width:640px){
    .dash-grid{display:flex!important;flex-direction:column!important;}
    .trig-grid{grid-template-columns:1fr 1fr!important;}
    .plan-grid{grid-template-columns:1fr!important;}
    .dist-grid{grid-template-columns:1fr 1fr!important;}
  }
  @media(min-width:900px){
    .dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start;}
    .trig-grid{grid-template-columns:repeat(5,1fr)!important;}
    .plan-grid{grid-template-columns:repeat(3,1fr)!important;}
    .dist-grid{grid-template-columns:repeat(3,1fr)!important;}
    .admin-grid{grid-template-columns:repeat(4,1fr)!important;}
  }
`;

function Pill({children,color="#2ed573"}) {
  return <span style={{display:"inline-flex",alignItems:"center",padding:"2px 9px",borderRadius:20,background:color+"20",color,fontSize:12,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",border:`1px solid ${color}40`}}>{children}</span>;
}
function Card({children,style={},glow}) {
  return <div style={{background:"linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,padding:"18px 20px",boxShadow:glow?`0 0 26px ${glow}30,0 4px 20px rgba(0,0,0,0.4)`:"0 4px 18px rgba(0,0,0,0.3)",backdropFilter:"blur(12px)",transition:"all 0.3s",...style}}>{children}</div>;
}
function Bar({pct,color="#7c8cf8",glow,thin}) {
  return <div style={{height:thin?4:6,background:"rgba(255,255,255,0.06)",borderRadius:99,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.min(pct,100)}%`,background:color,borderRadius:99,transition:"width 0.9s cubic-bezier(0.4,0,0.2,1)",boxShadow:glow?`0 0 8px ${color}`:"none"}}/></div>;
}
function FInput({label,value,onChange,type="text",placeholder,required}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      <label style={{fontSize:13,color:"#666",fontWeight:700,letterSpacing:"0.07em"}}>{label}{required&&<span style={{color:"#ff4757"}}> *</span>}</label>
      <input value={value} onChange={e=>onChange(e.target.value)} type={type} placeholder={placeholder} style={{padding:"13px 16px",borderRadius:11,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"#eee",fontSize:15}}/>
    </div>
  );
}
function FSelect({label,value,onChange,options,required}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      <label style={{fontSize:13,color:"#666",fontWeight:700,letterSpacing:"0.07em"}}>{label}{required&&<span style={{color:"#ff4757"}}> *</span>}</label>
      <select value={value} onChange={e=>onChange(e.target.value)} style={{padding:"13px 16px",borderRadius:11,background:"rgba(15,15,26,0.95)",border:"1px solid rgba(255,255,255,0.1)",color:value?"#eee":"#555",fontSize:15}}>
        <option value="">Select...</option>
        {options.map(o=><option key={o.value||o} value={o.value||o}>{o.label||o}</option>)}
      </select>
    </div>
  );
}

// ── Register ──
function RegisterScreen({onDone}) {
  const [form,setForm]=useState({name:"",phone:"",email:"",state:"",district:"",platform:"",workArea:""});
  const [step,setStep]=useState(1);
  const [errs,setErrs]=useState({});
  const set=k=>v=>setForm(p=>({...p,[k]:v,...(k==="state"?{district:""}:{})}));

  const districts = form.state ? (INDIA_DATA[form.state]||[]) : [];
  const distObj = districts.find(d=>d.id===form.district);

  const v1=()=>{
    const e={};
    if(!form.name.trim()) e.name="Required";
    if(!/^\d{10}$/.test(form.phone)) e.phone="10-digit number";
    if(!form.email.includes("@")) e.email="Valid email required";
    setErrs(e); return !Object.keys(e).length;
  };
  const v2=()=>{
    const e={};
    if(!form.state)    e.state="Select state";
    if(!form.district) e.district="Select district";
    if(!form.platform) e.platform="Select platform";
    if(!form.workArea.trim()) e.workArea="Enter work area";
    setErrs(e); return !Object.keys(e).length;
  };
  const next=()=>{ if(step===1&&v1()) setStep(2); else if(step===2&&v2()) setStep(3); };

  return (
    <div style={{minHeight:"100vh",background:"#080810",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px 16px",fontFamily:"'DM Sans',sans-serif"}}>
      <style>{css}</style>
      <div style={{width:"100%",maxWidth:520,animation:"slideUp 0.4s ease"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontSize:36,marginBottom:8}}>🛡️</div>
          <div style={{fontSize:22,fontWeight:800,color:"#fff",letterSpacing:"-0.02em"}}>GigShield <span style={{color:"#7c8cf8"}}>AI</span></div>
          <div style={{fontSize:13,color:"#444",marginTop:3,letterSpacing:"0.09em"}}>GIG WORKER INSURANCE · ALL INDIA</div>
        </div>

        <div style={{display:"flex",alignItems:"center",marginBottom:24}}>
          {[1,2,3].map((s,i)=>(
            <div key={s} style={{display:"flex",alignItems:"center",flex:1}}>
              <div style={{width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:step>=s?"#7c8cf8":"rgba(255,255,255,0.06)",color:step>=s?"#fff":"#444",fontSize:12,fontWeight:700,flexShrink:0,transition:"all 0.3s"}}>{step>s?"✓":s}</div>
              {i<2&&<div style={{flex:1,height:2,background:step>s?"#7c8cf8":"rgba(255,255,255,0.06)",margin:"0 4px",transition:"all 0.3s"}}/>}
            </div>
          ))}
        </div>

        <Card>
          {step===1&&(
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div><div style={{fontSize:18,fontWeight:800,color:"#fff"}}>👤 Personal Details</div><div style={{fontSize:14,color:"#555",marginTop:2}}>Tell us about yourself</div></div>
              <FInput label="FULL NAME" value={form.name} onChange={set("name")} placeholder="e.g. Arjun Ramesh" required/>
              {errs.name&&<div style={{fontSize:13,color:"#ff4757",marginTop:-8}}>{errs.name}</div>}
              <FInput label="PHONE NUMBER" value={form.phone} onChange={set("phone")} type="tel" placeholder="10-digit mobile number" required/>
              {errs.phone&&<div style={{fontSize:13,color:"#ff4757",marginTop:-8}}>{errs.phone}</div>}
              <FInput label="EMAIL" value={form.email} onChange={set("email")} type="email" placeholder="your@email.com" required/>
              {errs.email&&<div style={{fontSize:13,color:"#ff4757",marginTop:-8}}>{errs.email}</div>}
            </div>
          )}

          {step===2&&(
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div><div style={{fontSize:18,fontWeight:800,color:"#fff"}}>📍 Location & Work</div><div style={{fontSize:14,color:"#555",marginTop:2}}>Used for risk & premium calculation</div></div>

              {/* STATE selector */}
              <FSelect label="SELECT STATE" value={form.state}
                onChange={v=>setForm(p=>({...p,state:v,district:""}))}
                options={STATE_LIST.map(s=>({value:s,label:`${s} (${INDIA_DATA[s].length} districts)`}))} required/>
              {errs.state&&<div style={{fontSize:13,color:"#ff4757",marginTop:-8}}>{errs.state}</div>}

              {/* DISTRICT selector — only shows after state selected */}
              {form.state&&(
                <>
                  <FSelect label="SELECT DISTRICT" value={form.district}
                    onChange={set("district")}
                    options={districts.map(d=>({value:d.id,label:d.name+(d.safe?" ✅":d.flood?" ⚠️":"")}))} required/>
                  {errs.district&&<div style={{fontSize:13,color:"#ff4757",marginTop:-8}}>{errs.district}</div>}
                  {distObj&&(
                    <div style={{padding:"12px 14px",borderRadius:10,background:distObj.safe?"rgba(46,213,115,0.07)":"rgba(255,71,87,0.07)",border:`1px solid ${distObj.safe?"rgba(46,213,115,0.2)":"rgba(255,71,87,0.2)"}`}}>
                      <div style={{fontSize:13,fontWeight:700,color:distObj.safe?"#2ed573":"#ff4757"}}>
                        {distObj.safe?"✅ Safe Zone — 20% premium discount!":"⚠️ Flood-prone — higher risk premium applies"}
                      </div>
                      <div style={{fontSize:11,color:"#555",marginTop:3}}>{form.state} · {distObj.name}</div>
                    </div>
                  )}
                </>
              )}

              <FSelect label="DELIVERY PLATFORM" value={form.platform} onChange={set("platform")} options={PLATFORMS} required/>
              {errs.platform&&<div style={{fontSize:13,color:"#ff4757",marginTop:-8}}>{errs.platform}</div>}
              <FInput label="PRIMARY WORK AREA / ZONE" value={form.workArea} onChange={set("workArea")} placeholder="e.g. Koramangala, Indiranagar" required/>
              {errs.workArea&&<div style={{fontSize:13,color:"#ff4757",marginTop:-8}}>{errs.workArea}</div>}
            </div>
          )}

          {step===3&&(
            <div style={{display:"flex",flexDirection:"column",gap:14,alignItems:"center",textAlign:"center"}}>
              <div style={{fontSize:48}}>🎉</div>
              <div style={{fontSize:20,fontWeight:800,color:"#fff"}}>Registration Complete!</div>
              <div style={{fontSize:15,color:"#888",lineHeight:1.6}}>Welcome, <span style={{color:"#7c8cf8",fontWeight:700}}>{form.name}</span>!<br/>Now select your insurance plan.</div>
              <div style={{width:"100%",padding:"14px",borderRadius:12,background:"rgba(124,140,248,0.08)",border:"1px solid rgba(124,140,248,0.2)"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,textAlign:"left"}}>
                  {[
                    {l:"Name",v:form.name},{l:"Phone",v:form.phone},
                    {l:"State",v:form.state},{l:"District",v:distObj?.name},
                    {l:"Platform",v:form.platform},{l:"Zone",v:distObj?.safe?"✅ Safe":"⚠️ Risk"},
                    {l:"Work Area",v:form.workArea},
                  ].map(r=>(
                    <div key={r.l}><div style={{fontSize:9,color:"#555",letterSpacing:"0.07em"}}>{r.l.toUpperCase()}</div><div style={{fontSize:13,fontWeight:700,color:"#ddd",marginTop:1}}>{r.v||"—"}</div></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div style={{display:"flex",gap:10,marginTop:18}}>
            {step>1&&step<3&&<button onClick={()=>setStep(s=>s-1)} style={{flex:1,padding:"12px",borderRadius:12,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"#666",cursor:"pointer",fontSize:13,fontWeight:600}}>← Back</button>}
            <button onClick={step===3?()=>onDone(form):next} style={{flex:1,padding:"12px",borderRadius:12,background:"linear-gradient(135deg,#7c8cf8,#a78bfa)",border:"none",color:"#fff",cursor:"pointer",fontSize:14,fontWeight:700}}>
              {step===3?"Choose My Plan →":"Next →"}
            </button>
          </div>
        </Card>
        <div style={{textAlign:"center",marginTop:16,fontSize:11,color:"#333"}}>Already registered? <span onClick={()=>onDone(null)} style={{color:"#7c8cf8",cursor:"pointer",fontWeight:700}}>Skip →</span></div>
      </div>
    </div>
  );
}

// ── Plan Screen ──
function PlanScreen({user,weather,onSelect}) {
  const [sel,setSel]=useState(null);
  const allDistricts = Object.values(INDIA_DATA).flat();
  const dist=allDistricts.find(d=>d.id===user?.district);
  const w=dist?weather[dist.id]:null;
  const selPlan=PLANS.find(p=>p.id===sel);
  const calc=selPlan&&dist&&w?calcPremium(selPlan,dist,w):null;

  return (
    <div style={{minHeight:"100vh",background:"#080810",padding:"24px 0 40px",fontFamily:"'DM Sans',sans-serif",width:"100%"}}>
      <style>{css}</style>
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 16px",animation:"slideUp 0.35s ease"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:13,color:"#7c8cf8",fontWeight:700,letterSpacing:"0.1em"}}>STEP 2 OF 2</div>
          <div style={{fontSize:22,fontWeight:800,color:"#fff",marginTop:6}}>Choose Your Plan</div>
          <div style={{fontSize:13,color:"#555",marginTop:3}}>Weekly billing · Cancel anytime · {user?.state||"India"}</div>
        </div>

        {calc&&(
          <div style={{marginBottom:16,padding:"16px",borderRadius:14,background:"linear-gradient(135deg,rgba(124,140,248,0.1),rgba(167,139,250,0.05))",border:"1px solid rgba(124,140,248,0.25)"}}>
            <div style={{fontSize:11,color:"#7c8cf8",fontWeight:700,letterSpacing:"0.08em",marginBottom:8}}>⚙️ AI PREMIUM FOR {selPlan.name.toUpperCase()} — {dist?.name}, {user?.state}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div><div style={{fontSize:12,color:"#888"}}>Base: ₹{calc.base}/week · Multiplier: {calc.multiplier.toFixed(2)}x</div></div>
              <div style={{fontSize:24,fontWeight:800,color:"#fff",fontFamily:"monospace"}}>₹{calc.finalPremium}<span style={{fontSize:13,color:"#666"}}>/wk</span></div>
            </div>
            {calc.reasons.map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:12,color:r.color,marginBottom:3}}><span>▲ {r.label}</span><span style={{fontWeight:700,fontFamily:"monospace"}}>{r.delta}</span></div>)}
            {calc.savings.map((s,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:12,color:s.color,marginBottom:3}}><span>▼ {s.label}</span><span style={{fontWeight:700,fontFamily:"monospace"}}>{s.delta}</span></div>)}
          </div>
        )}

        <div className="plan-grid" style={{display:"grid",gridTemplateColumns:"1fr",gap:12}}>
          {PLANS.map(plan=>{
            const c2=dist&&w?calcPremium(plan,dist,w):null;
            const isSel=sel===plan.id;
            return (
              <div key={plan.id} onClick={()=>setSel(plan.id)} style={{padding:"18px",borderRadius:16,cursor:"pointer",background:isSel?`linear-gradient(135deg,${plan.color}18,${plan.color}08)`:"rgba(255,255,255,0.03)",border:`2px solid ${isSel?plan.color:"rgba(255,255,255,0.07)"}`,transform:isSel?"scale(1.01)":"scale(1)",transition:"all 0.25s",boxShadow:isSel?`0 0 20px ${plan.color}22`:"none"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:20}}>{plan.icon}</span>
                      <span style={{fontSize:16,fontWeight:800,color:isSel?plan.color:"#ddd"}}>{plan.name}</span>
                      {plan.id==="premium"&&<span style={{fontSize:9,background:plan.color+"22",color:plan.color,padding:"2px 7px",borderRadius:6,fontWeight:700}}>POPULAR</span>}
                    </div>
                    <div style={{marginTop:6}}>
                      <span style={{fontSize:24,fontWeight:800,color:"#fff",fontFamily:"monospace"}}>₹{c2?c2.finalPremium:plan.weeklyBase}</span>
                      <span style={{fontSize:12,color:"#555"}}>/week</span>
                      {c2&&c2.finalPremium!==plan.weeklyBase&&<span style={{fontSize:11,color:"#888",marginLeft:8,textDecoration:"line-through"}}>₹{plan.weeklyBase}</span>}
                    </div>
                  </div>
                  <div style={{width:24,height:24,borderRadius:"50%",border:`2px solid ${isSel?plan.color:"rgba(255,255,255,0.15)"}`,display:"flex",alignItems:"center",justifyContent:"center",background:isSel?plan.color:"transparent"}}>
                    {isSel&&<span style={{fontSize:12,color:"#fff"}}>✓</span>}
                  </div>
                </div>
                <div style={{height:1,background:"rgba(255,255,255,0.05)",margin:"12px 0"}}/>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12}}>
                  {plan.features.map((f,i)=><div key={i} style={{fontSize:12,color:"#777",display:"flex",alignItems:"center",gap:5}}><span style={{color:plan.color}}>✓</span>{f}</div>)}
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {Object.entries(plan.payout).map(([k,v])=>(
                    <span key={k} style={{fontSize:11,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",padding:"4px 10px",borderRadius:8,color:"#888"}}>
                      {k==="rain"?"🌧️":k==="heat"?"🔥":k==="storm"?"⛈️":k==="curfew"?"🚫":"🌫️"} ₹{v}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={()=>sel&&onSelect(sel)} style={{marginTop:20,width:"100%",padding:"15px",borderRadius:14,background:sel?"linear-gradient(135deg,#7c8cf8,#a78bfa)":"rgba(255,255,255,0.05)",border:"none",color:sel?"#fff":"#333",cursor:sel?"pointer":"not-allowed",fontSize:16,fontWeight:800,transition:"all 0.3s"}}>
          {sel?`Activate ${PLANS.find(p=>p.id===sel)?.name} →`:"Select a plan to continue"}
        </button>
      </div>
    </div>
  );
}

// ── Claim Modal ──
function ClaimModal({type,amount,onDone}) {
  const [step,setStep]=useState(0);
  const [done,setDone]=useState(false);
  useEffect(()=>{
    if(step>=CLAIM_STEPS.length){setDone(true);return;}
    const t=setTimeout(()=>setStep(s=>s+1),CLAIM_STEPS[step].ms);
    return()=>clearTimeout(t);
  },[step]);
  const trig=TRIGGERS.find(t=>t.type===type)||TRIGGERS[0];
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,backdropFilter:"blur(10px)",padding:20}}>
      <div style={{background:"linear-gradient(160deg,#0f0f1a,#12121f)",border:"1px solid rgba(124,140,248,0.3)",borderRadius:24,padding:"28px 24px",maxWidth:420,width:"100%",boxShadow:"0 0 60px rgba(124,140,248,0.12)"}}>
        <div style={{textAlign:"center",marginBottom:22}}>
          <div style={{fontSize:32,marginBottom:6}}>{trig.icon}</div>
          <div style={{fontSize:17,fontWeight:700,color:"#f0f0ff"}}>{trig.label} Detected</div>
          <div style={{fontSize:12,color:"#555",marginTop:3}}>Zero-touch claim processing</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:9}}>
          {CLAIM_STEPS.map((s,i)=>{
            const st=i<step?"done":i===step?"active":"pending";
            return (
              <div key={s.id} style={{display:"flex",alignItems:"center",gap:11,padding:"11px 13px",borderRadius:11,background:st==="active"?"rgba(124,140,248,0.1)":st==="done"?"rgba(46,213,115,0.06)":"rgba(255,255,255,0.02)",border:`1px solid ${st==="active"?"rgba(124,140,248,0.28)":st==="done"?"rgba(46,213,115,0.18)":"rgba(255,255,255,0.04)"}`,transition:"all 0.4s"}}>
                <div style={{fontSize:17,width:26,textAlign:"center"}}>{st==="done"?"✅":st==="active"?"⏳":s.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,color:st==="pending"?"#444":"#eee"}}>{s.label}</div>
                  {st==="active"&&<div style={{fontSize:11,color:"#7c8cf8",marginTop:2}}>Processing...</div>}
                  {st==="done"&&s.id==="fraud"&&<div style={{fontSize:11,color:"#2ed573",marginTop:2}}>No anomalies ✓</div>}
                </div>
                {st==="active"&&<div style={{width:16,height:16,borderRadius:"50%",border:"2px solid rgba(124,140,248,0.2)",borderTop:"2px solid #7c8cf8",animation:"spin 0.7s linear infinite"}}/>}
              </div>
            );
          })}
        </div>
        {done&&(
          <div style={{marginTop:20,padding:"20px",borderRadius:14,background:"rgba(46,213,115,0.09)",border:"1px solid rgba(46,213,115,0.22)",textAlign:"center"}}>
            <div style={{fontSize:30,marginBottom:5}}>🎉</div>
            <div style={{fontSize:15,fontWeight:700,color:"#2ed573"}}>Claim Approved!</div>
            <div style={{fontSize:28,fontWeight:800,color:"#fff",margin:"8px 0",fontFamily:"monospace"}}>+₹{amount}</div>
            <div style={{fontSize:12,color:"#555",marginBottom:14}}>Instantly credited to your wallet</div>
            <button onClick={onDone} style={{padding:"12px 0",width:"100%",borderRadius:10,background:"#2ed573",color:"#0a0a0f",border:"none",fontWeight:800,fontSize:15,cursor:"pointer"}}>Done ✓</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main App ──
export default function GigShieldAI() {
  const [screen,setScreen]=useState("register");
  const [user,setUser]=useState(null);
  const [activePlan,setActivePlan]=useState(null);
  const [tab,setTab]=useState("dashboard");
  const [weather,setWeather]=useState({});
  const [gpsState,setGpsState]=useState("idle");
  const [userDist,setUserDist]=useState(null);
  const [search,setSearch]=useState("");
  const [selectedState,setSelectedState]=useState("");
  const [claims,setClaims]=useState([
    {type:"rain",amount:850,district:"Chennai",state:"Tamil Nadu",time:"Today 08:14"},
    {type:"heat",amount:1200,district:"Madurai",state:"Tamil Nadu",time:"Yesterday 13:30"},
  ]);
  const [wallet,setWallet]=useState(5840);
  const [modal,setModal]=useState(null);
  const [cooldown,setCooldown]=useState(0);
  const [fraudAlert,setFraudAlert]=useState(false);
  const cdRef=useRef(null);

  const allDistricts = Object.values(INDIA_DATA).flat();

  useEffect(()=>{
    const w={};
    allDistricts.forEach(d=>{w[d.id]=genWeather(d);});
    setWeather(w);
  },[]);

  const handleRegister=formData=>{
    if(!formData){setScreen("app");return;}
    setUser(formData);
    const d=allDistricts.find(d=>d.id===formData.district);
    if(d){setUserDist(d);setSelectedState(formData.state);}
    setScreen("plan");
  };

  const handlePlan=planId=>{
    setActivePlan(PLANS.find(p=>p.id===planId));
    setScreen("app");
  };

  const detectGPS=useCallback(()=>{
    setGpsState("detecting");
    if(!navigator.geolocation){setGpsState("error");return;}
    navigator.geolocation.getCurrentPosition(pos=>{
      const{latitude:la,longitude:lo}=pos.coords;
      let best=allDistricts[0],minD=Infinity;
      allDistricts.forEach(d=>{const dist=Math.hypot(d.lat-la,d.lon-lo);if(dist<minD){minD=dist;best=d;}});
      setUserDist(best);
      const st=Object.entries(INDIA_DATA).find(([,ds])=>ds.some(d=>d.id===best.id))?.[0]||"";
      setSelectedState(st);
      setGpsState("found");
    },()=>setGpsState("error"),{timeout:8000});
  },[]);

  const fire=useCallback(type=>{
    if(cooldown>0){setFraudAlert(true);setTimeout(()=>setFraudAlert(false),3500);return;}
    setModal(type);
  },[cooldown]);

  const onDone=useCallback(()=>{
    const plan=activePlan||PLANS[1];
    const amount=plan.payout[modal]||500;
    const district=userDist?.name||"Unknown";
    const state=selectedState||user?.state||"India";
    setClaims(p=>[...p,{type:modal,amount,district,state,time:new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}]);
    setWallet(b=>b+amount);
    setModal(null);
    setCooldown(30);
    cdRef.current=setInterval(()=>setCooldown(c=>{if(c<=1){clearInterval(cdRef.current);return 0;}return c-1;}),1000);
  },[modal,activePlan,userDist,selectedState,user]);

  if(screen==="register") return <RegisterScreen onDone={handleRegister}/>;
  if(screen==="plan") return <PlanScreen user={user} weather={weather} onSelect={handlePlan}/>;

  const plan=activePlan||PLANS[1];
  const uw=userDist?weather[userDist.id]:null;
  const ur=overallRisk(uw);
  const distObj=userDist||(user?.district?allDistricts.find(d=>d.id===user.district):null);

  // Risk panel: show districts of selected state
  const panelState = selectedState || user?.state || STATE_LIST[0];
  const panelDistricts = (INDIA_DATA[panelState]||[]).filter(d=>d.name.toLowerCase().includes(search.toLowerCase()));
  const counts={HIGH:0,MEDIUM:0,LOW:0};
  (INDIA_DATA[panelState]||[]).forEach(d=>{const l=overallRisk(weather[d.id]).level;if(counts[l]!==undefined)counts[l]++;});

  const TABS=[
    {id:"dashboard",label:"Home",   icon:"⚡"},
    {id:"premium",  label:"Premium",icon:"⚙️"},
    {id:"risk",     label:"Risk Panel",icon:"🗺️"},
    {id:"claims",   label:"Claims", icon:"📋"},
    {id:"admin",    label:"Admin",  icon:"🔧"},
  ];

  return (
    <div style={{minHeight:"100vh",width:"100%",background:"#080810",color:"#f0f0ff",fontFamily:"'DM Sans','Segoe UI',sans-serif"}}>
      <style>{css}</style>

      {/* Header */}
      <div style={{background:"rgba(8,8,16,0.97)",backdropFilter:"blur(20px)",position:"sticky",top:0,zIndex:100,borderBottom:"1px solid rgba(255,255,255,0.06)",width:"100%"}}>
        <div style={{background:"rgba(124,140,248,0.07)",borderBottom:"1px solid rgba(124,140,248,0.08)",overflow:"hidden",height:25}}>
          <div style={{display:"flex",gap:34,animation:"ticker 28s linear infinite",alignItems:"center",height:"100%",width:"max-content"}}>
            {[`🌏 ${STATE_LIST.length} States · ${allDistricts.length} Districts`,`🛡️ ${plan.name} Active`,`📍 ${userDist?.name||"Detect Location"}`,
              `🌧️ ${counts.HIGH} HIGH-risk in ${panelState}`,"✅ Zero-touch claims","💰 ₹2.1L paid this week","🛡️ 1,284 workers protected",
              `🌏 ${STATE_LIST.length} States · ${allDistricts.length} Districts`,`🛡️ ${plan.name} Active`
            ].map((t,i)=><span key={i} style={{fontSize:10,color:"#7c8cf8",fontWeight:600,whiteSpace:"nowrap",letterSpacing:"0.04em"}}>{t}</span>)}
          </div>
        </div>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <span style={{fontSize:24}}>🛡️</span>
              <span style={{fontSize:23,fontWeight:900,letterSpacing:"-0.02em",color:"#fff"}}>GigShield <span style={{color:"#7c8cf8"}}>AI</span></span>
              <span style={{fontSize:12,color:plan.color,fontWeight:700,background:plan.color+"15",padding:"3px 8px",borderRadius:6}}>{plan.icon} {plan.name.toUpperCase()}</span>
            </div>
            <div style={{fontSize:13,color:"#3a3a5a",marginTop:2}}>{user?.name||"WORKER"} · {user?.platform||"PLATFORM"} · {user?.state||"INDIA"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:14,color:"#ddd"}}>Wallet</div>
              <div style={{fontSize:20,fontWeight:900,color:"#ffffff",fontFamily:"monospace"}}>₹{wallet.toLocaleString()}</div>
            </div>
            <div style={{width:40,height:40,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:`linear-gradient(135deg,${plan.color},#a78bfa)`,fontSize:14,fontWeight:800,color:"#fff"}}>
              {user?.name?.slice(0,2).toUpperCase()||"GW"}
            </div>
          </div>
        </div>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",padding:"0 20px 10px",gap:4}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"8px 2px",borderRadius:9,border:"none",cursor:"pointer",background:tab===t.id?"rgba(124,140,248,0.13)":"transparent",color:tab===t.id?"#7c8cf8":"#3a3a5a",fontSize:13,fontWeight:700,borderBottom:tab===t.id?"2px solid #7c8cf8":"2px solid transparent",transition:"all 0.2s"}}>
              <div style={{fontSize:16,marginBottom:2}}>{t.icon}</div>{t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"16px 20px 100px",animation:"slideUp 0.35s ease"}}>

        {/* DASHBOARD */}
        {tab==="dashboard"&&(
          <div className="dash-grid">
            {/* Left */}
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              <Card glow={plan.color} style={{background:`linear-gradient(135deg,${plan.color}12,${plan.color}05)`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <Pill color="#2ed573">● Active</Pill>
                    <div style={{fontSize:20,fontWeight:800,color:"#fff",marginTop:8}}>{user?.name||"Gig Worker"}</div>
                    <div style={{fontSize:13,color:"#555",marginTop:2}}>{user?.platform||"Platform"} · {user?.workArea||"India"}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:12,color:"#444"}}>Active Plan</div>
                    <div style={{fontSize:15,fontWeight:800,color:plan.color}}>{plan.icon} {plan.name}</div>
                    <div style={{fontSize:12,color:"#3a3a5a",marginTop:2}}>₹{distObj&&weather[distObj.id]?calcPremium(plan,distObj,weather[distObj.id])?.finalPremium||plan.weeklyBase:plan.weeklyBase}/wk</div>
                  </div>
                </div>
                <div style={{height:1,background:"rgba(255,255,255,0.05)",margin:"12px 0"}}/>
                <div style={{display:"flex",justifyContent:"space-around"}}>
                  {[{l:"Claims",v:claims.length,c:"#7c8cf8"},{l:"Paid Out",v:`₹${claims.reduce((s,c)=>s+c.amount,0).toLocaleString()}`,c:"#2ed573"},{l:"State",v:user?.state?.split(" ")[0]||"—",c:plan.color}].map(s=>(
                    <div key={s.l} style={{textAlign:"center"}}>
                      <div style={{fontSize:17,fontWeight:800,color:s.c,fontFamily:"monospace"}}>{s.v}</div>
                      <div style={{fontSize:12,color:"#555",marginTop:1}}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* GPS */}
              <Card glow={gpsState==="found"?"#2ed573":"#7c8cf8"}>
                <div style={{fontSize:12,color:"#444",letterSpacing:"0.09em",fontWeight:700,marginBottom:13}}>📍 YOUR DISTRICT RISK</div>
                {gpsState==="idle"&&(
                  <div style={{textAlign:"center",padding:"8px 0"}}>
                    <div style={{fontSize:34,marginBottom:10}}>🗺️</div>
                    <div style={{fontSize:15,color:"#777",marginBottom:14}}>Detect your district for live risk analysis</div>
                    <button onClick={detectGPS} style={{padding:"12px 20px",borderRadius:12,background:"rgba(124,140,248,0.13)",border:"1px solid rgba(124,140,248,0.28)",color:"#7c8cf8",fontWeight:700,fontSize:15,cursor:"pointer",width:"100%"}}>🛰️ Use My GPS Location</button>
                    {user?.district&&(
                      <button onClick={()=>{const d=allDistricts.find(d=>d.id===user.district);if(d){setUserDist(d);setGpsState("found");}}} style={{marginTop:10,padding:"10px 20px",borderRadius:12,background:"rgba(46,213,115,0.08)",border:"1px solid rgba(46,213,115,0.2)",color:"#2ed573",fontWeight:700,fontSize:13,cursor:"pointer",width:"100%"}}>
                        Use Registered: {allDistricts.find(d=>d.id===user.district)?.name}, {user.state}
                      </button>
                    )}
                  </div>
                )}
                {gpsState==="detecting"&&(
                  <div style={{textAlign:"center",padding:"18px 0"}}>
                    <div style={{width:38,height:38,borderRadius:"50%",border:"3px solid rgba(124,140,248,0.2)",borderTop:"3px solid #7c8cf8",animation:"spin 0.8s linear infinite",margin:"0 auto 12px"}}/>
                    <div style={{fontSize:15,color:"#666",animation:"pulse 1.4s ease infinite"}}>Detecting your location...</div>
                  </div>
                )}
                {gpsState==="error"&&(
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    <div style={{padding:"12px 14px",borderRadius:10,background:"rgba(255,71,87,0.07)",border:"1px solid rgba(255,71,87,0.18)",fontSize:14,color:"#ff4757"}}>📵 GPS unavailable — select manually</div>
                    <select onChange={e=>setSelectedState(e.target.value)} value={selectedState} style={{padding:"13px 14px",borderRadius:11,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",color:"#aaa",fontSize:15}}>
                      <option value="">Select State...</option>
                      {STATE_LIST.map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                    {selectedState&&(
                      <select onChange={e=>{const d=allDistricts.find(d=>d.id===e.target.value);if(d){setUserDist(d);setGpsState("found");}}} style={{padding:"13px 14px",borderRadius:11,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",color:"#aaa",fontSize:15}}>
                        <option value="">Select District...</option>
                        {(INDIA_DATA[selectedState]||[]).map(d=><option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                    )}
                  </div>
                )}
                {gpsState==="found"&&userDist&&uw&&(
                  <>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                      <div>
                        <div style={{fontSize:20,fontWeight:800,color:"#fff"}}>📍 {userDist.name}</div>
                        <div style={{fontSize:13,color:"#555"}}>{selectedState} · {uw.condition} · {uw.temp}°C</div>
                      </div>
                      <div style={{padding:"10px 14px",borderRadius:11,background:ur.bg,border:`1px solid ${ur.color}44`}}>
                        <div style={{fontSize:15,fontWeight:800,color:ur.color}}>{ur.level}</div>
                        <div style={{fontSize:11,color:ur.color+"88",textAlign:"center"}}>{ur.score}/100</div>
                      </div>
                    </div>
                    {[{l:"🌧️ Rain",v:uw.rain,fn:rainRisk},{l:"🔥 Heat",v:uw.heat,fn:heatRisk},{l:"⛈️ Storm",v:uw.storm,fn:stormRisk},{l:"🌫️ AQI",v:uw.aqi/200,fn:v=>v>0.5?{l:"Poor",c:"#a29bfe"}:v>0.3?{l:"Moderate",c:"#ffa502"}:{l:"Good",c:"#2ed573"}}].map(row=>{
                      const rk=row.fn(row.v);
                      return (
                        <div key={row.l} style={{marginBottom:10}}>
                          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                            <span style={{fontSize:13,color:"#777"}}>{row.l}</span>
                            <span style={{fontSize:13,fontWeight:700,color:rk.c}}>{rk.l}</span>
                          </div>
                          <Bar pct={row.v*100} color={rk.c} glow={row.v>0.65}/>
                        </div>
                      );
                    })}
                    {userDist.safe&&<div style={{padding:"10px 12px",borderRadius:10,background:"rgba(46,213,115,0.08)",border:"1px solid rgba(46,213,115,0.2)",marginTop:4}}><div style={{fontSize:14,fontWeight:700,color:"#2ed573"}}>✅ Safe Zone — 20% premium discount!</div></div>}
                    <button onClick={()=>{setGpsState("idle");setUserDist(null);}} style={{marginTop:12,width:"100%",padding:"10px",borderRadius:10,background:"transparent",border:"1px solid rgba(255,255,255,0.06)",color:"#3a3a5a",cursor:"pointer",fontSize:13}}>Change District</button>
                  </>
                )}
              </Card>

              {fraudAlert&&(
                <div style={{padding:"13px 15px",borderRadius:13,background:"rgba(255,71,87,0.09)",border:"1px solid rgba(255,71,87,0.28)",animation:"glow 1s ease infinite",display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:20}}>🚨</span>
                  <div>
                    <div style={{fontSize:15,fontWeight:700,color:"#ff4757"}}>Suspicious Activity Detected</div>
                    <div style={{fontSize:13,color:"#ff475788"}}>Wait {cooldown}s before next claim.</div>
                  </div>
                </div>
              )}

              <Card style={{background:"linear-gradient(135deg,rgba(124,140,248,0.1),rgba(167,139,250,0.05))",border:"1px solid rgba(124,140,248,0.2)"}}>
                <div style={{fontSize:13,color:"#7c8cf8",letterSpacing:"0.09em",fontWeight:700,marginBottom:10}}>🤖 AI ADVISOR TIP</div>
                <div style={{fontSize:14,color:"#bbb",lineHeight:1.7}}>
                  {distObj?.safe?`✅ Safe Zone detected in ${distObj.name}, ${selectedState}. 20% discount applied. Low disruption risk today.`
                    :distObj?.flood?`⚠️ ${distObj.name} (${selectedState}) is flood-prone. Stay alert. Your plan covers ₹${plan.payout.rain} per rain event.`
                    :`📍 Set your district above for a personalised AI risk tip and exact premium.`}
                </div>
                <div style={{marginTop:12,display:"flex",gap:8}}>
                  {[{v:`₹${plan.weeklyBase}`,l:"Base/wk",c:"#7c8cf8"},{v:`₹${distObj&&weather[distObj.id]?calcPremium(plan,distObj,weather[distObj.id])?.finalPremium||plan.weeklyBase:plan.weeklyBase}`,l:"Your price",c:"#2ed573"},{v:`${Object.keys(plan.payout).length}`,l:"Triggers",c:"#ffa502"}].map(s=>(
                    <div key={s.l} style={{flex:1,padding:"9px 6px",borderRadius:10,background:s.c+"10",border:`1px solid ${s.c}25`,textAlign:"center"}}>
                      <div style={{fontSize:17,fontWeight:800,color:s.c,fontFamily:"monospace"}}>{s.v}</div>
                      <div style={{fontSize:10,color:"#555",marginTop:2}}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right */}
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              <Card>
                <div style={{fontSize:12,color:"#3a3a5a",letterSpacing:"0.09em",fontWeight:700,marginBottom:13}}>⚡ ZERO-TOUCH CLAIM TRIGGERS</div>
                <div className="trig-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
                  {TRIGGERS.map(trig=>(
                    <button key={trig.type} onClick={()=>fire(trig.type)} style={{padding:"13px 10px",borderRadius:13,background:cooldown>0?"rgba(255,255,255,0.02)":`${trig.color}18`,border:`1px solid ${cooldown>0?"rgba(255,255,255,0.04)":trig.color+"40"}`,color:cooldown>0?"#2a2a3f":"#fff",cursor:cooldown>0?"not-allowed":"pointer",textAlign:"center",transition:"all 0.2s"}}>
                      <div style={{fontSize:24,marginBottom:5}}>{trig.icon}</div>
                      <div style={{fontSize:13,fontWeight:700}}>{trig.label}</div>
                      <div style={{fontSize:11,color:cooldown>0?"#2a2a3f":trig.color,marginTop:3}}>{trig.desc}</div>
                      <div style={{fontSize:12,color:cooldown>0?"#222":trig.color,marginTop:3,fontFamily:"monospace",fontWeight:700}}>{cooldown>0?`${cooldown}s`:`₹${plan.payout[trig.type]}`}</div>
                    </button>
                  ))}
                </div>
                {cooldown>0&&<div style={{marginTop:11}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:12,color:"#3a3a5a"}}>Cooldown</span><span style={{fontSize:12,color:"#ffa502",fontFamily:"monospace"}}>{cooldown}s</span></div><Bar pct={(30-cooldown)/30*100} color="#ffa502"/></div>}
              </Card>

              <Card>
                <div style={{fontSize:12,color:"#3a3a5a",letterSpacing:"0.09em",fontWeight:700,marginBottom:13}}>📊 LIVE PLATFORM STATS</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  {[{label:"Workers Protected",value:"1,284",icon:"👷",color:"#7c8cf8"},{label:"Claims Today",value:"247",icon:"📋",color:"#2ed573"},{label:"Paid Out Today",value:"₹1.8L",icon:"💸",color:"#ffa502"},{label:"Avg Response",value:"4.2s",icon:"⚡",color:"#ff6b6b"}].map(s=>(
                    <div key={s.label} style={{padding:"12px",borderRadius:12,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"}}>
                      <div style={{fontSize:20,marginBottom:5}}>{s.icon}</div>
                      <div style={{fontSize:18,fontWeight:800,color:s.color,fontFamily:"monospace"}}>{s.value}</div>
                      <div style={{fontSize:11,color:"#555",marginTop:3}}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <div style={{fontSize:12,color:"#3a3a5a",letterSpacing:"0.09em",fontWeight:700,marginBottom:13}}>🕐 RECENT CLAIMS FEED</div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {claims.length===0?<div style={{textAlign:"center",padding:"20px 0",color:"#333",fontSize:13}}>No claims yet — trigger one!</div>:
                    [...claims].reverse().slice(0,4).map((c,i)=>{
                      const trig=TRIGGERS.find(t=>t.type===c.type)||TRIGGERS[0];
                      return (
                        <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",borderRadius:11,background:"rgba(46,213,115,0.05)",border:"1px solid rgba(46,213,115,0.12)"}}>
                          <div style={{display:"flex",alignItems:"center",gap:10}}>
                            <div style={{width:34,height:34,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,background:trig.color+"18"}}>{trig.icon}</div>
                            <div>
                              <div style={{fontSize:13,fontWeight:700,color:"#ddd"}}>{trig.label}</div>
                              <div style={{fontSize:11,color:"#555"}}>📍 {c.district}, {c.state||""} · {c.time}</div>
                            </div>
                          </div>
                          <div style={{textAlign:"right"}}>
                            <div style={{fontSize:14,fontWeight:800,color:"#2ed573",fontFamily:"monospace"}}>+₹{c.amount}</div>
                            <div style={{fontSize:10,color:"#2ed573aa"}}>Auto-paid</div>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* PREMIUM */}
        {tab==="premium"&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16,alignItems:"start"}}>
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              <div><div style={{fontSize:18,fontWeight:800,color:"#fff"}}>⚙️ Dynamic Premium Engine</div><div style={{fontSize:13,color:"#444",marginTop:2}}>AI-calculated based on district risk · {selectedState||user?.state||"India"}</div></div>
              {distObj&&weather[distObj.id]?(()=>{
                const calc=calcPremium(plan,distObj,weather[distObj.id]);
                if(!calc) return null;
                return (
                  <Card glow={distObj.safe?"#2ed573":"#ffa502"}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                      <div>
                        <div style={{fontSize:11,color:"#555",letterSpacing:"0.09em",fontWeight:700}}>⚙️ YOUR WEEKLY PREMIUM</div>
                        <div style={{fontSize:30,fontWeight:800,color:"#fff",fontFamily:"monospace",marginTop:5}}>₹{calc.finalPremium}<span style={{fontSize:14,color:"#555",fontWeight:400}}>/week</span></div>
                        {calc.finalPremium!==calc.base&&<div style={{fontSize:12,color:"#888",textDecoration:"line-through"}}>Base: ₹{calc.base}/week</div>}
                        <div style={{fontSize:12,color:"#555",marginTop:4}}>📍 {distObj.name}, {selectedState}</div>
                      </div>
                      <Pill color={distObj.safe?"#2ed573":"#ffa502"}>{distObj.safe?"✅ Safe Zone":"⚠️ Risk Zone"}</Pill>
                    </div>
                    {calc.reasons.map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 10px",borderRadius:9,background:"rgba(255,71,87,0.06)",border:"1px solid rgba(255,71,87,0.15)",marginBottom:6}}><span style={{fontSize:12,color:r.color}}>▲ {r.label}</span><span style={{fontSize:12,fontWeight:700,color:r.color,fontFamily:"monospace"}}>{r.delta}</span></div>)}
                    {calc.savings.map((s,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 10px",borderRadius:9,background:"rgba(46,213,115,0.06)",border:"1px solid rgba(46,213,115,0.15)",marginBottom:6}}><span style={{fontSize:12,color:s.color}}>▼ {s.label}</span><span style={{fontSize:12,fontWeight:700,color:s.color,fontFamily:"monospace"}}>{s.delta}</span></div>)}
                  </Card>
                );
              })():<Card><div style={{textAlign:"center",padding:20,color:"#555",fontSize:14}}>Set your district on Home tab first</div></Card>}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              <div style={{fontSize:11,color:"#3a3a5a",fontWeight:700,letterSpacing:"0.08em"}}>ALL PLANS COMPARISON</div>
              {PLANS.map(p=>{
                const calc2=distObj&&weather[distObj.id]?calcPremium(p,distObj,weather[distObj.id]):null;
                const isA=p.id===plan.id;
                return (
                  <Card key={p.id} glow={isA?p.color:null} style={{border:`1px solid ${isA?p.color+"44":"rgba(255,255,255,0.07)"}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <span style={{fontSize:20}}>{p.icon}</span>
                        <span style={{fontSize:15,fontWeight:800,color:isA?p.color:"#ddd"}}>{p.name}</span>
                        {isA&&<Pill color={p.color}>Active</Pill>}
                      </div>
                      <div><span style={{fontSize:22,fontWeight:800,color:"#fff",fontFamily:"monospace"}}>₹{calc2?calc2.finalPremium:p.weeklyBase}</span><span style={{fontSize:12,color:"#555"}}>/wk</span></div>
                    </div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      {Object.entries(p.payout).map(([k,v])=><span key={k} style={{fontSize:11,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",padding:"4px 9px",borderRadius:8,color:"#888"}}>{k==="rain"?"🌧️":k==="heat"?"🔥":k==="storm"?"⛈️":k==="curfew"?"🚫":"🌫️"}₹{v}</span>)}
                    </div>
                    {!isA&&<button onClick={()=>setActivePlan(p)} style={{marginTop:12,width:"100%",padding:"10px",borderRadius:10,background:`${p.color}15`,border:`1px solid ${p.color}33`,color:p.color,cursor:"pointer",fontSize:13,fontWeight:700}}>Switch to {p.name}</button>}
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* RISK PANEL */}
        {tab==="risk"&&(
          <div style={{display:"flex",flexDirection:"column",gap:13}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
              <div>
                <div style={{fontSize:18,fontWeight:800,color:"#fff"}}>🗺️ India Risk Panel</div>
                <div style={{fontSize:13,color:"#444",marginTop:2}}>{panelDistricts.length} districts in {panelState}</div>
              </div>
              <Pill color="#7c8cf8">{STATE_LIST.length} States</Pill>
            </div>

            {/* State switcher */}
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{fontSize:13,color:"#666",fontWeight:700,whiteSpace:"nowrap"}}>📍 State:</span>
              <select value={panelState} onChange={e=>setSelectedState(e.target.value)}
                style={{flex:1,padding:"10px 14px",borderRadius:11,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(124,140,248,0.3)",color:"#7c8cf8",fontSize:14,fontWeight:700}}>
                {STATE_LIST.map(s=><option key={s} value={s}>{s} ({INDIA_DATA[s].length} districts)</option>)}
              </select>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {[["HIGH","#ff4757"],["MEDIUM","#ffa502"],["LOW","#2ed573"]].map(([l,c])=>(
                <div key={l} style={{textAlign:"center",padding:"10px 6px",borderRadius:12,background:c+"12",border:`1px solid ${c}30`}}>
                  <div style={{fontSize:22,fontWeight:800,color:c,fontFamily:"monospace"}}>{counts[l]}</div>
                  <div style={{fontSize:10,color:c+"99",fontWeight:700}}>{l} RISK</div>
                </div>
              ))}
            </div>

            <div style={{position:"relative"}}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={`Search in ${panelState}...`} style={{width:"100%",padding:"11px 14px 11px 38px",borderRadius:11,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"#ccc",fontSize:14}}/>
              <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:15}}>🔍</span>
            </div>

            <div className="dist-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {panelDistricts.map(d=>{
                const w=weather[d.id];
                const rk=overallRisk(w);
                const isU=userDist?.id===d.id;
                const c2=w?calcPremium(plan,d,w):null;
                return (
                  <div key={d.id} style={{padding:"12px 14px",borderRadius:13,background:isU?"linear-gradient(135deg,rgba(124,140,248,0.13),rgba(167,139,250,0.06))":"rgba(255,255,255,0.03)",border:`1px solid ${isU?"rgba(124,140,248,0.3)":"rgba(255,255,255,0.06)"}`,transition:"all 0.2s"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                      <div>
                        <div style={{fontSize:13,fontWeight:700,color:isU?"#a78bfa":"#ddd",display:"flex",alignItems:"center",gap:5}}>
                          {isU&&"📍"}{d.name}
                          {d.safe&&<span style={{fontSize:9,color:"#2ed573",background:"rgba(46,213,115,0.12)",padding:"1px 5px",borderRadius:5}}>✅</span>}
                          {d.flood&&<span style={{fontSize:9,color:"#ff4757",background:"rgba(255,71,87,0.12)",padding:"1px 5px",borderRadius:5}}>⚠️</span>}
                        </div>
                        {w&&<div style={{fontSize:10,color:"#444",marginTop:1}}>{w.condition} · {w.temp}°C</div>}
                      </div>
                      <div style={{textAlign:"right"}}>
                        <Pill color={rk.color}>{rk.level}</Pill>
                        {c2&&<div style={{fontSize:10,color:"#555",marginTop:3,fontFamily:"monospace"}}>₹{c2.finalPremium}/wk</div>}
                      </div>
                    </div>
                    {w&&<Bar pct={rk.score} color={rk.color} glow={rk.level==="HIGH"} thin/>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CLAIMS */}
        {tab==="claims"&&(
          <div style={{display:"flex",flexDirection:"column",gap:13}}>
            <Card style={{background:"linear-gradient(135deg,rgba(46,213,115,0.09),rgba(46,213,115,0.02))",border:"1px solid rgba(46,213,115,0.16)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:11,color:"#2ed573",letterSpacing:"0.1em",fontWeight:700}}>WALLET BALANCE</div>
                  <div style={{fontSize:32,fontWeight:800,color:"#fff",fontFamily:"monospace",marginTop:5}}>₹{wallet.toLocaleString()}</div>
                  <div style={{fontSize:12,color:"#444",marginTop:3}}>{claims.length} claims · All auto-approved</div>
                </div>
                <div style={{fontSize:44}}>💳</div>
              </div>
            </Card>
            <div style={{fontSize:11,fontWeight:700,color:"#3a3a5a",letterSpacing:"0.08em"}}>CLAIM HISTORY</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10}}>
              {[...claims].reverse().map((c,i)=>{
                const trig=TRIGGERS.find(t=>t.type===c.type)||TRIGGERS[0];
                return (
                  <Card key={i} style={{padding:"13px 15px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div style={{width:38,height:38,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,background:trig.color+"18",border:`1px solid ${trig.color}33`}}>{trig.icon}</div>
                        <div>
                          <div style={{fontSize:13,fontWeight:700,color:"#ddd"}}>{trig.label}</div>
                          <div style={{fontSize:11,color:"#444",marginTop:2}}>📍 {c.district}{c.state?`, ${c.state}`:""} · {c.time}</div>
                        </div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontSize:15,fontWeight:800,color:"#2ed573",fontFamily:"monospace"}}>+₹{c.amount}</div>
                        <Pill color="#2ed573">Auto-Approved</Pill>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ADMIN */}
        {tab==="admin"&&(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:"#2ed573",boxShadow:"0 0 7px #2ed573"}}/>
              <span style={{fontSize:13,color:"#2ed573",fontWeight:700,letterSpacing:"0.1em"}}>ADMIN CONTROL PANEL · ALL INDIA</span>
            </div>
            <div className="admin-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:10}}>
              {[
                {l:"Total Claims",v:claims.length,icon:"📋",c:"#7c8cf8"},
                {l:"Total Payouts",v:`₹${claims.reduce((s,c)=>s+c.amount,0).toLocaleString()}`,icon:"💸",c:"#2ed573"},
                {l:"States Covered",v:STATE_LIST.length,icon:"🗺️",c:"#ffa502"},
                {l:"Districts",v:allDistricts.length,icon:"📍",c:"#a29bfe"},
              ].map(s=>(
                <Card key={s.l} glow={s.c} style={{padding:"14px 15px"}}>
                  <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
                  <div style={{fontSize:22,fontWeight:800,color:s.c,fontFamily:"monospace"}}>{s.v}</div>
                  <div style={{fontSize:11,color:"#555",marginTop:2}}>{s.l}</div>
                </Card>
              ))}
            </div>
            <Card>
              <div style={{fontSize:12,fontWeight:700,color:"#444",marginBottom:12,letterSpacing:"0.08em"}}>RECENT CLAIMS</div>
              {claims.length===0&&<div style={{textAlign:"center",color:"#333",fontSize:13,padding:16}}>No claims yet</div>}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:8}}>
                {[...claims].reverse().map((c,i)=>{
                  const trig=TRIGGERS.find(t=>t.type===c.type)||TRIGGERS[0];
                  return (
                    <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",borderRadius:10,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
                      <div><div style={{fontSize:13,fontWeight:600,color:"#ddd"}}>{trig.icon} {trig.label} · {c.district}{c.state?`, ${c.state}`:""}</div><div style={{fontSize:11,color:"#444"}}>{c.time}</div></div>
                      <div style={{fontSize:13,fontWeight:700,color:"#2ed573",fontFamily:"monospace"}}>+₹{c.amount}</div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}
      </div>

      {modal&&<ClaimModal type={modal} amount={plan.payout[modal]||500} onDone={onDone}/>}
    </div>
  );
}