from pathlib import Path

# this is just going to write to a file
# instead of the project requiring a database as well

def writeToDb(symbol, date, value):
    try:

        documentPath = Path.cwd() / ".." / "fakedb" / f"{symbol}.txt"

        # create the file if it doesn't exist
        if not documentPath.exists():
            with documentPath.open(mode='x') as f:
                f.write("")

        # add the new data to the top of the file
        with documentPath.open(mode='r+') as f:
            existingContent = f.read()
            f.seek(0, 0)
            f.write(date.rstrip() + " " + value.rstrip() + "\n" + existingContent)
        
        return True, value

    except Exception as ex:
        return False, "There was a problem writing to the fakedb"