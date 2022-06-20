var exec = require('cordova/exec');
var registry = require("./ArgsRegistry");

var getInvocationEvents = function () {
    return {
        shake: 'shake',
        button: 'button',
        screenshot: 'screenshot',
        swipe: 'swipe',
        none: 'none'
    };
};

var getReproStepsMode = function () {
    return {
        enabled: 'enabled',
        disabled: 'disabled',
        enabledWithNoScreenshots: 'enabledWithNoScreenshots'
    };
};

var getWelcomeMessageMode = function () {
    return {
        welcomeMessageModeLive: 'welcomeMessageModeLive',
        welcomeMessageModeBeta: 'welcomeMessageModeBeta',
        welcomeMessageModeDisabled: 'welcomeMessageModeDisabled'
    }
};

var getLocales = function () {
    return {
        arabic: 'arabic',
        azerbaijani: 'azerbaijani',
        chineseSimplified: 'chineseSimplified',
        chineseTraditional: 'chineseTraditional',
        danish: 'danish',
        dutch: 'dutch',
        english: 'english',
        french: 'french',
        german: 'german',
        italian: 'italian',
        japanese: 'japanese',
        korean: 'korean',
        polish: 'polish',
        portugueseBrazil: 'portugueseBrazil',
        russian: 'russian',
        spanish: 'spanish',
        swedish: 'swedish',
        turkish: 'turkish',
        czech: 'czech'
    };
};

var Instabug = function () {
};

Instabug.welcomeMessageMode = registry.welcomeMessageMode;
Instabug.floatingButtonEdge = registry.floatingButtonEdge;
Instabug.colorTheme = registry.colorTheme;
Instabug.strings = registry.strings;

Instabug.start = function (token, invocationEvents, success, error) {
    const validEvents = getInvocationEvents();
    const isValid = invocationEvents.every((e) => validEvents[e]);

    if (isValid && invocationEvents.length > 0) {
        exec(success, error, 'IBGPlugin', 'start', [token, invocationEvents]);
    } else {
        console.log('Could not start Instabug -  invalid invocation events');
    }
};

Instabug.show = function (success, error) {
    exec(success, error, 'IBGPlugin', 'show');
}

Instabug.setPrimaryColor = function (colorInteger, success, error) {
    exec(success, error, 'IBGPlugin', 'setPrimaryColor', [colorInteger]);
};

Instabug.logUserEventWithName = function (userEvent, success, error) {
    exec(success, error, 'IBGPlugin', 'logUserEventWithName', [userEvent]);
};

Instabug.setReproStepsMode = function (reproStepsMode, success, error) {

  var validatedReproStepsMode = getReproStepsMode()[reproStepsMode];

  if (validatedReproStepsMode) {
      exec(success, error, 'IBGPlugin', 'setReproStepsMode', [validatedReproStepsMode]);
  } else {
      console.log('Could not set user steps mode - "' + validatedReproStepsMode + '" is not valid.');
  }
};

/**
 * The session profiler is enabled by default and it attaches to the bug and
 * crash reports the following information during the last 60 seconds before the report is sent.
 * @param {boolean} isEnabled - A boolean parameter to enable or disable the feature.
 * @param {function} success callback on function success
 * @param {function(string):void} error callback on function error
 */
 Instabug.setSessionProfilerEnabled = function (isEnabled, success, error) {
    exec(success, error, 'IBGPlugin', 'setSessionProfilerEnabled', [isEnabled]);
};

/**
 * Sets whether the SDK is tracking user steps or not.
 * Enabling user steps would give you an insight on the scenario a user has
 * performed before encountering a bug or a crash. User steps are attached
 * with each report being sent.
 * @param {boolean} isEnabled A boolean to set user steps tracking
 * to being enabled or disabled.
 * @param {function} success callback on function success
 * @param {function(string):void} error callback on function error
 */
Instabug.setTrackUserStepsEnabled = function (isEnabled, success, error) {
    exec(success, error, 'IBGPlugin', 'setTrackUserStepsEnabled', [isEnabled]);
};

/**
 * Sets the welcome message mode to live, beta or disabled.
 * @param {keyof Instabug.welcomeMessageMode} mode.
 * @param {function} success callback on function success
 * @param {function(string):void} error callback on function error
 */
