export interface Options {
    /**
     * The JIRA issue key(s) (e.g. the ABC in ABC-123).
     * Supports multiple JIRA projects (e.g. `['ABC', 'DEF']`).
     */
    key: string | string[];
    /** The JIRA instance issue base URL (e.g. https://jira.atlassian.com/browse/). */
    url: string;
    /**
     * The emoji to display with the JIRA issue link.
     * See the possible emoji values, listed as keys in the
     * [GitHub API `/emojis` response](https://api.github.com/emojis).
     * Defaults to `':link:'`.
     */
    emoji?: string;
    /**
     * A format function to format the message
     * @param {string} emoji
     * @param {string[]} jiraUrls
     * @returns {string}
     */
    format?: (emoji: string, jiraUrls: string[]) => string;
    /**
     * The location of the JIRA issue, either the PR title, or the git branch
     * Defaults to `title`
     */
    location?: 'title' | 'branch';
    /**
     * Should fail instead of warn
     * Defaults to false
     */
    shouldFail?: boolean;
    /**
     * A function to process JIRA issues
     * @param {string[]} jiraIssues
     * @returns {void}
     */
    issues?: (jiraIssues: string[]) => void;
}
/**
 * A Danger plugin to add a JIRA issue link to the Danger pull request comment.
 * If a pull request title does not contain the supplied JIRA issue identifier (e.g. ABC-123),
 * then Danger will comment with a warning on the pull request asking the developer
 * to include the JIRA issue identifier in the pull request title.
 */
export default function jiraIssue(options: Options): void;
