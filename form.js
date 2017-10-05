    var optionsArray2 = {
        "0": "Choose an answer",
        "1": "Normal activity & work, no evidence of disease",
        "2": "Normal activity & work, some evidence of disease",
        "3": "Normal activity with effort, some evidence of disease",
        "4": "Unable to do normal job/work, significant disease",
        "5": "Unable to do hobby/house work, significant disease",
        "6": "Unable to do any work, extensive disease",
        "7": "Unable to do most activity, extensive disease",
        "8": "Unable to do any activity, extensive disease"
    }

    var optionsArray3 = {
        "0": "Choose an answer",
        "1": "Full",
        "2": "Occasional assistance necessary",
        "3": "Considerable assistance required",
        "4": "Mainly assistance",
        "5": "Total care"
    }

    var optionsArray4 = {
        "0": "Choose an answer",
        "1": "Normal",
        "2": "Normal or reduced",
        "3": "Minimal to sips",
        "4": "Mouth care only"
    }

    var optionsArray5 = {
        "0": "Choose an answer",
        "1": "Full",
        "2": "Full or confusion",
        "3": "Full or drowsy +/- confusion",
        "4": "Drowsy or coma +/- confusion"
    }

    // remove options from select droplist, except for the first Select option with value 0;
    function removeOptions(el) {
        el.find('option').remove().end();
    }

    // build the options
    function buildOpts(allOpts, availOpts, nextQ) {

        $.each(allOpts, function(key, value) {
            if ($.inArray(key, availOpts) !== -1) {
                nextQ.append($("<option></option>")
                    .attr("value", key)
                    .text(value));
            }
        });
    } // end build the options

    // doc ready
    $(document).ready(function() {
        // change the option values of the next question based

        // when q_1 changes, update q_2
        $('#q_1').change(function() {
            var nextQ = $('#q_2');
            removeOptions(nextQ);
            var allOpts = optionsArray2;
            var availOpts = null;

            // the available options depends on the answer of the prev question
            switch ($(this).val()) {
                case '1':
                    availOpts = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
                    break;
                case '2':
                    availOpts = ['0', '4', '5', '6', '7', '8'];
                    break;
                case '3':
                    availOpts = ['0', '6', '7', '8'];
                    break;
                case '4':
                    availOpts = ['0', '7', '8'];
                    break;
                case '5':
                    availOpts = ['8'];
                    break;

            } // end switch

            buildOpts(allOpts, availOpts, nextQ);
            updateQ3();
            updateQ4();
            updateQ5();
        }); // end q_1 change

        //----------------------
        // when q_2 changes, update q_3
        $('#q_2').change(function() {
            updateQ3();
            updateQ4();
            updateQ5();
        }); // end q_2 change

        //----------------------
        // when q_2 or q_3 changes, update q_4
        $('#q_2, #q_3').change(function() {
            updateQ4();
            updateQ5();
        }); // end q_2 q_3

        //----------------------
        // when q_4 changes, update q_5
        $('#q_3, #q_4').change(function() {
            updateQ5();
        }); // end q_4 change

    });

    //===============================
    function updateQ3() {

        var nextQ = $('#q_3');
        removeOptions(nextQ);
        var allOpts = optionsArray3;
        var availOpts;

        switch ($('#q_2').val()) {
            case '1':
            case '2':
            case '3':
            case '4':
                availOpts = ['0', '1', '2', '3', '4', '5'];
                break;
            case '5':
                availOpts = ['0', '2', '3', '4', '5'];
                break;
            case '6':
                availOpts = ['0', '3', '4', '5'];
                break;
            case '7':
                availOpts = ['0', '4', '5'];
                break;
            case '8':
                availOpts = ['5'];
                break;
            default:
                availOpts = ['0'];
                break;

        } // end switch

        buildOpts(allOpts, availOpts, nextQ);
    }

    //================================

    function updateQ4() {
        var nextQ = $('#q_4');
        removeOptions(nextQ);
        var allOpts = optionsArray4;
        var availOpts = null;

        // based on prev answer in $(this).val()
        if ($('#q_3').val() == '1' &&
            ($('#q_2').val() == '1' || $('#q_2').val() == '2')
        ) {
            availOpts = ['0', '1', '2', '3', '4'];
        } else {
            availOpts = ['0', '2', '3', '4'];
        }

        buildOpts(allOpts, availOpts, nextQ);
    }

    //================================
    function updateQ5() {
        var nextQ = $('#q_5');
        removeOptions(nextQ);
        var allOpts = optionsArray5;
        var availOpts = null;

        // depends  prev answer which in $(this).val()
        var theQ4 = $('#q_4').val();
        var theQ3 = $('#q_3').val();

        if (
            (theQ4 === '1' && theQ3 === '1') ||
            (theQ4 === '2' && theQ3 === '1')
        ) {
            // healthy with all three options
            availOpts = ['0', '1', '2', '3'];

        } else if (
            (theQ4 === '3' /* || theQ4 === '4'*/ ) ||
            (theQ4 === '2' && (theQ3 === '4' || theQ3 === '5'))
        ) {
            // poor with only one option
            availOpts = ['0', '3'];

        } else if (theQ4 === '4') {
            // whenever Q4 is "mouth care only", Q5 is "
            availOpts = ['4'];
        } else {

            // average with 2 options
            availOpts = ['0', '2', '3'];
        } // end switch

        buildOpts(allOpts, availOpts, nextQ);
    }

    // //================================
    // function healthPro(obj) {
    //     document.getElementById("maincontentbox").className = "maincontentbox";
    //     var answer = obj.value;
    //     if (answer == 'No') {
    //         alert("This tool is intended for use by healthcare professionals.  If you chose to continue, please discuss with a healthcare professional.");
    //     }
    //
    //
    // }


    function validateForm() {

        if (
            document.getElementById('q_1').value === '0' ||
            document.getElementById('q_2').value === '0' ||
            document.getElementById('q_3').value === '0' ||
            document.getElementById('q_4').value === '0' ||
            document.getElementById('q_5').value === '0'
        ) {
            alert("Please choose an answer for all questions.");
            return false;
        }

 //       var e = document.getElementById("bestGuess");
 //       if (e.options[e.selectedIndex].value == '') {
 //           alert("You’re almost done, please enter your best guess of median survival in days.");
 //           return false;
 //       }

    }
