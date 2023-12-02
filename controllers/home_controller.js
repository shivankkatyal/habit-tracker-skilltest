const Habit = require('../models/habit');

module.exports.home = async function(req,res){    
    try {
        Habit.find({}).select('-updatedAt -createdAt -__v').sort({ _id: -1 })
        .then(habits => {
            var days = [];
            days.push(getDate(-6));
            days.push(getDate(-5));
            days.push(getDate(-4));
            days.push(getDate(-3));
            days.push(getDate(-2));
            days.push(getDate(-1));
            days.push(getDate(0));
            return res.render('home', {
                title: "Home",
                habit: habits,
                days: days
            }); 
        })
        .catch(err => {
            console.log(err);
        });
    } catch (error) {
      return res.redirect('back');
    }
}


// Find the Date and Return the string Date
function getDate(n) {
    let d = new Date();
    d.setDate(d.getDate() + n);
    var newDate = d.toLocaleDateString('pt-br').split('/').reverse().join('-');
    var day;
    switch (d.getDay()) {
        case 0: day = 'Sun';
            break;
        case 1: day = 'Mon';
            break;
        case 2: day = 'Tue';
            break;
        case 3: day = 'Wed';
            break;
        case 4: day = 'Thu';
            break;
        case 5: day = 'Fri';
            break;
        case 6: day = 'Sat';
            break;
    }
    return { date: newDate, day };
}
  