const API = "https://amtec-technologies-backend-production.up.railway.app/api/contact";

async function loadContact(){

    const res = await fetch(API);

    const data = await res.json();

    for(const key in data){

        if(document.getElementById(key)){

            document.getElementById(key).value = data[key] || "";

        }

    }

}

loadContact();

document.getElementById("contactForm").addEventListener("submit",async(e)=>{

    e.preventDefault();

    const data = {

        company_name: company_name.value,
        address: address.value,
        phone1: phone1.value,
        phone2: phone2.value,
        email: email.value,
        whatsapp: whatsapp.value,
        google_map: google_map.value,
        working_hours: working_hours.value,
        facebook: facebook.value,
        instagram: instagram.value,
        linkedin: linkedin.value,
        youtube: youtube.value

    };

    const res = await fetch(API,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

    });

    const result = await res.json();

    alert(result.message);

});