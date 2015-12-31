<?php 
header('content-type:application/json');
echo file_get_contents("http://blackjack-v2.pandoe.com/config/rooms.json");