import { dataList } from "./dataStore.js";

dataList.forEach(data => {
    //creating section-child container
    const sectionChild = document.createElement("section");
    sectionChild.className = "section-child";

    const headingContainer = document.createElement("div");
    headingContainer.className = "heading-container";

    // heading container children
    const h1 = document.createElement("h1");
    h1.className = "main-heading";

    const h3 = document.createElement("h3");
    h3.className = "sub-heading";

    //appending to parent container heading
    headingContainer.appendChild(h1);
    headingContainer.appendChild(h3);


    const sectionChildContent = document.createElement("div");
    sectionChildContent.className = "section-child-content";

    // section child container children
    const p = document.createElement("p");
    p.className = "content";

    // appending to parent container section child
    sectionChildContent.appendChild(p);

    if (data.code) {
        const pre = document.createElement("pre");
        pre.className = "code-content";

        sectionChildContent.appendChild(pre);

        // pre container children
        const code = document.createElement("code");
        code.id = "code";

        const copyIcon = document.createElement("img");
        copyIcon.src = "./public/copy.svg";
        copyIcon.alt = "copy-icon";


        copyIcon.onclick = async () => {
            try {
                await navigator.clipboard.writeText(data.code);
                copyIcon.src = "./public/tick.svg";
                setTimeout(() => {
                    copyIcon.src = "./public/copy.svg";
                }, 3000);
            } catch (error) {
                console.log("Navigator not supported!");
                alert("Clipboard API not supported in this browser!");
            }
        }

        // appending to parent pre
        pre.appendChild(copyIcon);
        pre.appendChild(code);

        code.textContent = data.code;
    }

    // setting data
    h1.textContent = data.heading;
    h3.textContent = data.subHeading;
    p.innerHTML = data.content;

    // appending to parent container sectionchild
    sectionChild.appendChild(headingContainer);
    sectionChild.appendChild(sectionChildContent);

    const sectionContainer = document.querySelector(".section-container");
    sectionContainer.appendChild(sectionChild);


    // creating sidebar list items
    const li = document.createElement("li");
    li.className = "sidebar-list-item";
    li.textContent = data.heading;
    li.onclick = function () {
        sectionChild.scrollIntoView({
            behavior: "smooth",
            block: "center"

        });
    };

    const ul = document.querySelector(".contents-sidebar>.inner-container>ul");
    ul.appendChild(li);
});