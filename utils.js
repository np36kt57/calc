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
    var begin_at;
    var results = { 'issue': [], 'check': [], 'begin': [], 'direction': [] };
    nums.forEach(function(num, i) {
        console.log("uncorrected: ", num / sum * 10);
        // 1: The first issue starts at the middle, moving forward.
        // 2: The second issue starts at the middle, moving backward.
        // 3: The third issue starts at the beginning, moving forward.
        // 4: The fourth issue starts at the end, moving backwards.
        if (i % 4 === 0) {
            begin_at = 'middle: #' + Math.ceil(num / 2);
        } else if (i % 4 === 1) {
            begin_at = 'middle: #' + Math.floor(num / 2);
        } else if (i % 4 === 2) {
            begin_at = 'beginning (#1)';
        } else {
            begin_at = 'very end (#' + num + ')';
        }
        results.issue.push("no. " + (i + 1));
        results.check.push(Math.round(num / sum * 10));
        results.direction.push(i % 2 === 0 ? 'forward' : 'backward');
        results.begin.push(begin_at);
    });
    var diff = 10 - results.check.reduce(function(a, b) {
        return a + b;
    }, 0);
    if (diff !== 0) {
        console.log("Correction: ", diff);
        results.check = results.check.map(function(num, i) {
            if (diff < 0) {
                num = num - 1;
                diff++;
            } else if (diff > 0) {
                if (!(i === 0 && num === 1)) {
                    num = num + 1;
                    diff--;
                }
            }
            return num;
        });
    }
    diff = 10 - results.check.reduce(function(a, b) {
        return a + b;
    }, 0);
    var text = ("(Numbers given: <i>" + nums.join(', ') +
        "</i>)<br/> <span id='table' style='color:lightgreen;font-size:120%;line-height:200%'>The distribution of the ten results: <b></span>");
    console.log(results);
    if (diff !== 0) {
        feed.innerHTML = "Something went wrong in the script... Contact me please.";
    } else {
        feed.innerHTML = text;
        results.issue.unshift('Issue number');
        results.check.unshift('Amount to check');
        results.begin.unshift('Begin at');
        results.direction.unshift('Direction');
        createTable(results);
    }
}

function remov() {
    input.value = '';
}

function createTable(data) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');

    Object.keys(data).forEach(function(d_key, i) {
        var rowData = data[d_key];
        var row = document.createElement('tr');
        if (i == 0) {
            row.classList.add("t_head");
        }

        rowData.forEach(function(cellData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    document.getElementById("table").appendChild(table);
}

// logo

if (Math.random() < 0.5) {
    document.getElementsByTagName('head')[0].innerHTML += '<link rel="icon" type="image/png" href="lgo.png">';
} else {
    document.getElementsByTagName('head')[0].innerHTML += '<link rel="icon" type="image/png" href="lgom.png">';
}
