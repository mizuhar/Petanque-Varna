import math

serial_name = str(input())
length_episode = int(input())
relax_min = int(input())

time_for_launch = relax_min * 0.125
time_for_pause = relax_min * 0.25

time_ost = relax_min - (time_for_pause + time_for_launch)

if time_ost >= length_episode:
    print(f'You have enough time to watch {serial_name} and left with {math.ceil(time_ost - length_episode)} minutes free time.')
else: print(f"You don't have enough time to watch {serial_name}, you need {math.ceil(length_episode - time_ost)} more minutes.")   