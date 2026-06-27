// ===========================================
// Luxe Research Peptide Database
// Dynamic Loader
// ===========================================

let peptides = [];

document.addEventListener("DOMContentLoaded", async () => {

    await loadPeptides();

    createCategoryButtons();

    renderPeptides(peptides);

    setupSearch();

});

async function loadPeptides(){

    try{

        const response = await fetch("peptides.json");

        peptides = await response.json();

    }catch(error){

        console.error("Unable to load peptides.",error);

    }

}

function renderPeptides(data){

    const container=document.getElementById("peptideContainer");

    container.innerHTML="";

    data.forEach(peptide=>{

        const card=document.createElement("div");

        card.className="peptide-card";

        card.innerHTML=`

        <div class="accordion-header">

            <div>

                <h2>${peptide.name}</h2>

                <p>${peptide.categories.join(" • ")}</p>

            </div>

            <span>+</span>

        </div>

        <div class="accordion-body">

            <h3>Benefits</h3>

            <ul>

                ${peptide.benefits.map(x=>`<li>${x}</li>`).join("")}

            </ul>

            <h3>Protocols</h3>

            ${renderProtocols(peptide.protocols)}

            <h3>Good With</h3>

            <p>${peptide.goodWith.join(", ") || "None"}</p>

            <h3>Avoid With</h3>

            <p>${peptide.avoidWith.join(", ") || "None"}</p>

            <h3>Half-Life</h3>

            <p>${peptide.halfLife || "N/A"}</p>

            <h3>Side Effects</h3>

            <ul>

                ${peptide.sideEffects.map(x=>`<li>${x}</li>`).join("")}

            </ul>

            <h3>Notes</h3>

            <ul>

                ${peptide.notes.map(x=>`<li>${x}</li>`).join("")}

            </ul>

            <a
                class="product-button"
                target="_blank"
                href="${peptide.productUrl}">
                View Product
            </a>

        </div>

        `;

        container.appendChild(card);

    });

    setupAccordion();

}

function renderProtocols(protocols){

    let html="";

    for(const key in protocols){

        html+=`<strong>${key}</strong>`;

        if(Array.isArray(protocols[key])){

            html+="<ul>";

            protocols[key].forEach(item=>{

                html+=`<li>${item}</li>`;

            });

            html+="</ul>";

        }else{

            html+=`<p>${protocols[key]}</p>`;

        }

    }

    return html;

}

function setupAccordion(){

    document.querySelectorAll(".accordion-header").forEach(header=>{

        header.onclick=()=>{

            const body=header.nextElementSibling;

            const open=body.style.maxHeight;

            document.querySelectorAll(".accordion-body").forEach(b=>{

                b.style.maxHeight=null;

            });

            if(!open){

                body.style.maxHeight=body.scrollHeight+"px";

            }

        };

    });

}

function setupSearch(){

    const search=document.getElementById("searchInput");

    search.addEventListener("keyup",()=>{

        const value=search.value.toLowerCase();

        const filtered=peptides.filter(p=>{

            return JSON.stringify(p).toLowerCase().includes(value);

        });

        renderPeptides(filtered);

    });

}

function createCategoryButtons(){

    const categories=new Set();

    peptides.forEach(p=>{

        p.categories.forEach(c=>categories.add(c));

    });

    const filter=document.getElementById("filters");

    filter.innerHTML="";

    const all=document.createElement("button");

    all.innerText="All";

    all.className="filter-btn";

    all.onclick=()=>renderPeptides(peptides);

    filter.appendChild(all);

    [...categories].sort().forEach(cat=>{

        const btn=document.createElement("button");

        btn.className="filter-btn";

        btn.innerText=cat;

        btn.onclick=()=>{

            renderPeptides(

                peptides.filter(p=>

                    p.categories.includes(cat)

                )

            );

        };

        filter.appendChild(btn);

    });

}