Instabug.setWelcomeMessageMode = function (mode, success, error) {
    exec(success, error, 'IBGPlugin', 'setWelcomeMessageMode', [mode]);
};

/**
 * Shows the welcome message in a specific mode.
 * @param {keyof Instabug.welcomeMessageMode} mode.
 * @param {function} success callback on function success
 * @param {function(string):void} error callback on function error
 */
Instabug.showWelcomeMessage = function (mode, success, error) {
    exec(success, error, 'IBGPlugin', 'showWelcomeMessage', [mode]);
};

Instabug.setUserData = function (data, success, error) {
    exec(success, error, 'IBGPlugin', 'setUserData', [data]);
};

Instabug.addFile = function (filePath, success, error) {
    exec(success, error, 'IBGPlugin', 'addFile', [filePath]);
}

Instabug.addLog = function (content, success, error) {
    exec(success, error, 'IBGPlugin', 'addLog', [content]);
};

Instabug.clearLog = function (success, error) {
    exec(success, error, 'IBGPlugin', 'clearLog', []);
};

Instabug.setIBGLogPrintsToConsole = function (isEnabled, success, error) {
    exec(success, error, 'IBGPlugin', 'setIBGLogPrintsToConsole', [isEnabled]);
};

Instabug.disable = function (success, error) {
    exec(success, error, 'IBGPlugin', 'disable', []);
};

Instabug.enable = function (success, error) {
    exec(success, error, 'IBGPlugin', 'enable', []);
};

Instabug.isEnabled = function (success, error) {
    exec(success, error, 'IBGPlugin', 'isEnabled', []);
};

Instabug.setUserAttribute = function (key, value, success, error) {
    exec(success, error, 'IBGPlugin', 'setUserAttribute', [key, value]);
};

Instabug.removeUserAttribute = function (key, success, error) {
    exec(success, error, 'IBGPlugin', 'removeUserAttribute', [key]);
};

Instabug.getAllUserAttributes = function (success, error) {
    exec(success, error, 'IBGPlugin', 'getAllUserAttributes', []);
};

Instabug.getUserAttribute = function (key, success, error) {
    exec(success, error, 'IBGPlugin', 'getUserAttribute', [key]);
};

Instabug.identifyUserWithEmail = function (email, name, success, error) {
    exec(success, error, 'IBGPlugin', 'identifyUserWithEmail', [email, name]);
};

Instabug.setPreSendingHandler = function (success, error) {
    exec(success, error, 'IBGPlugin', 'setPreSendingHandler', []);
};

Instabug.setVideoRecordingFloatingButtonPosition = function (position, success, error) {
    exec(success, error, 'IBGPlugin', 'setVideoRecordingFloatingButtonPosition', [position]);
};

Instabug.logOut = function (success, error) {
    exec(success, error, 'IBGPlugin', 'logOut', []);
};

Instabug.setDebugEnabled = function (isDebugEnabled, success, error) {
    exec(success, error, 'IBGPlugin', 'setDebugEnabled', [isDebugEnabled]);
    if(success) {
        console.log("setting debug enabled to " + isDebugEnabled);
    } else if(error) {
        console.log("setting debug enabled not successful");
    }
};

Instabug.setLocale = function (locale, success, error) {
    var validatedLocale = getLocales()[locale];

    if (validatedLocale) {
        exec(success, error, 'IBGPlugin', 'setLocale', [validatedLocale]);
    } else {
        console.log('Could not set locale - "' + locale + '" is not valid.');
    }
};

/**
 * Sets SDK color theme.
 * @param {keyof Instabug.colorTheme} theme.
 * @param {function} success callback on function success
 * @param {function(string):void} error callback on function error
 */
Instabug.setColorTheme = function (theme, success, error) {
    exec(success, error, 'IBGPlugin', 'setColorTheme', [theme]);
};

/**
 * Overrides any of the strings shown in the SDK with custom ones.
 * Allows you to customize any of the strings shown to users in the SDK.
 * @param {strings} key Key of string to override.
 * @param {string} value String value to override the default one.
 */
Instabug.setString = function (key, value, success, error) {
    exec(success, error, 'IBGPlugin', 'setString', [key, value]);
};

module.exports = Instabug;
