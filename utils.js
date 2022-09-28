var input, output;
window.addEventListener('DOMContentLoaded', function(event) {
    input = document.getElementById("numbers");
    output = document.getElementById("feed");
    input.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            document.getElementById("calculate").click();
            event.preventDefault();
        } else if (event.key === "Delete") {
            document.getElementById("remove").click();
            event.preventDefault();
        }
    });
});

function proc_num(num) {
    num = num.trim();
    if (!/^\d+$/.test(num)) {
        feed.innerHTML = '<span style="color:red;font-weight:bold;">"' + num + '" is not a (whole) number.<span>';
        throw new Error('Not a number...');
    }
    num = parseInt(num);
    if (num < 1 || num > 100) {
        feed.innerHTML = '<span style="color:red;font-weight:bold;">"' + num + '" unlikely: numbers are expected to be between 1 and 100.</span>';
        throw new Error('Unlikely number...');
    }
    return num;
}

function calc() {
    console.log("-- NEW --");
    var nums = input.value.split("+").map(proc_num);
    var sum = nums.reduce(function(a, b) {
        return a + b;
    }, 0);
    var checks = nums.map(function(num) {
        console.log("uncorrected: ", num / sum * 10);
        return Math.round(num / sum * 10);
    });
    var diff = 10 - checks.reduce(function(a, b) {
        return a + b;
    }, 0);
    if (diff !== 0) {
        console.log("Correction: ", diff);
        checks = checks.map(function(num) {
            if (diff < 0) {
                num = num - 1;
                diff++;
            } else if (diff > 0) {
                num = num + 1;
                diff--;
            }
            return num;
        });
    }
    diff = 10 - checks.reduce(function(a, b) {
        return a + b;
    }, 0);
    var text = ("(Numbers given: <i>" + nums.join(', ') +
        "</i>)<br/> <span style='color:lightgreen;font-size:120%;line-height:200%'>The distribution of the ten checks: <b>" + checks.join(', ') + "</span>");
    if (diff !== 0) {
        console.log(text);
        feed.innerHTML = "Something went wrong in the script... Contact me please.";
    } else {
        feed.innerHTML = text;
    }
}

function remov() {
    input.value = '';
}

// logo

if (Math.random() < 0.5) {
    document.getElementsByTagName('head')[0].innerHTML += '<link rel="icon" type="image/png" href="lgo.png">';
} else {
    document.getElementsByTagName('head')[0].innerHTML += '<link rel="icon" type="image/png" href="lgom.png">';
}
