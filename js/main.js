/* 
Link Zhou Fang
2018-11-06
*/

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector("#btnBack").addEventListener("click", onoroff);
    document.querySelector("#btnSend").addEventListener("click", generate);

    document.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
            generate();
        }
        //        console.log(e.keyCode);
    });

    let pages = [];
    pages = document.querySelectorAll(".page");
    let url = "https://davidst.edumedia.ca/mad9014/nums.php";

    function onoroff() {
        pages[0].classList.toggle("active");
        pages[1].classList.toggle("active");
    }

    function reminder() {
        let d = document.querySelector("#digits");
        let m = document.querySelector("#max");
        if (d.value <= 0) {
            alert("Seriously? \nNo digits no wins!");
            d.focus();
        } else if (d.value > 10) {
            alert(d.value + " is obviously bigger than 10, right?");
            d.focus();
        } else if (d.value - Math.ceil(d.value) < 0) {
            alert("You must be kidding. \nLotto only accepts integer.")
            d.focus();
        } else if (m.value <= 0) {
            alert("Do you want to do this or not? \nNo range no wins!");
            m.focus();
        }

        //        else if (m.value < d.value) {
        //            alert("OK. It seems you are not good at math. \nThe range should be bigger than the number of digits.");
        //            m.focus();
        //        } 
        else if (m.value - d.value < 0) {
            alert("OK. It seems you are not good at math. \nThe range should be bigger than the number of digits.");
            m.focus();
        } else if (m.value > 99) {
            alert(m.value + " is obviously bigger than 99, right?");
            m.focus();
        } else if (m.value - Math.ceil(m.value) < 0) {
            alert("You must be kidding. \nLotto only accepts integer.")
            m.focus();
        } else {
            onoroff();
        }
        return;
    }

    function generate() {
        console.log(document.querySelector("#digits").value);
        reminder();
        let form = new FormData();
        let digits = document.querySelector("#digits").value;
        let max = document.querySelector("#max").value;
        form.append("digits", digits);
        form.append("max", max);
        let req = new Request(url, {
            method: "POST",
            mode: "cors",
            body: form
        });

        fetch(req)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let numbers = data.numbers;
                let ul = document.querySelector(".num_list");
                ul.textContent = "";
                for (let i in numbers) {
                    let li = document.createElement("li");
                    li.textContent = numbers[i];
                    ul.appendChild(li);
                }
                console.log(data);
            });
    }
}
