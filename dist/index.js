"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var link = function (href, text) {
    return "<a href=\"" + href + "\">" + text + "</a>";
};
var ensureUrlEndsWithSlash = function (url) {
    if (!url.endsWith('/')) {
        return url.concat('/');
    }
    return url;
};
/**
 * A Danger plugin to add a JIRA issue link to the Danger pull request comment.
 * If a pull request title does not contain the supplied JIRA issue identifier (e.g. ABC-123),
 * then Danger will comment with a warning on the pull request asking the developer
 * to include the JIRA issue identifier in the pull request title.
 */
function jiraIssue(options) {
    var _a = options || {}, _b = _a.key, key = _b === void 0 ? '' : _b, _c = _a.url, url = _c === void 0 ? '' : _c, _d = _a.emoji, emoji = _d === void 0 ? ':link:' : _d, _e = _a.location, location = _e === void 0 ? 'title' : _e, _f = _a.shouldFail, shouldFail = _f === void 0 ? false : _f;
    if (!url) {
        throw Error("'url' missing - must supply JIRA installation URL");
    }
    if (!key) {
        throw Error("'key' missing - must supply JIRA issue key");
    }
    // Support multiple JIRA projects.
    var keys = Array.isArray(key) ? "(" + key.join('|') + ")" : key;
    var jiraKeyRegex = new RegExp("(" + keys + "-[0-9]+)", 'g');
    var match;
    var jiraIssues = [];
    // tslint:disable-next-line:no-conditional-assignment
    var jiraLocation;
    switch (location) {
        case 'title': {
            jiraLocation = danger.github.pr.title;
            break;
        }
        case 'branch': {
            jiraLocation = danger.github.pr.head.ref;
            break;
        }
        default: {
            throw Error("Invalid value for 'location', must be either \"title\" or \"branch\"");
        }
    }
    match = jiraKeyRegex.exec(jiraLocation);
    while (match != null) {
        jiraIssues.push(match[0]);
        match = jiraKeyRegex.exec(jiraLocation);
    }
    if (jiraIssues.length > 0) {
        var jiraUrls = jiraIssues.map(function (issue) {
            return link(url_1.resolve(ensureUrlEndsWithSlash(url), issue), issue);
        });
        // use custom formatter, or default
        if (options.format) {
            message(options.format(emoji, jiraUrls));
        }
        else {
            message(emoji + " " + jiraUrls.join(', '));
        }
        // custom function to consume JIRA issues
        if (options.issues) {
            options.issues(jiraIssues);
        }
    }
    else {
        var jiraKey = Array.isArray(key) ? key.join('|') : key;
        var outputString = "Please add the JIRA issue key to the PR " + location + " (e.g. <code>" + jiraKey + "-1</code>)";
        if (shouldFail) {
            fail(outputString);
        }
        else {
            warn(outputString);
        }
    }
}
exports.default = jiraIssue;
