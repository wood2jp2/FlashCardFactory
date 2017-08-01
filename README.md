I actually ended up going a slightly different route on this assignment. I found the instructions to this assignment a bit vague.
I figured the easiest and most efficient way to track the cards that the user was creating from the terminal would be to create
a SQL database. From there, I used inquirer to ask the user which activity they'd like to do involving the flash cards (create
or view / quiz themselves). I was able to manipulate the user input to come up with the fronts/backs/partial text for both
basic and cloze-view cards. From there, it was a bit of a loop through all of the cards in the database to pull the existing
user cards down, and have the user 'quiz' themselves. It took a little while to figure out, but I should have known a simple
global counter variable would do the trick...Anyways, unfortunately the app breaks once the user runs out of cards to pull down
from the database, but hey, no one's perfect.
