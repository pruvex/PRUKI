@echo off
setlocal

set "PORT_TO_KILL=5174"
set "PID_TO_KILL="

:find_process
for /f "tokens=5" %%a in ('netstat -ano ^| findstr /i "listening" ^| findstr ":%PORT_TO_KILL%" ') do (
    set "PID_TO_KILL=%%a"
    goto :kill_process
)

rem If no process found, exit successfully
echo No process found listening on port %PORT_TO_KILL%.
exit /b 0

:kill_process
echo Found process %PID_TO_KILL% listening on port %PORT_TO_KILL%. Attempting to kill...
taskkill /PID %PID_TO_KILL% /F

rem Give some time for the port to be released and verify
:wait_for_port_release
timeout /t 1 /nobreak >nul

for /f "tokens=5" %%a in ('netstat -ano ^| findstr /i "listening" ^| findstr ":%PORT_TO_KILL%" ') do (
    echo Process %PID_TO_KILL% is still listening on port %PORT_TO_KILL%. Waiting...
    goto :wait_for_port_release
)

echo Process %PID_TO_KILL% killed successfully and port %PORT_TO_KILL% is free.
exit /b 0