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
    var collection = [];
    nums.forEach(function(num, i) {
        for (let index = 0; index < num; index++) {
            collection.push(["no. " + (i + 1), '#' + (index + 1)])
        }
    });
    collection = get_random10(collection);
    var collect_dict = {};
    collection.forEach(elem => {
        collect_dict[elem[0]] = collect_dict[elem[0]] ? collect_dict[elem[0]] : [];
        collect_dict[elem[0]].push(elem[1])
    });
    var results = { 'issue': [], 'check': [] };
    console.log(Object.keys(collect_dict).sort(numsort));
    for (var key of Object.keys(collect_dict).sort(numsort)) {
        results.issue.push(key);
        results.check.push(collect_dict[key].sort(numsort).join('; '));
    }
    var text = ("(Numbers given: <i>" + nums.join(', ') +
        "</i>)<br/> <span id='table' style='color:lightgreen;font-size:120%;line-height:200%'>The distribution of the nine results: <b></span>");
    console.log(results);
    feed.innerHTML = text;
    results.issue.unshift('Issue number');
    results.check.unshift('Checks');
    createTable(results);
}


function numsort(a, b) {
    return a.localeCompare(b, undefined, { numeric: true });
}

function get_random10(arr) {
    var array = JSON.parse(JSON.stringify(arr));
    var newarr = [];
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        newarr[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return newarr.slice(0, 9);
};

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
