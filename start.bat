@echo off
echo Demarrage Bahia Beach Club...
echo.

:: Tuer tout processus sur le port 3001
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001 2^>nul') do (
  taskkill /PID %%a /F >nul 2>&1
)

timeout /t 1 /nobreak >nul

:: Lancer le backend (qui sert aussi le frontend)
start "Bahia Backend" cmd /k "cd /d %~dp0backend && node server.js"

timeout /t 2 /nobreak >nul

echo  =========================================
echo   BAHIA BEACH CLUB - Serveur demarre
echo  =========================================
echo.
echo  Vitrine  : http://localhost:3001
echo  Kiosque  : http://localhost:3001/kiosk.html?table=7
echo  Admin    : http://localhost:3001/admin.html
echo  API      : http://localhost:3001/api/health
echo.
echo  Ouvrir dans le navigateur ? (O/N)
set /p choix="> "
if /i "%choix%"=="O" start http://localhost:3001/admin.html

pause
