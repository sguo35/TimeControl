// TimeLibrary.cpp : Defines the exported functions for the DLL application.
//

#include "stdafx.h"
#include "TimeLibrary.h"

#include <Windows.h>
#include <iostream>

	bool isIdle() {
		static const unsigned int idle_milliseconds = 60 * 1000 * 15; //15 minutes

		LASTINPUTINFO last_input;
		last_input.cbSize = sizeof(last_input);
		BOOL sceensaver_running;

		DWORD idle_time;
		bool screensaverOn = false;

		if (!GetLastInputInfo(&last_input) ||
			!SystemParametersInfo(SPI_GETSCREENSAVERRUNNING, 0, &sceensaver_running, 0)) {
			std::cerr << "WinAPI failed!" << std::endl;
			return false;
		}

		if (GetTickCount() - last_input.dwTime < idle_milliseconds && !sceensaver_running) {
			//user hasn't been/isn't idle
			return false;
		}
		return true;
	}
	void logout() {
		ExitWindowsEx(EWX_LOGOFF, 0);
	}