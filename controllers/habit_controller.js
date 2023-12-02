const Habit = require('../models/habit');

module.exports.create = async function(req, res){
    const { content } = req.body;
    console.log(content)
    Habit.findOne({ content:content }).then(habit => {
        if (habit) {
            // Update Existing Habit Status
            let dates = habit.dates, tzoffset = (new Date()).getTimezoneOffset() * 60000;
            var today = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
            dates.find(function (item, index) {
                if (item.date === today) {
                    console.log("Habit Already inserted in Database")
                    
                    res.redirect('back');
                }
                else {
                    dates.push({ date: today, complete: 'none' });
                    habit.dates = dates;
                    habit.save()
                        .then(habit => {
                            console.log(habit);
                            res.redirect('back');
                        })
                        .catch(err => console.log(err));
                }
            });
        }
        else {
            let dates = [], tzoffset = (new Date()).getTimezoneOffset() * 60000;
            var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
            dates.push({ date: localISOTime, complete: 'none' });
            const newHabit = new Habit({
               content,
                dates
            });

           
            newHabit
                .save()
                .then(habit => {
                    console.log(habit);
                    res.redirect('back');
                })
                .catch(err => console.log(err));
        }
         
    })
}
        
// Habit Status Update per Days
module.exports.updateHabit = async function update(req, res){
    console.log(req.query.date,"datedatedate")
    var d = req.query.date;
    var id = req.query.id;
    Habit.findById(id)
        .then(habit => {
            let dates = habit.dates;
            console.log(dates, "datesdatesdates")
            let found = false;
            dates.find(function (item, index) {
                console.log(item,"itemitemitem")
                console.log(index,"indexindexindex")

                if (item.date === d) {
                    if (item.complete === 'yes') {
                        item.complete = 'no';
                    }
                    else if (item.complete === 'no') {
                        item.complete = 'none'
                    }
                    else if (item.complete === 'none') {
                        item.complete = 'yes'
                    }
                    found = true;
                }
            })
            if (!found) {
                dates.push({ date: d, complete: 'yes' })
            }
            habit.dates = dates;
            return habit.save();
        })
        .then(updatedHabit => {
            console.log(updatedHabit);
            res.redirect('back');
        })
        .catch(err => {
            console.log("Habit status not updated", err);
            res.status(500).send("Error updating habit status");
        });
}

module.exports.destroy = async function(req, res){
    const documentProduct = await Habit.findOneAndDelete({ _id: req.params.id });
    if (!documentProduct) {
        res.status(500).json(err);
    } 
    console.log("Habit Deleted");
    res.redirect('/')
}