x = 0
y = 0
with open('input.txt') as input:
  directions = input.read().replace('\n', '').split(', ')

cached = []
foundDup = False

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
  global foundDup

  for _ in range(moveBy):
    if (facing == "N"): y+=1
    elif (facing == "E"): x+=1
    elif (facing == "S"): y-=1
    else: x-=1

    beenThere = next((coord for coord in cached if coord["x"] == x and coord["y"] == y), None)
    if beenThere is not None:
      print("Part Two Answer: " + str(x+y))
      foundDup = True
      return True
    else: cached.append({'x': x, 'y': y})

def solve():
  facing = "N"
  while not foundDup:
    for dir in directions:
      if (dir[0] == "R"): facing = turnRight(facing)
      else: facing = turnLeft(facing)
      response = move(int(dir[1:]), facing)
      if response: break

solve()