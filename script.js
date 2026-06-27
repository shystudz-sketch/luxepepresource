// ======================================
// Luxe Research Peptide Database
// script.js
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    // Search
    const searchInput = document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener("keyup", function () {

            const value = this.value.toLowerCase();

            const cards = document.querySelectorAll(".peptide-card");

            cards.forEach(card => {

                const text = card.innerText.toLowerCase();

                if (text.includes(value)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }

            });

        });

    }

    // Accordion

    document.addEventListener("click", function(e){

        if(e.target.classList.contains("accordion-header")){

            const body = e.target.nextElementSibling;

            e.target.classList.toggle("active");

            if(body.style.maxHeight){

                body.style.maxHeight = null;

            }else{

                body.style.maxHeight = body.scrollHeight + "px";

            }

        }

    });

    // Filters

    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(button=>{

        button.addEventListener("click",()=>{

            const filter = button.dataset.filter;

            document.querySelectorAll(".filter-btn")
            .forEach(btn=>btn.classList.remove("selected"));

            button.classList.add("selected");

            const cards=document.querySelectorAll(".peptide-card");

            cards.forEach(card=>{

                if(filter==="all"){

                    card.style.display="block";
                    return;

                }

                const tags=card.dataset.tags || "";

                if(tags.toLowerCase().includes(filter.toLowerCase())){

                    card.style.display="block";

                }else{

                    card.style.display="none";

                }

            });

        });

    });

    // Scroll button

    const topBtn=document.getElementById("topBtn");

    window.addEventListener("scroll",()=>{

        if(window.scrollY>500){

            topBtn.style.display="flex";

        }else{

            topBtn.style.display="none";

        }

    });

    topBtn.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

    // Placeholder for peptide JSON

    console.log("Luxe Research Database Ready");

});
