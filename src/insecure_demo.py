def safe_execute(command: str):
    # Demo allow-list approach instead of eval
    allowed = {"hello": "echo hello"}
    if command in allowed:
        import subprocess
        subprocess.run(allowed[command].split(), check=True)
    else:
        print("Command not allowed")

safe_execute("hello")
