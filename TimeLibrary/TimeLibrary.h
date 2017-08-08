#pragma once

#if defined(WIN32) || defined(_WIN32)
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#endif
		//Returns if the computer is idle or not
extern "C" EXPORT bool isIdle();
		//Logs the user out of Windows
extern "C" EXPORT void logout();