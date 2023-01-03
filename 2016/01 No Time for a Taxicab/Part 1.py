x = 0
y = 0
with open('input.txt') as input:
  directions = input.read().replace('\n', '').split(', ')
  
def turnLeft(facing):
  if (facing == "N"): return "W"
  elif (facing == "E"): return "N"
  elif (facing == "S"): return "E"
  else: return "S"

def turnRight(facing):
  if (facing == "N"): return "E"
  elif (facing == "E"): return "S"
  elif (facing == "S"): return "W"
  else: return "N"

def move(moveBy, facing):
  global y
  global x
  if (facing == "N"): y+= moveBy
  elif (facing == "E"): x+= moveBy
  elif (facing == "S"): y-= moveBy
  else: x-= moveBy

def solve():
  facing = "N"
  for dir in directions:
    if (dir[0] == "R"): facing = turnRight(facing)
    else: facing = turnLeft(facing)
    move(int(dir[1:]), facing)
  
  print("Part One Answer: " + str(abs(x) + abs(y)))

solve()