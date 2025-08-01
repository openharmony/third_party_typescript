/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

declare namespace ts {
    namespace server {
        type ActionSet = "action::set";
        type ActionInvalidate = "action::invalidate";
        type ActionPackageInstalled = "action::packageInstalled";
        type EventTypesRegistry = "event::typesRegistry";
        type EventBeginInstallTypes = "event::beginInstallTypes";
        type EventEndInstallTypes = "event::endInstallTypes";
        type EventInitializationFailed = "event::initializationFailed";
        interface TypingInstallerResponse {
            readonly kind: ActionSet | ActionInvalidate | EventTypesRegistry | ActionPackageInstalled | EventBeginInstallTypes | EventEndInstallTypes | EventInitializationFailed;
        }
        interface TypingInstallerRequestWithProjectName {
            readonly projectName: string;
        }
        interface DiscoverTypings extends TypingInstallerRequestWithProjectName {
            readonly fileNames: string[];
            readonly projectRootPath: Path;
            readonly compilerOptions: CompilerOptions;
            readonly watchOptions?: WatchOptions;
            readonly typeAcquisition: TypeAcquisition;
            readonly unresolvedImports: SortedReadonlyArray<string>;
            readonly cachePath?: string;
            readonly kind: "discover";
        }
        interface CloseProject extends TypingInstallerRequestWithProjectName {
            readonly kind: "closeProject";
        }
        interface TypesRegistryRequest {
            readonly kind: "typesRegistry";
        }
        interface InstallPackageRequest extends TypingInstallerRequestWithProjectName {
            readonly kind: "installPackage";
            readonly fileName: Path;
            readonly packageName: string;
            readonly projectRootPath: Path;
        }
        interface PackageInstalledResponse extends ProjectResponse {
            readonly kind: ActionPackageInstalled;
            readonly success: boolean;
            readonly message: string;
        }
        interface InitializationFailedResponse extends TypingInstallerResponse {
            readonly kind: EventInitializationFailed;
            readonly message: string;
            readonly stack?: string;
        }
        interface ProjectResponse extends TypingInstallerResponse {
            readonly projectName: string;
        }
        interface InvalidateCachedTypings extends ProjectResponse {
            readonly kind: ActionInvalidate;
        }
        interface InstallTypes extends ProjectResponse {
            readonly kind: EventBeginInstallTypes | EventEndInstallTypes;
            readonly eventId: number;
            readonly typingsInstallerVersion: string;
            readonly packagesToInstall: readonly string[];
        }
        interface BeginInstallTypes extends InstallTypes {
            readonly kind: EventBeginInstallTypes;
        }
        interface EndInstallTypes extends InstallTypes {
            readonly kind: EventEndInstallTypes;
            readonly installSuccess: boolean;
        }
        interface SetTypings extends ProjectResponse {
            readonly typeAcquisition: TypeAcquisition;
            readonly compilerOptions: CompilerOptions;
            readonly typings: string[];
            readonly unresolvedImports: SortedReadonlyArray<string>;
            readonly kind: ActionSet;
        }
        namespace protocol {
            /**
             * Declaration module describing the TypeScript Server protocol
             */
            enum CommandTypes {
                JsxClosingTag = "jsxClosingTag",
                Brace = "brace",
                BraceCompletion = "braceCompletion",
                GetSpanOfEnclosingComment = "getSpanOfEnclosingComment",
                Change = "change",
                Close = "close",
                /** @deprecated Prefer CompletionInfo -- see comment on CompletionsResponse */
                Completions = "completions",
                CompletionInfo = "completionInfo",
                CompletionDetails = "completionEntryDetails",
                CompileOnSaveAffectedFileList = "compileOnSaveAffectedFileList",
                CompileOnSaveEmitFile = "compileOnSaveEmitFile",
                Configure = "configure",
                Definition = "definition",
                DefinitionAndBoundSpan = "definitionAndBoundSpan",
                Implementation = "implementation",
                Exit = "exit",
                FileReferences = "fileReferences",
                Format = "format",
                Formatonkey = "formatonkey",
                Geterr = "geterr",
                GeterrForProject = "geterrForProject",
                SemanticDiagnosticsSync = "semanticDiagnosticsSync",
                SyntacticDiagnosticsSync = "syntacticDiagnosticsSync",
                SuggestionDiagnosticsSync = "suggestionDiagnosticsSync",
                NavBar = "navbar",
                Navto = "navto",
                NavTree = "navtree",
                NavTreeFull = "navtree-full",
                /** @deprecated */
                Occurrences = "occurrences",
                DocumentHighlights = "documentHighlights",
                Open = "open",
                Quickinfo = "quickinfo",
                References = "references",
                Reload = "reload",
                Rename = "rename",
                Saveto = "saveto",
                SignatureHelp = "signatureHelp",
                FindSourceDefinition = "findSourceDefinition",
                Status = "status",
                TypeDefinition = "typeDefinition",
                ProjectInfo = "projectInfo",
                ReloadProjects = "reloadProjects",
                Unknown = "unknown",
                OpenExternalProject = "openExternalProject",
                OpenExternalProjects = "openExternalProjects",
                CloseExternalProject = "closeExternalProject",
                UpdateOpen = "updateOpen",
                GetOutliningSpans = "getOutliningSpans",
                TodoComments = "todoComments",
                Indentation = "indentation",
                DocCommentTemplate = "docCommentTemplate",
                CompilerOptionsForInferredProjects = "compilerOptionsForInferredProjects",
                GetCodeFixes = "getCodeFixes",
                GetCombinedCodeFix = "getCombinedCodeFix",
                ApplyCodeActionCommand = "applyCodeActionCommand",
                GetSupportedCodeFixes = "getSupportedCodeFixes",
                GetApplicableRefactors = "getApplicableRefactors",
                GetEditsForRefactor = "getEditsForRefactor",
                OrganizeImports = "organizeImports",
                GetEditsForFileRename = "getEditsForFileRename",
                ConfigurePlugin = "configurePlugin",
                SelectionRange = "selectionRange",
                ToggleLineComment = "toggleLineComment",
                ToggleMultilineComment = "toggleMultilineComment",
                CommentSelection = "commentSelection",
                UncommentSelection = "uncommentSelection",
                PrepareCallHierarchy = "prepareCallHierarchy",
                ProvideCallHierarchyIncomingCalls = "provideCallHierarchyIncomingCalls",
                ProvideCallHierarchyOutgoingCalls = "provideCallHierarchyOutgoingCalls",
                ProvideInlayHints = "provideInlayHints"
            }
            /**
             * A TypeScript Server message
             */
            interface Message {
                /**
                 * Sequence number of the message
                 */
                seq: number;
                /**
                 * One of "request", "response", or "event"
                 */
                type: "request" | "response" | "event";
            }
            /**
             * Client-initiated request message
             */
            interface Request extends Message {
                type: "request";
                /**
                 * The command to execute
                 */
                command: string;
                /**
                 * Object containing arguments for the command
                 */
                arguments?: any;
            }
            /**
             * Request to reload the project structure for all the opened files
             */
            interface ReloadProjectsRequest extends Message {
                command: CommandTypes.ReloadProjects;
            }
            /**
             * Server-initiated event message
             */
            interface Event extends Message {
                type: "event";
                /**
                 * Name of event
                 */
                event: string;
                /**
                 * Event-specific information
                 */
                body?: any;
            }
            /**
             * Response by server to client request message.
             */
            interface Response extends Message {
                type: "response";
                /**
                 * Sequence number of the request message.
                 */
                request_seq: number;
                /**
                 * Outcome of the request.
                 */
                success: boolean;
                /**
                 * The command requested.
                 */
                command: string;
                /**
                 * If success === false, this should always be provided.
                 * Otherwise, may (or may not) contain a success message.
                 */
                message?: string;
                /**
                 * Contains message body if success === true.
                 */
                body?: any;
                /**
                 * Contains extra information that plugin can include to be passed on
                 */
                metadata?: unknown;
                /**
                 * Exposes information about the performance of this request-response pair.
                 */
                performanceData?: PerformanceData;
            }
            interface PerformanceData {
                /**
                 * Time spent updating the program graph, in milliseconds.
                 */
                updateGraphDurationMs?: number;
                /**
                 * The time spent creating or updating the auto-import program, in milliseconds.
                 */
                createAutoImportProviderProgramDurationMs?: number;
            }
            /**
             * Arguments for FileRequest messages.
             */
            interface FileRequestArgs {
                /**
                 * The file for the request (absolute pathname required).
                 */
                file: string;
                projectFileName?: string;
            }
            interface StatusRequest extends Request {
                command: CommandTypes.Status;
            }
            interface StatusResponseBody {
                /**
                 * The TypeScript version (`ts.version`).
                 */
                version: string;
            }
            /**
             * Response to StatusRequest
             */
            interface StatusResponse extends Response {
                body: StatusResponseBody;
            }
            /**
             * Requests a JS Doc comment template for a given position
             */
            interface DocCommentTemplateRequest extends FileLocationRequest {
                command: CommandTypes.DocCommentTemplate;
            }
            /**
             * Response to DocCommentTemplateRequest
             */
            interface DocCommandTemplateResponse extends Response {
                body?: TextInsertion;
            }
            /**
             * A request to get TODO comments from the file
             */
            interface TodoCommentRequest extends FileRequest {
                command: CommandTypes.TodoComments;
                arguments: TodoCommentRequestArgs;
            }
            /**
             * Arguments for TodoCommentRequest request.
             */
            interface TodoCommentRequestArgs extends FileRequestArgs {
                /**
                 * Array of target TodoCommentDescriptors that describes TODO comments to be found
                 */
                descriptors: TodoCommentDescriptor[];
            }
            /**
             * Response for TodoCommentRequest request.
             */
            interface TodoCommentsResponse extends Response {
                body?: TodoComment[];
            }
            /**
             * A request to determine if the caret is inside a comment.
             */
            interface SpanOfEnclosingCommentRequest extends FileLocationRequest {
                command: CommandTypes.GetSpanOfEnclosingComment;
                arguments: SpanOfEnclosingCommentRequestArgs;
            }
            interface SpanOfEnclosingCommentRequestArgs extends FileLocationRequestArgs {
                /**
                 * Requires that the enclosing span be a multi-line comment, or else the request returns undefined.
                 */
                onlyMultiLine: boolean;
            }
            /**
             * Request to obtain outlining spans in file.
             */
            interface OutliningSpansRequest extends FileRequest {
                command: CommandTypes.GetOutliningSpans;
            }
            interface OutliningSpan {
                /** The span of the document to actually collapse. */
                textSpan: TextSpan;
                /** The span of the document to display when the user hovers over the collapsed span. */
                hintSpan: TextSpan;
                /** The text to display in the editor for the collapsed region. */
                bannerText: string;
                /**
                 * Whether or not this region should be automatically collapsed when
                 * the 'Collapse to Definitions' command is invoked.
                 */
                autoCollapse: boolean;
                /**
                 * Classification of the contents of the span
                 */
                kind: OutliningSpanKind;
            }
            /**
             * Response to OutliningSpansRequest request.
             */
            interface OutliningSpansResponse extends Response {
                body?: OutliningSpan[];
            }
            /**
             * A request to get indentation for a location in file
             */
            interface IndentationRequest extends FileLocationRequest {
                command: CommandTypes.Indentation;
                arguments: IndentationRequestArgs;
            }
            /**
             * Response for IndentationRequest request.
             */
            interface IndentationResponse extends Response {
                body?: IndentationResult;
            }
            /**
             * Indentation result representing where indentation should be placed
             */
            interface IndentationResult {
                /**
                 * The base position in the document that the indent should be relative to
                 */
                position: number;
                /**
                 * The number of columns the indent should be at relative to the position's column.
                 */
                indentation: number;
            }
            /**
             * Arguments for IndentationRequest request.
             */
            interface IndentationRequestArgs extends FileLocationRequestArgs {
                /**
                 * An optional set of settings to be used when computing indentation.
                 * If argument is omitted - then it will use settings for file that were previously set via 'configure' request or global settings.
                 */
                options?: EditorSettings;
            }
            /**
             * Arguments for ProjectInfoRequest request.
             */
            interface ProjectInfoRequestArgs extends FileRequestArgs {
                /**
                 * Indicate if the file name list of the project is needed
                 */
                needFileNameList: boolean;
            }
            /**
             * A request to get the project information of the current file.
             */
            interface ProjectInfoRequest extends Request {
                command: CommandTypes.ProjectInfo;
                arguments: ProjectInfoRequestArgs;
            }
            /**
             * A request to retrieve compiler options diagnostics for a project
             */
            interface CompilerOptionsDiagnosticsRequest extends Request {
                arguments: CompilerOptionsDiagnosticsRequestArgs;
            }
            /**
             * Arguments for CompilerOptionsDiagnosticsRequest request.
             */
            interface CompilerOptionsDiagnosticsRequestArgs {
                /**
                 * Name of the project to retrieve compiler options diagnostics.
                 */
                projectFileName: string;
            }
            /**
             * Response message body for "projectInfo" request
             */
            interface ProjectInfo {
                /**
                 * For configured project, this is the normalized path of the 'tsconfig.json' file
                 * For inferred project, this is undefined
                 */
                configFileName: string;
                /**
                 * The list of normalized file name in the project, including 'lib.d.ts'
                 */
                fileNames?: string[];
                /**
                 * Indicates if the project has a active language service instance
                 */
                languageServiceDisabled?: boolean;
            }
            /**
             * Represents diagnostic info that includes location of diagnostic in two forms
             * - start position and length of the error span
             * - startLocation and endLocation - a pair of Location objects that store start/end line and offset of the error span.
             */
            interface DiagnosticWithLinePosition {
                message: string;
                start: number;
                length: number;
                startLocation: Location;
                endLocation: Location;
                category: string;
                code: number;
                /** May store more in future. For now, this will simply be `true` to indicate when a diagnostic is an unused-identifier diagnostic. */
                reportsUnnecessary?: {};
                reportsDeprecated?: {};
                relatedInformation?: DiagnosticRelatedInformation[];
            }
            /**
             * Response message for "projectInfo" request
             */
            interface ProjectInfoResponse extends Response {
                body?: ProjectInfo;
            }
            /**
             * Request whose sole parameter is a file name.
             */
            interface FileRequest extends Request {
                arguments: FileRequestArgs;
            }
            /**
             * Instances of this interface specify a location in a source file:
             * (file, line, character offset), where line and character offset are 1-based.
             */
            interface FileLocationRequestArgs extends FileRequestArgs {
                /**
                 * The line number for the request (1-based).
                 */
                line: number;
                /**
                 * The character offset (on the line) for the request (1-based).
                 */
                offset: number;
            }
            type FileLocationOrRangeRequestArgs = FileLocationRequestArgs | FileRangeRequestArgs;
            /**
             * Request refactorings at a given position or selection area.
             */
            interface GetApplicableRefactorsRequest extends Request {
                command: CommandTypes.GetApplicableRefactors;
                arguments: GetApplicableRefactorsRequestArgs;
            }
            type GetApplicableRefactorsRequestArgs = FileLocationOrRangeRequestArgs & {
                triggerReason?: RefactorTriggerReason;
                kind?: string;
            };
            type RefactorTriggerReason = "implicit" | "invoked";
            /**
             * Response is a list of available refactorings.
             * Each refactoring exposes one or more "Actions"; a user selects one action to invoke a refactoring
             */
            interface GetApplicableRefactorsResponse extends Response {
                body?: ApplicableRefactorInfo[];
            }
            /**
             * A set of one or more available refactoring actions, grouped under a parent refactoring.
             */
            interface ApplicableRefactorInfo {
                /**
                 * The programmatic name of the refactoring
                 */
                name: string;
                /**
                 * A description of this refactoring category to show to the user.
                 * If the refactoring gets inlined (see below), this text will not be visible.
                 */
                description: string;
                /**
                 * Inlineable refactorings can have their actions hoisted out to the top level
                 * of a context menu. Non-inlineanable refactorings should always be shown inside
                 * their parent grouping.
                 *
                 * If not specified, this value is assumed to be 'true'
                 */
                inlineable?: boolean;
                actions: RefactorActionInfo[];
            }
            /**
             * Represents a single refactoring action - for example, the "Extract Method..." refactor might
             * offer several actions, each corresponding to a surround class or closure to extract into.
             */
            interface RefactorActionInfo {
                /**
                 * The programmatic name of the refactoring action
                 */
                name: string;
                /**
                 * A description of this refactoring action to show to the user.
                 * If the parent refactoring is inlined away, this will be the only text shown,
                 * so this description should make sense by itself if the parent is inlineable=true
                 */
                description: string;
                /**
                 * A message to show to the user if the refactoring cannot be applied in
                 * the current context.
                 */
                notApplicableReason?: string;
                /**
                 * The hierarchical dotted name of the refactor action.
                 */
                kind?: string;
            }
            interface GetEditsForRefactorRequest extends Request {
                command: CommandTypes.GetEditsForRefactor;
                arguments: GetEditsForRefactorRequestArgs;
            }
            /**
             * Request the edits that a particular refactoring action produces.
             * Callers must specify the name of the refactor and the name of the action.
             */
            type GetEditsForRefactorRequestArgs = FileLocationOrRangeRequestArgs & {
                refactor: string;
                action: string;
            };
            interface GetEditsForRefactorResponse extends Response {
                body?: RefactorEditInfo;
            }
            interface RefactorEditInfo {
                edits: FileCodeEdits[];
                /**
                 * An optional location where the editor should start a rename operation once
                 * the refactoring edits have been applied
                 */
                renameLocation?: Location;
                renameFilename?: string;
            }
            /**
             * Organize imports by:
             *   1) Removing unused imports
             *   2) Coalescing imports from the same module
             *   3) Sorting imports
             */
            interface OrganizeImportsRequest extends Request {
                command: CommandTypes.OrganizeImports;
                arguments: OrganizeImportsRequestArgs;
            }
            type OrganizeImportsScope = GetCombinedCodeFixScope;
            enum OrganizeImportsMode {
                All = "All",
                SortAndCombine = "SortAndCombine",
                RemoveUnused = "RemoveUnused"
            }
            interface OrganizeImportsRequestArgs {
                scope: OrganizeImportsScope;
                /** @deprecated Use `mode` instead */
                skipDestructiveCodeActions?: boolean;
                mode?: OrganizeImportsMode;
            }
            interface OrganizeImportsResponse extends Response {
                body: readonly FileCodeEdits[];
            }
            interface GetEditsForFileRenameRequest extends Request {
                command: CommandTypes.GetEditsForFileRename;
                arguments: GetEditsForFileRenameRequestArgs;
            }
            /** Note: Paths may also be directories. */
            interface GetEditsForFileRenameRequestArgs {
                readonly oldFilePath: string;
                readonly newFilePath: string;
            }
            interface GetEditsForFileRenameResponse extends Response {
                body: readonly FileCodeEdits[];
            }
            /**
             * Request for the available codefixes at a specific position.
             */
            interface CodeFixRequest extends Request {
                command: CommandTypes.GetCodeFixes;
                arguments: CodeFixRequestArgs;
            }
            interface GetCombinedCodeFixRequest extends Request {
                command: CommandTypes.GetCombinedCodeFix;
                arguments: GetCombinedCodeFixRequestArgs;
            }
            interface GetCombinedCodeFixResponse extends Response {
                body: CombinedCodeActions;
            }
            interface ApplyCodeActionCommandRequest extends Request {
                command: CommandTypes.ApplyCodeActionCommand;
                arguments: ApplyCodeActionCommandRequestArgs;
            }
            interface ApplyCodeActionCommandResponse extends Response {
            }
            interface FileRangeRequestArgs extends FileRequestArgs {
                /**
                 * The line number for the request (1-based).
                 */
                startLine: number;
                /**
                 * The character offset (on the line) for the request (1-based).
                 */
                startOffset: number;
                /**
                 * The line number for the request (1-based).
                 */
                endLine: number;
                /**
                 * The character offset (on the line) for the request (1-based).
                 */
                endOffset: number;
            }
            /**
             * Instances of this interface specify errorcodes on a specific location in a sourcefile.
             */
            interface CodeFixRequestArgs extends FileRangeRequestArgs {
                /**
                 * Errorcodes we want to get the fixes for.
                 */
                errorCodes: readonly number[];
            }
            interface GetCombinedCodeFixRequestArgs {
                scope: GetCombinedCodeFixScope;
                fixId: {};
            }
            interface GetCombinedCodeFixScope {
                type: "file";
                args: FileRequestArgs;
            }
            interface ApplyCodeActionCommandRequestArgs {
                /** May also be an array of commands. */
                command: {};
            }
            /**
             * Response for GetCodeFixes request.
             */
            interface GetCodeFixesResponse extends Response {
                body?: CodeAction[];
            }
            /**
             * A request whose arguments specify a file location (file, line, col).
             */
            interface FileLocationRequest extends FileRequest {
                arguments: FileLocationRequestArgs;
            }
            /**
             * A request to get codes of supported code fixes.
             */
            interface GetSupportedCodeFixesRequest extends Request {
                command: CommandTypes.GetSupportedCodeFixes;
            }
            /**
             * A response for GetSupportedCodeFixesRequest request.
             */
            interface GetSupportedCodeFixesResponse extends Response {
                /**
                 * List of error codes supported by the server.
                 */
                body?: string[];
            }
            /**
             * A request to get encoded semantic classifications for a span in the file
             */
            interface EncodedSemanticClassificationsRequest extends FileRequest {
                arguments: EncodedSemanticClassificationsRequestArgs;
            }
            /**
             * Arguments for EncodedSemanticClassificationsRequest request.
             */
            interface EncodedSemanticClassificationsRequestArgs extends FileRequestArgs {
                /**
                 * Start position of the span.
                 */
                start: number;
                /**
                 * Length of the span.
                 */
                length: number;
                /**
                 * Optional parameter for the semantic highlighting response, if absent it
                 * defaults to "original".
                 */
                format?: "original" | "2020";
            }
            /** The response for a EncodedSemanticClassificationsRequest */
            interface EncodedSemanticClassificationsResponse extends Response {
                body?: EncodedSemanticClassificationsResponseBody;
            }
            /**
             * Implementation response message. Gives series of text spans depending on the format ar.
             */
            interface EncodedSemanticClassificationsResponseBody {
                endOfLineState: EndOfLineState;
                spans: number[];
            }
            /**
             * Arguments in document highlight request; include: filesToSearch, file,
             * line, offset.
             */
            interface DocumentHighlightsRequestArgs extends FileLocationRequestArgs {
                /**
                 * List of files to search for document highlights.
                 */
                filesToSearch: string[];
            }
            /**
             * Go to definition request; value of command field is
             * "definition". Return response giving the file locations that
             * define the symbol found in file at location line, col.
             */
            interface DefinitionRequest extends FileLocationRequest {
                command: CommandTypes.Definition;
            }
            interface DefinitionAndBoundSpanRequest extends FileLocationRequest {
                readonly command: CommandTypes.DefinitionAndBoundSpan;
            }
            interface FindSourceDefinitionRequest extends FileLocationRequest {
                readonly command: CommandTypes.FindSourceDefinition;
            }
            interface DefinitionAndBoundSpanResponse extends Response {
                readonly body: DefinitionInfoAndBoundSpan;
            }
            /**
             * Go to type request; value of command field is
             * "typeDefinition". Return response giving the file locations that
             * define the type for the symbol found in file at location line, col.
             */
            interface TypeDefinitionRequest extends FileLocationRequest {
                command: CommandTypes.TypeDefinition;
            }
            /**
             * Go to implementation request; value of command field is
             * "implementation". Return response giving the file locations that
             * implement the symbol found in file at location line, col.
             */
            interface ImplementationRequest extends FileLocationRequest {
                command: CommandTypes.Implementation;
            }
            /**
             * Location in source code expressed as (one-based) line and (one-based) column offset.
             */
            interface Location {
                line: number;
                offset: number;
            }
            /**
             * Object found in response messages defining a span of text in source code.
             */
            interface TextSpan {
                /**
                 * First character of the definition.
                 */
                start: Location;
                /**
                 * One character past last character of the definition.
                 */
                end: Location;
            }
            /**
             * Object found in response messages defining a span of text in a specific source file.
             */
            interface FileSpan extends TextSpan {
                /**
                 * File containing text span.
                 */
                file: string;
            }
            interface JSDocTagInfo {
                /** Name of the JSDoc tag */
                name: string;
                /**
                 * Comment text after the JSDoc tag -- the text after the tag name until the next tag or end of comment
                 * Display parts when UserPreferences.displayPartsForJSDoc is true, flattened to string otherwise.
                 */
                text?: string | SymbolDisplayPart[];
            }
            interface TextSpanWithContext extends TextSpan {
                contextStart?: Location;
                contextEnd?: Location;
            }
            interface FileSpanWithContext extends FileSpan, TextSpanWithContext {
            }
            interface DefinitionInfo extends FileSpanWithContext {
                /**
                 * When true, the file may or may not exist.
                 */
                unverified?: boolean;
            }
            interface DefinitionInfoAndBoundSpan {
                definitions: readonly DefinitionInfo[];
                textSpan: TextSpan;
            }
            /**
             * Definition response message.  Gives text range for definition.
             */
            interface DefinitionResponse extends Response {
                body?: DefinitionInfo[];
            }
            interface DefinitionInfoAndBoundSpanResponse extends Response {
                body?: DefinitionInfoAndBoundSpan;
            }
            /** @deprecated Use `DefinitionInfoAndBoundSpanResponse` instead. */
            type DefinitionInfoAndBoundSpanReponse = DefinitionInfoAndBoundSpanResponse;
            /**
             * Definition response message.  Gives text range for definition.
             */
            interface TypeDefinitionResponse extends Response {
                body?: FileSpanWithContext[];
            }
            /**
             * Implementation response message.  Gives text range for implementations.
             */
            interface ImplementationResponse extends Response {
                body?: FileSpanWithContext[];
            }
            /**
             * Request to get brace completion for a location in the file.
             */
            interface BraceCompletionRequest extends FileLocationRequest {
                command: CommandTypes.BraceCompletion;
                arguments: BraceCompletionRequestArgs;
            }
            /**
             * Argument for BraceCompletionRequest request.
             */
            interface BraceCompletionRequestArgs extends FileLocationRequestArgs {
                /**
                 * Kind of opening brace
                 */
                openingBrace: string;
            }
            interface JsxClosingTagRequest extends FileLocationRequest {
                readonly command: CommandTypes.JsxClosingTag;
                readonly arguments: JsxClosingTagRequestArgs;
            }
            interface JsxClosingTagRequestArgs extends FileLocationRequestArgs {
            }
            interface JsxClosingTagResponse extends Response {
                readonly body: TextInsertion;
            }
            /**
             * @deprecated
             * Get occurrences request; value of command field is
             * "occurrences". Return response giving spans that are relevant
             * in the file at a given line and column.
             */
            interface OccurrencesRequest extends FileLocationRequest {
                command: CommandTypes.Occurrences;
            }
            /** @deprecated */
            interface OccurrencesResponseItem extends FileSpanWithContext {
                /**
                 * True if the occurrence is a write location, false otherwise.
                 */
                isWriteAccess: boolean;
                /**
                 * True if the occurrence is in a string, undefined otherwise;
                 */
                isInString?: true;
            }
            /** @deprecated */
            interface OccurrencesResponse extends Response {
                body?: OccurrencesResponseItem[];
            }
            /**
             * Get document highlights request; value of command field is
             * "documentHighlights". Return response giving spans that are relevant
             * in the file at a given line and column.
             */
            interface DocumentHighlightsRequest extends FileLocationRequest {
                command: CommandTypes.DocumentHighlights;
                arguments: DocumentHighlightsRequestArgs;
            }
            /**
             * Span augmented with extra information that denotes the kind of the highlighting to be used for span.
             */
            interface HighlightSpan extends TextSpanWithContext {
                kind: HighlightSpanKind;
            }
            /**
             * Represents a set of highligh spans for a give name
             */
            interface DocumentHighlightsItem {
                /**
                 * File containing highlight spans.
                 */
                file: string;
                /**
                 * Spans to highlight in file.
                 */
                highlightSpans: HighlightSpan[];
            }
            /**
             * Response for a DocumentHighlightsRequest request.
             */
            interface DocumentHighlightsResponse extends Response {
                body?: DocumentHighlightsItem[];
            }
            /**
             * Find references request; value of command field is
             * "references". Return response giving the file locations that
             * reference the symbol found in file at location line, col.
             */
            interface ReferencesRequest extends FileLocationRequest {
                command: CommandTypes.References;
            }
            interface ReferencesResponseItem extends FileSpanWithContext {
                /**
                 * Text of line containing the reference. Including this
                 * with the response avoids latency of editor loading files
                 * to show text of reference line (the server already has loaded the referencing files).
                 *
                 * If {@link UserPreferences.disableLineTextInReferences} is enabled, the property won't be filled
                 */
                lineText?: string;
                /**
                 * True if reference is a write location, false otherwise.
                 */
                isWriteAccess: boolean;
                /**
                 * Present only if the search was triggered from a declaration.
                 * True indicates that the references refers to the same symbol
                 * (i.e. has the same meaning) as the declaration that began the
                 * search.
                 */
                isDefinition?: boolean;
            }
            /**
             * The body of a "references" response message.
             */
            interface ReferencesResponseBody {
                /**
                 * The file locations referencing the symbol.
                 */
                refs: readonly ReferencesResponseItem[];
                /**
                 * The name of the symbol.
                 */
                symbolName: string;
                /**
                 * The start character offset of the symbol (on the line provided by the references request).
                 */
                symbolStartOffset: number;
                /**
                 * The full display name of the symbol.
                 */
                symbolDisplayString: string;
            }
            /**
             * Response to "references" request.
             */
            interface ReferencesResponse extends Response {
                body?: ReferencesResponseBody;
            }
            interface FileReferencesRequest extends FileRequest {
                command: CommandTypes.FileReferences;
            }
            interface FileReferencesResponseBody {
                /**
                 * The file locations referencing the symbol.
                 */
                refs: readonly ReferencesResponseItem[];
                /**
                 * The name of the symbol.
                 */
                symbolName: string;
            }
            interface FileReferencesResponse extends Response {
                body?: FileReferencesResponseBody;
            }
            /**
             * Argument for RenameRequest request.
             */
            interface RenameRequestArgs extends FileLocationRequestArgs {
                /**
                 * Should text at specified location be found/changed in comments?
                 */
                findInComments?: boolean;
                /**
                 * Should text at specified location be found/changed in strings?
                 */
                findInStrings?: boolean;
            }
            /**
             * Rename request; value of command field is "rename". Return
             * response giving the file locations that reference the symbol
             * found in file at location line, col. Also return full display
             * name of the symbol so that client can print it unambiguously.
             */
            interface RenameRequest extends FileLocationRequest {
                command: CommandTypes.Rename;
                arguments: RenameRequestArgs;
            }
            /**
             * Information about the item to be renamed.
             */
            type RenameInfo = RenameInfoSuccess | RenameInfoFailure;
            interface RenameInfoSuccess {
                /**
                 * True if item can be renamed.
                 */
                canRename: true;
                /**
                 * File or directory to rename.
                 * If set, `getEditsForFileRename` should be called instead of `findRenameLocations`.
                 */
                fileToRename?: string;
                /**
                 * Display name of the item to be renamed.
                 */
                displayName: string;
                /**
                 * Full display name of item to be renamed.
                 */
                fullDisplayName: string;
                /**
                 * The items's kind (such as 'className' or 'parameterName' or plain 'text').
                 */
                kind: ScriptElementKind;
                /**
                 * Optional modifiers for the kind (such as 'public').
                 */
                kindModifiers: string;
                /** Span of text to rename. */
                triggerSpan: TextSpan;
            }
            interface RenameInfoFailure {
                canRename: false;
                /**
                 * Error message if item can not be renamed.
                 */
                localizedErrorMessage: string;
            }
            /**
             *  A group of text spans, all in 'file'.
             */
            interface SpanGroup {
                /** The file to which the spans apply */
                file: string;
                /** The text spans in this group */
                locs: RenameTextSpan[];
            }
            interface RenameTextSpan extends TextSpanWithContext {
                readonly prefixText?: string;
                readonly suffixText?: string;
            }
            interface RenameResponseBody {
                /**
                 * Information about the item to be renamed.
                 */
                info: RenameInfo;
                /**
                 * An array of span groups (one per file) that refer to the item to be renamed.
                 */
                locs: readonly SpanGroup[];
            }
            /**
             * Rename response message.
             */
            interface RenameResponse extends Response {
                body?: RenameResponseBody;
            }
            /**
             * Represents a file in external project.
             * External project is project whose set of files, compilation options and open\close state
             * is maintained by the client (i.e. if all this data come from .csproj file in Visual Studio).
             * External project will exist even if all files in it are closed and should be closed explicitly.
             * If external project includes one or more tsconfig.json/jsconfig.json files then tsserver will
             * create configured project for every config file but will maintain a link that these projects were created
             * as a result of opening external project so they should be removed once external project is closed.
             */
            interface ExternalFile {
                /**
                 * Name of file file
                 */
                fileName: string;
                /**
                 * Script kind of the file
                 */
                scriptKind?: ScriptKindName | ScriptKind;
                /**
                 * Whether file has mixed content (i.e. .cshtml file that combines html markup with C#/JavaScript)
                 */
                hasMixedContent?: boolean;
                /**
                 * Content of the file
                 */
                content?: string;
            }
            /**
             * Represent an external project
             */
            interface ExternalProject {
                /**
                 * Project name
                 */
                projectFileName: string;
                /**
                 * List of root files in project
                 */
                rootFiles: ExternalFile[];
                /**
                 * Compiler options for the project
                 */
                options: ExternalProjectCompilerOptions;
                /**
                 * @deprecated typingOptions. Use typeAcquisition instead
                 */
                typingOptions?: TypeAcquisition;
                /**
                 * Explicitly specified type acquisition for the project
                 */
                typeAcquisition?: TypeAcquisition;
            }
            interface CompileOnSaveMixin {
                /**
                 * If compile on save is enabled for the project
                 */
                compileOnSave?: boolean;
            }
            /**
             * For external projects, some of the project settings are sent together with
             * compiler settings.
             */
            type ExternalProjectCompilerOptions = CompilerOptions & CompileOnSaveMixin & WatchOptions;
            interface FileWithProjectReferenceRedirectInfo {
                /**
                 * Name of file
                 */
                fileName: string;
                /**
                 * True if the file is primarily included in a referenced project
                 */
                isSourceOfProjectReferenceRedirect: boolean;
            }
            /**
             * Represents a set of changes that happen in project
             */
            interface ProjectChanges {
                /**
                 * List of added files
                 */
                added: string[] | FileWithProjectReferenceRedirectInfo[];
                /**
                 * List of removed files
                 */
                removed: string[] | FileWithProjectReferenceRedirectInfo[];
                /**
                 * List of updated files
                 */
                updated: string[] | FileWithProjectReferenceRedirectInfo[];
                /**
                 * List of files that have had their project reference redirect status updated
                 * Only provided when the synchronizeProjectList request has includeProjectReferenceRedirectInfo set to true
                 */
                updatedRedirects?: FileWithProjectReferenceRedirectInfo[];
            }
            /**
             * Information found in a configure request.
             */
            interface ConfigureRequestArguments {
                /**
                 * Information about the host, for example 'Emacs 24.4' or
                 * 'Sublime Text version 3075'
                 */
                hostInfo?: string;
                /**
                 * If present, tab settings apply only to this file.
                 */
                file?: string;
                /**
                 * The format options to use during formatting and other code editing features.
                 */
                formatOptions?: FormatCodeSettings;
                preferences?: UserPreferences;
                /**
                 * The host's additional supported .js file extensions
                 */
                extraFileExtensions?: FileExtensionInfo[];
                watchOptions?: WatchOptions;
            }
            enum WatchFileKind {
                FixedPollingInterval = "FixedPollingInterval",
                PriorityPollingInterval = "PriorityPollingInterval",
                DynamicPriorityPolling = "DynamicPriorityPolling",
                FixedChunkSizePolling = "FixedChunkSizePolling",
                UseFsEvents = "UseFsEvents",
                UseFsEventsOnParentDirectory = "UseFsEventsOnParentDirectory"
            }
            enum WatchDirectoryKind {
                UseFsEvents = "UseFsEvents",
                FixedPollingInterval = "FixedPollingInterval",
                DynamicPriorityPolling = "DynamicPriorityPolling",
                FixedChunkSizePolling = "FixedChunkSizePolling"
            }
            enum PollingWatchKind {
                FixedInterval = "FixedInterval",
                PriorityInterval = "PriorityInterval",
                DynamicPriority = "DynamicPriority",
                FixedChunkSize = "FixedChunkSize"
            }
            interface WatchOptions {
                watchFile?: WatchFileKind | ts.WatchFileKind;
                watchDirectory?: WatchDirectoryKind | ts.WatchDirectoryKind;
                fallbackPolling?: PollingWatchKind | ts.PollingWatchKind;
                synchronousWatchDirectory?: boolean;
                excludeDirectories?: string[];
                excludeFiles?: string[];
                [option: string]: CompilerOptionsValue | undefined;
            }
            /**
             *  Configure request; value of command field is "configure".  Specifies
             *  host information, such as host type, tab size, and indent size.
             */
            interface ConfigureRequest extends Request {
                command: CommandTypes.Configure;
                arguments: ConfigureRequestArguments;
            }
            /**
             * Response to "configure" request.  This is just an acknowledgement, so
             * no body field is required.
             */
            interface ConfigureResponse extends Response {
            }
            interface ConfigurePluginRequestArguments {
                pluginName: string;
                configuration: any;
            }
            interface ConfigurePluginRequest extends Request {
                command: CommandTypes.ConfigurePlugin;
                arguments: ConfigurePluginRequestArguments;
            }
            interface ConfigurePluginResponse extends Response {
            }
            interface SelectionRangeRequest extends FileRequest {
                command: CommandTypes.SelectionRange;
                arguments: SelectionRangeRequestArgs;
            }
            interface SelectionRangeRequestArgs extends FileRequestArgs {
                locations: Location[];
            }
            interface SelectionRangeResponse extends Response {
                body?: SelectionRange[];
            }
            interface SelectionRange {
                textSpan: TextSpan;
                parent?: SelectionRange;
            }
            interface ToggleLineCommentRequest extends FileRequest {
                command: CommandTypes.ToggleLineComment;
                arguments: FileRangeRequestArgs;
            }
            interface ToggleMultilineCommentRequest extends FileRequest {
                command: CommandTypes.ToggleMultilineComment;
                arguments: FileRangeRequestArgs;
            }
            interface CommentSelectionRequest extends FileRequest {
                command: CommandTypes.CommentSelection;
                arguments: FileRangeRequestArgs;
            }
            interface UncommentSelectionRequest extends FileRequest {
                command: CommandTypes.UncommentSelection;
                arguments: FileRangeRequestArgs;
            }
            /**
             *  Information found in an "open" request.
             */
            interface OpenRequestArgs extends FileRequestArgs {
                /**
                 * Used when a version of the file content is known to be more up to date than the one on disk.
                 * Then the known content will be used upon opening instead of the disk copy
                 */
                fileContent?: string;
                /**
                 * Used to specify the script kind of the file explicitly. It could be one of the following:
                 *      "TS", "JS", "TSX", "JSX"
                 */
                scriptKindName?: ScriptKindName;
                /**
                 * Used to limit the searching for project config file. If given the searching will stop at this
                 * root path; otherwise it will go all the way up to the dist root path.
                 */
                projectRootPath?: string;
            }
            type ScriptKindName = "TS" | "JS" | "TSX" | "JSX" | "ETS";
            /**
             * Open request; value of command field is "open". Notify the
             * server that the client has file open.  The server will not
             * monitor the filesystem for changes in this file and will assume
             * that the client is updating the server (using the change and/or
             * reload messages) when the file changes. Server does not currently
             * send a response to an open request.
             */
            interface OpenRequest extends Request {
                command: CommandTypes.Open;
                arguments: OpenRequestArgs;
            }
            /**
             * Request to open or update external project
             */
            interface OpenExternalProjectRequest extends Request {
                command: CommandTypes.OpenExternalProject;
                arguments: OpenExternalProjectArgs;
            }
            /**
             * Arguments to OpenExternalProjectRequest request
             */
            type OpenExternalProjectArgs = ExternalProject;
            /**
             * Request to open multiple external projects
             */
            interface OpenExternalProjectsRequest extends Request {
                command: CommandTypes.OpenExternalProjects;
                arguments: OpenExternalProjectsArgs;
            }
            /**
             * Arguments to OpenExternalProjectsRequest
             */
            interface OpenExternalProjectsArgs {
                /**
                 * List of external projects to open or update
                 */
                projects: ExternalProject[];
            }
            /**
             * Response to OpenExternalProjectRequest request. This is just an acknowledgement, so
             * no body field is required.
             */
            interface OpenExternalProjectResponse extends Response {
            }
            /**
             * Response to OpenExternalProjectsRequest request. This is just an acknowledgement, so
             * no body field is required.
             */
            interface OpenExternalProjectsResponse extends Response {
            }
            /**
             * Request to close external project.
             */
            interface CloseExternalProjectRequest extends Request {
                command: CommandTypes.CloseExternalProject;
                arguments: CloseExternalProjectRequestArgs;
            }
            /**
             * Arguments to CloseExternalProjectRequest request
             */
            interface CloseExternalProjectRequestArgs {
                /**
                 * Name of the project to close
                 */
                projectFileName: string;
            }
            /**
             * Response to CloseExternalProjectRequest request. This is just an acknowledgement, so
             * no body field is required.
             */
            interface CloseExternalProjectResponse extends Response {
            }
            /**
             * Request to synchronize list of open files with the client
             */
            interface UpdateOpenRequest extends Request {
                command: CommandTypes.UpdateOpen;
                arguments: UpdateOpenRequestArgs;
            }
            /**
             * Arguments to UpdateOpenRequest
             */
            interface UpdateOpenRequestArgs {
                /**
                 * List of newly open files
                 */
                openFiles?: OpenRequestArgs[];
                /**
                 * List of open files files that were changes
                 */
                changedFiles?: FileCodeEdits[];
                /**
                 * List of files that were closed
                 */
                closedFiles?: string[];
            }
            /**
             * External projects have a typeAcquisition option so they need to be added separately to compiler options for inferred projects.
             */
            type InferredProjectCompilerOptions = ExternalProjectCompilerOptions & TypeAcquisition;
            /**
             * Request to set compiler options for inferred projects.
             * External projects are opened / closed explicitly.
             * Configured projects are opened when user opens loose file that has 'tsconfig.json' or 'jsconfig.json' anywhere in one of containing folders.
             * This configuration file will be used to obtain a list of files and configuration settings for the project.
             * Inferred projects are created when user opens a loose file that is not the part of external project
             * or configured project and will contain only open file and transitive closure of referenced files if 'useOneInferredProject' is false,
             * or all open loose files and its transitive closure of referenced files if 'useOneInferredProject' is true.
             */
            interface SetCompilerOptionsForInferredProjectsRequest extends Request {
                command: CommandTypes.CompilerOptionsForInferredProjects;
                arguments: SetCompilerOptionsForInferredProjectsArgs;
            }
            /**
             * Argument for SetCompilerOptionsForInferredProjectsRequest request.
             */
            interface SetCompilerOptionsForInferredProjectsArgs {
                /**
                 * Compiler options to be used with inferred projects.
                 */
                options: InferredProjectCompilerOptions;
                /**
                 * Specifies the project root path used to scope compiler options.
                 * It is an error to provide this property if the server has not been started with
                 * `useInferredProjectPerProjectRoot` enabled.
                 */
                projectRootPath?: string;
            }
            /**
             * Response to SetCompilerOptionsForInferredProjectsResponse request. This is just an acknowledgement, so
             * no body field is required.
             */
            interface SetCompilerOptionsForInferredProjectsResponse extends Response {
            }
            /**
             *  Exit request; value of command field is "exit".  Ask the server process
             *  to exit.
             */
            interface ExitRequest extends Request {
                command: CommandTypes.Exit;
            }
            /**
             * Close request; value of command field is "close". Notify the
             * server that the client has closed a previously open file.  If
             * file is still referenced by open files, the server will resume
             * monitoring the filesystem for changes to file.  Server does not
             * currently send a response to a close request.
             */
            interface CloseRequest extends FileRequest {
                command: CommandTypes.Close;
            }
            /**
             * Request to obtain the list of files that should be regenerated if target file is recompiled.
             * NOTE: this us query-only operation and does not generate any output on disk.
             */
            interface CompileOnSaveAffectedFileListRequest extends FileRequest {
                command: CommandTypes.CompileOnSaveAffectedFileList;
            }
            /**
             * Contains a list of files that should be regenerated in a project
             */
            interface CompileOnSaveAffectedFileListSingleProject {
                /**
                 * Project name
                 */
                projectFileName: string;
                /**
                 * List of files names that should be recompiled
                 */
                fileNames: string[];
                /**
                 * true if project uses outFile or out compiler option
                 */
                projectUsesOutFile: boolean;
            }
            /**
             * Response for CompileOnSaveAffectedFileListRequest request;
             */
            interface CompileOnSaveAffectedFileListResponse extends Response {
                body: CompileOnSaveAffectedFileListSingleProject[];
            }
            /**
             * Request to recompile the file. All generated outputs (.js, .d.ts or .js.map files) is written on disk.
             */
            interface CompileOnSaveEmitFileRequest extends FileRequest {
                command: CommandTypes.CompileOnSaveEmitFile;
                arguments: CompileOnSaveEmitFileRequestArgs;
            }
            /**
             * Arguments for CompileOnSaveEmitFileRequest
             */
            interface CompileOnSaveEmitFileRequestArgs extends FileRequestArgs {
                /**
                 * if true - then file should be recompiled even if it does not have any changes.
                 */
                forced?: boolean;
                includeLinePosition?: boolean;
                /** if true - return response as object with emitSkipped and diagnostics */
                richResponse?: boolean;
            }
            interface CompileOnSaveEmitFileResponse extends Response {
                body: boolean | EmitResult;
            }
            interface EmitResult {
                emitSkipped: boolean;
                diagnostics: Diagnostic[] | DiagnosticWithLinePosition[];
            }
            /**
             * Quickinfo request; value of command field is
             * "quickinfo". Return response giving a quick type and
             * documentation string for the symbol found in file at location
             * line, col.
             */
            interface QuickInfoRequest extends FileLocationRequest {
                command: CommandTypes.Quickinfo;
                arguments: FileLocationRequestArgs;
            }
            /**
             * Body of QuickInfoResponse.
             */
            interface QuickInfoResponseBody {
                /**
                 * The symbol's kind (such as 'className' or 'parameterName' or plain 'text').
                 */
                kind: ScriptElementKind;
                /**
                 * Optional modifiers for the kind (such as 'public').
                 */
                kindModifiers: string;
                /**
                 * Starting file location of symbol.
                 */
                start: Location;
                /**
                 * One past last character of symbol.
                 */
                end: Location;
                /**
                 * Type and kind of symbol.
                 */
                displayString: string;
                /**
                 * Documentation associated with symbol.
                 * Display parts when UserPreferences.displayPartsForJSDoc is true, flattened to string otherwise.
                 */
                documentation: string | SymbolDisplayPart[];
                /**
                 * JSDoc tags associated with symbol.
                 */
                tags: JSDocTagInfo[];
            }
            /**
             * Quickinfo response message.
             */
            interface QuickInfoResponse extends Response {
                body?: QuickInfoResponseBody;
            }
            /**
             * Arguments for format messages.
             */
            interface FormatRequestArgs extends FileLocationRequestArgs {
                /**
                 * Last line of range for which to format text in file.
                 */
                endLine: number;
                /**
                 * Character offset on last line of range for which to format text in file.
                 */
                endOffset: number;
                /**
                 * Format options to be used.
                 */
                options?: FormatCodeSettings;
            }
            /**
             * Format request; value of command field is "format".  Return
             * response giving zero or more edit instructions.  The edit
             * instructions will be sorted in file order.  Applying the edit
             * instructions in reverse to file will result in correctly
             * reformatted text.
             */
            interface FormatRequest extends FileLocationRequest {
                command: CommandTypes.Format;
                arguments: FormatRequestArgs;
            }
            /**
             * Object found in response messages defining an editing
             * instruction for a span of text in source code.  The effect of
             * this instruction is to replace the text starting at start and
             * ending one character before end with newText. For an insertion,
             * the text span is empty.  For a deletion, newText is empty.
             */
            interface CodeEdit {
                /**
                 * First character of the text span to edit.
                 */
                start: Location;
                /**
                 * One character past last character of the text span to edit.
                 */
                end: Location;
                /**
                 * Replace the span defined above with this string (may be
                 * the empty string).
                 */
                newText: string;
            }
            interface FileCodeEdits {
                fileName: string;
                textChanges: CodeEdit[];
            }
            interface CodeFixResponse extends Response {
                /** The code actions that are available */
                body?: CodeFixAction[];
            }
            interface CodeAction {
                /** Description of the code action to display in the UI of the editor */
                description: string;
                /** Text changes to apply to each file as part of the code action */
                changes: FileCodeEdits[];
                /** A command is an opaque object that should be passed to `ApplyCodeActionCommandRequestArgs` without modification.  */
                commands?: {}[];
            }
            interface CombinedCodeActions {
                changes: readonly FileCodeEdits[];
                commands?: readonly {}[];
            }
            interface CodeFixAction extends CodeAction {
                /** Short name to identify the fix, for use by telemetry. */
                fixName: string;
                /**
                 * If present, one may call 'getCombinedCodeFix' with this fixId.
                 * This may be omitted to indicate that the code fix can't be applied in a group.
                 */
                fixId?: {};
                /** Should be present if and only if 'fixId' is. */
                fixAllDescription?: string;
            }
            /**
             * Format and format on key response message.
             */
            interface FormatResponse extends Response {
                body?: CodeEdit[];
            }
            /**
             * Arguments for format on key messages.
             */
            interface FormatOnKeyRequestArgs extends FileLocationRequestArgs {
                /**
                 * Key pressed (';', '\n', or '}').
                 */
                key: string;
                options?: FormatCodeSettings;
            }
            /**
             * Format on key request; value of command field is
             * "formatonkey". Given file location and key typed (as string),
             * return response giving zero or more edit instructions.  The
             * edit instructions will be sorted in file order.  Applying the
             * edit instructions in reverse to file will result in correctly
             * reformatted text.
             */
            interface FormatOnKeyRequest extends FileLocationRequest {
                command: CommandTypes.Formatonkey;
                arguments: FormatOnKeyRequestArgs;
            }
            type CompletionsTriggerCharacter = "." | '"' | "'" | "`" | "/" | "@" | "<" | "#" | " ";
            enum CompletionTriggerKind {
                /** Completion was triggered by typing an identifier, manual invocation (e.g Ctrl+Space) or via API. */
                Invoked = 1,
                /** Completion was triggered by a trigger character. */
                TriggerCharacter = 2,
                /** Completion was re-triggered as the current completion list is incomplete. */
                TriggerForIncompleteCompletions = 3
            }
            /**
             * Arguments for completions messages.
             */
            interface CompletionsRequestArgs extends FileLocationRequestArgs {
                /**
                 * Optional prefix to apply to possible completions.
                 */
                prefix?: string;
                /**
                 * Character that was responsible for triggering completion.
                 * Should be `undefined` if a user manually requested completion.
                 */
                triggerCharacter?: CompletionsTriggerCharacter;
                triggerKind?: CompletionTriggerKind;
                /**
                 * @deprecated Use UserPreferences.includeCompletionsForModuleExports
                 */
                includeExternalModuleExports?: boolean;
                /**
                 * @deprecated Use UserPreferences.includeCompletionsWithInsertText
                 */
                includeInsertTextCompletions?: boolean;
            }
            interface EtsOptions {
                render: {
                    method: string[];
                    decorator: string[];
                };
                components: string[];
                libs: string[];
                extend: {
                    decorator: string[];
                    components: {
                        name: string;
                        type: string;
                        instance: string;
                    }[];
                };
                styles: {
                    decorator: string;
                    component: {
                        name: string;
                        type: string;
                        instance: string;
                    };
                    property: string;
                };
                concurrent: {
                    decorator: string;
                };
                customComponent?: string;
                propertyDecorators: {
                    name: string;
                    needInitialization: boolean;
                }[];
                emitDecorators: {
                    name: string;
                    emitParameters: boolean;
                }[];
                syntaxComponents: {
                    paramsUICallback: string[];
                    attrUICallback: {
                        name: string;
                        attributes: string[];
                    }[];
                };
            }
            /**
             * Completions request; value of command field is "completions".
             * Given a file location (file, line, col) and a prefix (which may
             * be the empty string), return the possible completions that
             * begin with prefix.
             */
            interface CompletionsRequest extends FileLocationRequest {
                command: CommandTypes.Completions | CommandTypes.CompletionInfo;
                arguments: CompletionsRequestArgs;
            }
            /**
             * Arguments for completion details request.
             */
            interface CompletionDetailsRequestArgs extends FileLocationRequestArgs {
                /**
                 * Names of one or more entries for which to obtain details.
                 */
                entryNames: (string | CompletionEntryIdentifier)[];
            }
            interface CompletionEntryIdentifier {
                name: string;
                source?: string;
                data?: unknown;
            }
            /**
             * Completion entry details request; value of command field is
             * "completionEntryDetails".  Given a file location (file, line,
             * col) and an array of completion entry names return more
             * detailed information for each completion entry.
             */
            interface CompletionDetailsRequest extends FileLocationRequest {
                command: CommandTypes.CompletionDetails;
                arguments: CompletionDetailsRequestArgs;
            }
            /**
             * Part of a symbol description.
             */
            interface SymbolDisplayPart {
                /**
                 * Text of an item describing the symbol.
                 */
                text: string;
                /**
                 * The symbol's kind (such as 'className' or 'parameterName' or plain 'text').
                 */
                kind: string;
            }
            /** A part of a symbol description that links from a jsdoc @link tag to a declaration */
            interface JSDocLinkDisplayPart extends SymbolDisplayPart {
                /** The location of the declaration that the @link tag links to. */
                target: FileSpan;
            }
            /**
             * An item found in a completion response.
             */
            interface CompletionEntry {
                /**
                 * The symbol's name.
                 */
                name: string;
                /**
                 * The symbol's kind (such as 'className' or 'parameterName').
                 */
                kind: ScriptElementKind;
                /**
                 * Optional modifiers for the kind (such as 'public').
                 */
                kindModifiers?: string;
                /**
                 * A string that is used for comparing completion items so that they can be ordered.  This
                 * is often the same as the name but may be different in certain circumstances.
                 */
                sortText: string;
                /**
                 * Text to insert instead of `name`.
                 * This is used to support bracketed completions; If `name` might be "a-b" but `insertText` would be `["a-b"]`,
                 * coupled with `replacementSpan` to replace a dotted access with a bracket access.
                 */
                insertText?: string;
                /**
                 * `insertText` should be interpreted as a snippet if true.
                 */
                isSnippet?: true;
                /**
                 * An optional span that indicates the text to be replaced by this completion item.
                 * If present, this span should be used instead of the default one.
                 * It will be set if the required span differs from the one generated by the default replacement behavior.
                 */
                replacementSpan?: TextSpan;
                /**
                 * Indicates whether commiting this completion entry will require additional code actions to be
                 * made to avoid errors. The CompletionEntryDetails will have these actions.
                 */
                hasAction?: true;
                /**
                 * Identifier (not necessarily human-readable) identifying where this completion came from.
                 */
                source?: string;
                /**
                 * Human-readable description of the `source`.
                 */
                sourceDisplay?: SymbolDisplayPart[];
                /**
                 * Additional details for the label.
                 */
                labelDetails?: CompletionEntryLabelDetails;
                /**
                 * If true, this completion should be highlighted as recommended. There will only be one of these.
                 * This will be set when we know the user should write an expression with a certain type and that type is an enum or constructable class.
                 * Then either that enum/class or a namespace containing it will be the recommended symbol.
                 */
                isRecommended?: true;
                /**
                 * If true, this completion was generated from traversing the name table of an unchecked JS file,
                 * and therefore may not be accurate.
                 */
                isFromUncheckedFile?: true;
                /**
                 * If true, this completion was for an auto-import of a module not yet in the program, but listed
                 * in the project package.json. Used for telemetry reporting.
                 */
                isPackageJsonImport?: true;
                /**
                 * If true, this completion was an auto-import-style completion of an import statement (i.e., the
                 * module specifier was inserted along with the imported identifier). Used for telemetry reporting.
                 */
                isImportStatementCompletion?: true;
                /**
                 * A property to be sent back to TS Server in the CompletionDetailsRequest, along with `name`,
                 * that allows TS Server to look up the symbol represented by the completion item, disambiguating
                 * items with the same name.
                 */
                data?: unknown;
                /**
                 * Js Doc info with symbol.
                 */
                jsDoc?: JsDocTagInfo[];
                /**
                 * Displayparts info with symbol.
                 */
                displayParts?: SymbolDisplayPart[];
            }
            interface CompletionEntryLabelDetails {
                /**
                 * An optional string which is rendered less prominently directly after
                 * {@link CompletionEntry.name name}, without any spacing. Should be
                 * used for function signatures or type annotations.
                 */
                detail?: string;
                /**
                 * An optional string which is rendered less prominently after
                 * {@link CompletionEntryLabelDetails.detail}. Should be used for fully qualified
                 * names or file path.
                 */
                description?: string;
            }
            /**
             * Additional completion entry details, available on demand
             */
            interface CompletionEntryDetails {
                /**
                 * The symbol's name.
                 */
                name: string;
                /**
                 * The symbol's kind (such as 'className' or 'parameterName').
                 */
                kind: ScriptElementKind;
                /**
                 * Optional modifiers for the kind (such as 'public').
                 */
                kindModifiers: string;
                /**
                 * Display parts of the symbol (similar to quick info).
                 */
                displayParts: SymbolDisplayPart[];
                /**
                 * Documentation strings for the symbol.
                 */
                documentation?: SymbolDisplayPart[];
                /**
                 * JSDoc tags for the symbol.
                 */
                tags?: JSDocTagInfo[];
                /**
                 * The associated code actions for this entry
                 */
                codeActions?: CodeAction[];
                /**
                 * @deprecated Use `sourceDisplay` instead.
                 */
                source?: SymbolDisplayPart[];
                /**
                 * Human-readable description of the `source` from the CompletionEntry.
                 */
                sourceDisplay?: SymbolDisplayPart[];
            }
            /** @deprecated Prefer CompletionInfoResponse, which supports several top-level fields in addition to the array of entries. */
            interface CompletionsResponse extends Response {
                body?: CompletionEntry[];
            }
            interface CompletionInfoResponse extends Response {
                body?: CompletionInfo;
            }
            interface CompletionInfo {
                readonly flags?: number;
                readonly isGlobalCompletion: boolean;
                readonly isMemberCompletion: boolean;
                readonly isNewIdentifierLocation: boolean;
                /**
                 * In the absence of `CompletionEntry["replacementSpan"]`, the editor may choose whether to use
                 * this span or its default one. If `CompletionEntry["replacementSpan"]` is defined, that span
                 * must be used to commit that completion entry.
                 */
                readonly optionalReplacementSpan?: TextSpan;
                readonly isIncomplete?: boolean;
                readonly entries: readonly CompletionEntry[];
            }
            interface CompletionDetailsResponse extends Response {
                body?: CompletionEntryDetails[];
            }
            /**
             * Signature help information for a single parameter
             */
            interface SignatureHelpParameter {
                /**
                 * The parameter's name
                 */
                name: string;
                /**
                 * Documentation of the parameter.
                 */
                documentation: SymbolDisplayPart[];
                /**
                 * Display parts of the parameter.
                 */
                displayParts: SymbolDisplayPart[];
                /**
                 * Whether the parameter is optional or not.
                 */
                isOptional: boolean;
            }
            /**
             * Represents a single signature to show in signature help.
             */
            interface SignatureHelpItem {
                /**
                 * Whether the signature accepts a variable number of arguments.
                 */
                isVariadic: boolean;
                /**
                 * The prefix display parts.
                 */
                prefixDisplayParts: SymbolDisplayPart[];
                /**
                 * The suffix display parts.
                 */
                suffixDisplayParts: SymbolDisplayPart[];
                /**
                 * The separator display parts.
                 */
                separatorDisplayParts: SymbolDisplayPart[];
                /**
                 * The signature helps items for the parameters.
                 */
                parameters: SignatureHelpParameter[];
                /**
                 * The signature's documentation
                 */
                documentation: SymbolDisplayPart[];
                /**
                 * The signature's JSDoc tags
                 */
                tags: JSDocTagInfo[];
            }
            /**
             * Signature help items found in the response of a signature help request.
             */
            interface SignatureHelpItems {
                /**
                 * The signature help items.
                 */
                items: SignatureHelpItem[];
                /**
                 * The span for which signature help should appear on a signature
                 */
                applicableSpan: TextSpan;
                /**
                 * The item selected in the set of available help items.
                 */
                selectedItemIndex: number;
                /**
                 * The argument selected in the set of parameters.
                 */
                argumentIndex: number;
                /**
                 * The argument count
                 */
                argumentCount: number;
            }
            type SignatureHelpTriggerCharacter = "," | "(" | "<";
            type SignatureHelpRetriggerCharacter = SignatureHelpTriggerCharacter | ")";
            /**
             * Arguments of a signature help request.
             */
            interface SignatureHelpRequestArgs extends FileLocationRequestArgs {
                /**
                 * Reason why signature help was invoked.
                 * See each individual possible
                 */
                triggerReason?: SignatureHelpTriggerReason;
            }
            type SignatureHelpTriggerReason = SignatureHelpInvokedReason | SignatureHelpCharacterTypedReason | SignatureHelpRetriggeredReason;
            /**
             * Signals that the user manually requested signature help.
             * The language service will unconditionally attempt to provide a result.
             */
            interface SignatureHelpInvokedReason {
                kind: "invoked";
                triggerCharacter?: undefined;
            }
            /**
             * Signals that the signature help request came from a user typing a character.
             * Depending on the character and the syntactic context, the request may or may not be served a result.
             */
            interface SignatureHelpCharacterTypedReason {
                kind: "characterTyped";
                /**
                 * Character that was responsible for triggering signature help.
                 */
                triggerCharacter: SignatureHelpTriggerCharacter;
            }
            /**
             * Signals that this signature help request came from typing a character or moving the cursor.
             * This should only occur if a signature help session was already active and the editor needs to see if it should adjust.
             * The language service will unconditionally attempt to provide a result.
             * `triggerCharacter` can be `undefined` for a retrigger caused by a cursor move.
             */
            interface SignatureHelpRetriggeredReason {
                kind: "retrigger";
                /**
                 * Character that was responsible for triggering signature help.
                 */
                triggerCharacter?: SignatureHelpRetriggerCharacter;
            }
            /**
             * Signature help request; value of command field is "signatureHelp".
             * Given a file location (file, line, col), return the signature
             * help.
             */
            interface SignatureHelpRequest extends FileLocationRequest {
                command: CommandTypes.SignatureHelp;
                arguments: SignatureHelpRequestArgs;
            }
            /**
             * Response object for a SignatureHelpRequest.
             */
            interface SignatureHelpResponse extends Response {
                body?: SignatureHelpItems;
            }
            type InlayHintKind = "Type" | "Parameter" | "Enum";
            interface InlayHintsRequestArgs extends FileRequestArgs {
                /**
                 * Start position of the span.
                 */
                start: number;
                /**
                 * Length of the span.
                 */
                length: number;
            }
            interface InlayHintsRequest extends Request {
                command: CommandTypes.ProvideInlayHints;
                arguments: InlayHintsRequestArgs;
            }
            interface InlayHintItem {
                text: string;
                position: Location;
                kind: InlayHintKind;
                whitespaceBefore?: boolean;
                whitespaceAfter?: boolean;
            }
            interface InlayHintsResponse extends Response {
                body?: InlayHintItem[];
            }
            /**
             * Synchronous request for semantic diagnostics of one file.
             */
            interface SemanticDiagnosticsSyncRequest extends FileRequest {
                command: CommandTypes.SemanticDiagnosticsSync;
                arguments: SemanticDiagnosticsSyncRequestArgs;
            }
            interface SemanticDiagnosticsSyncRequestArgs extends FileRequestArgs {
                includeLinePosition?: boolean;
            }
            /**
             * Response object for synchronous sematic diagnostics request.
             */
            interface SemanticDiagnosticsSyncResponse extends Response {
                body?: Diagnostic[] | DiagnosticWithLinePosition[];
            }
            interface SuggestionDiagnosticsSyncRequest extends FileRequest {
                command: CommandTypes.SuggestionDiagnosticsSync;
                arguments: SuggestionDiagnosticsSyncRequestArgs;
            }
            type SuggestionDiagnosticsSyncRequestArgs = SemanticDiagnosticsSyncRequestArgs;
            type SuggestionDiagnosticsSyncResponse = SemanticDiagnosticsSyncResponse;
            /**
             * Synchronous request for syntactic diagnostics of one file.
             */
            interface SyntacticDiagnosticsSyncRequest extends FileRequest {
                command: CommandTypes.SyntacticDiagnosticsSync;
                arguments: SyntacticDiagnosticsSyncRequestArgs;
            }
            interface SyntacticDiagnosticsSyncRequestArgs extends FileRequestArgs {
                includeLinePosition?: boolean;
            }
            /**
             * Response object for synchronous syntactic diagnostics request.
             */
            interface SyntacticDiagnosticsSyncResponse extends Response {
                body?: Diagnostic[] | DiagnosticWithLinePosition[];
            }
            /**
             * Arguments for GeterrForProject request.
             */
            interface GeterrForProjectRequestArgs {
                /**
                 * the file requesting project error list
                 */
                file: string;
                /**
                 * Delay in milliseconds to wait before starting to compute
                 * errors for the files in the file list
                 */
                delay: number;
            }
            /**
             * GeterrForProjectRequest request; value of command field is
             * "geterrForProject". It works similarly with 'Geterr', only
             * it request for every file in this project.
             */
            interface GeterrForProjectRequest extends Request {
                command: CommandTypes.GeterrForProject;
                arguments: GeterrForProjectRequestArgs;
            }
            /**
             * Arguments for geterr messages.
             */
            interface GeterrRequestArgs {
                /**
                 * List of file names for which to compute compiler errors.
                 * The files will be checked in list order.
                 */
                files: string[];
                /**
                 * Delay in milliseconds to wait before starting to compute
                 * errors for the files in the file list
                 */
                delay: number;
            }
            /**
             * Geterr request; value of command field is "geterr". Wait for
             * delay milliseconds and then, if during the wait no change or
             * reload messages have arrived for the first file in the files
             * list, get the syntactic errors for the file, field requests,
             * and then get the semantic errors for the file.  Repeat with a
             * smaller delay for each subsequent file on the files list.  Best
             * practice for an editor is to send a file list containing each
             * file that is currently visible, in most-recently-used order.
             */
            interface GeterrRequest extends Request {
                command: CommandTypes.Geterr;
                arguments: GeterrRequestArgs;
            }
            type RequestCompletedEventName = "requestCompleted";
            /**
             * Event that is sent when server have finished processing request with specified id.
             */
            interface RequestCompletedEvent extends Event {
                event: RequestCompletedEventName;
                body: RequestCompletedEventBody;
            }
            interface RequestCompletedEventBody {
                request_seq: number;
            }
            /**
             * Item of diagnostic information found in a DiagnosticEvent message.
             */
            interface Diagnostic {
                /**
                 * Starting file location at which text applies.
                 */
                start: Location;
                /**
                 * The last file location at which the text applies.
                 */
                end: Location;
                /**
                 * Text of diagnostic message.
                 */
                text: string;
                /**
                 * The category of the diagnostic message, e.g. "error", "warning", or "suggestion".
                 */
                category: string;
                reportsUnnecessary?: {};
                reportsDeprecated?: {};
                /**
                 * Any related spans the diagnostic may have, such as other locations relevant to an error, such as declarartion sites
                 */
                relatedInformation?: DiagnosticRelatedInformation[];
                /**
                 * The error code of the diagnostic message.
                 */
                code?: number;
                /**
                 * The name of the plugin reporting the message.
                 */
                source?: string;
            }
            interface DiagnosticWithFileName extends Diagnostic {
                /**
                 * Name of the file the diagnostic is in
                 */
                fileName: string;
            }
            /**
             * Represents additional spans returned with a diagnostic which are relevant to it
             */
            interface DiagnosticRelatedInformation {
                /**
                 * The category of the related information message, e.g. "error", "warning", or "suggestion".
                 */
                category: string;
                /**
                 * The code used ot identify the related information
                 */
                code: number;
                /**
                 * Text of related or additional information.
                 */
                message: string;
                /**
                 * Associated location
                 */
                span?: FileSpan;
            }
            interface DiagnosticEventBody {
                /**
                 * The file for which diagnostic information is reported.
                 */
                file: string;
                /**
                 * An array of diagnostic information items.
                 */
                diagnostics: Diagnostic[];
            }
            type DiagnosticEventKind = "semanticDiag" | "syntaxDiag" | "suggestionDiag";
            /**
             * Event message for DiagnosticEventKind event types.
             * These events provide syntactic and semantic errors for a file.
             */
            interface DiagnosticEvent extends Event {
                body?: DiagnosticEventBody;
                event: DiagnosticEventKind;
            }
            interface ConfigFileDiagnosticEventBody {
                /**
                 * The file which trigged the searching and error-checking of the config file
                 */
                triggerFile: string;
                /**
                 * The name of the found config file.
                 */
                configFile: string;
                /**
                 * An arry of diagnostic information items for the found config file.
                 */
                diagnostics: DiagnosticWithFileName[];
            }
            /**
             * Event message for "configFileDiag" event type.
             * This event provides errors for a found config file.
             */
            interface ConfigFileDiagnosticEvent extends Event {
                body?: ConfigFileDiagnosticEventBody;
                event: "configFileDiag";
            }
            type ProjectLanguageServiceStateEventName = "projectLanguageServiceState";
            interface ProjectLanguageServiceStateEvent extends Event {
                event: ProjectLanguageServiceStateEventName;
                body?: ProjectLanguageServiceStateEventBody;
            }
            interface ProjectLanguageServiceStateEventBody {
                /**
                 * Project name that has changes in the state of language service.
                 * For configured projects this will be the config file path.
                 * For external projects this will be the name of the projects specified when project was open.
                 * For inferred projects this event is not raised.
                 */
                projectName: string;
                /**
                 * True if language service state switched from disabled to enabled
                 * and false otherwise.
                 */
                languageServiceEnabled: boolean;
            }
            type ProjectsUpdatedInBackgroundEventName = "projectsUpdatedInBackground";
            interface ProjectsUpdatedInBackgroundEvent extends Event {
                event: ProjectsUpdatedInBackgroundEventName;
                body: ProjectsUpdatedInBackgroundEventBody;
            }
            interface ProjectsUpdatedInBackgroundEventBody {
                /**
                 * Current set of open files
                 */
                openFiles: string[];
            }
            type ProjectLoadingStartEventName = "projectLoadingStart";
            interface ProjectLoadingStartEvent extends Event {
                event: ProjectLoadingStartEventName;
                body: ProjectLoadingStartEventBody;
            }
            interface ProjectLoadingStartEventBody {
                /** name of the project */
                projectName: string;
                /** reason for loading */
                reason: string;
            }
            type ProjectLoadingFinishEventName = "projectLoadingFinish";
            interface ProjectLoadingFinishEvent extends Event {
                event: ProjectLoadingFinishEventName;
                body: ProjectLoadingFinishEventBody;
            }
            interface ProjectLoadingFinishEventBody {
                /** name of the project */
                projectName: string;
            }
            type SurveyReadyEventName = "surveyReady";
            interface SurveyReadyEvent extends Event {
                event: SurveyReadyEventName;
                body: SurveyReadyEventBody;
            }
            interface SurveyReadyEventBody {
                /** Name of the survey. This is an internal machine- and programmer-friendly name */
                surveyId: string;
            }
            type LargeFileReferencedEventName = "largeFileReferenced";
            interface LargeFileReferencedEvent extends Event {
                event: LargeFileReferencedEventName;
                body: LargeFileReferencedEventBody;
            }
            interface LargeFileReferencedEventBody {
                /**
                 * name of the large file being loaded
                 */
                file: string;
                /**
                 * size of the file
                 */
                fileSize: number;
                /**
                 * max file size allowed on the server
                 */
                maxFileSize: number;
            }
            /**
             * Arguments for reload request.
             */
            interface ReloadRequestArgs extends FileRequestArgs {
                /**
                 * Name of temporary file from which to reload file
                 * contents. May be same as file.
                 */
                tmpfile: string;
            }
            /**
             * Reload request message; value of command field is "reload".
             * Reload contents of file with name given by the 'file' argument
             * from temporary file with name given by the 'tmpfile' argument.
             * The two names can be identical.
             */
            interface ReloadRequest extends FileRequest {
                command: CommandTypes.Reload;
                arguments: ReloadRequestArgs;
            }
            /**
             * Response to "reload" request. This is just an acknowledgement, so
             * no body field is required.
             */
            interface ReloadResponse extends Response {
            }
            /**
             * Arguments for saveto request.
             */
            interface SavetoRequestArgs extends FileRequestArgs {
                /**
                 * Name of temporary file into which to save server's view of
                 * file contents.
                 */
                tmpfile: string;
            }
            /**
             * Saveto request message; value of command field is "saveto".
             * For debugging purposes, save to a temporaryfile (named by
             * argument 'tmpfile') the contents of file named by argument
             * 'file'.  The server does not currently send a response to a
             * "saveto" request.
             */
            interface SavetoRequest extends FileRequest {
                command: CommandTypes.Saveto;
                arguments: SavetoRequestArgs;
            }
            /**
             * Arguments for navto request message.
             */
            interface NavtoRequestArgs {
                /**
                 * Search term to navigate to from current location; term can
                 * be '.*' or an identifier prefix.
                 */
                searchValue: string;
                /**
                 *  Optional limit on the number of items to return.
                 */
                maxResultCount?: number;
                /**
                 * The file for the request (absolute pathname required).
                 */
                file?: string;
                /**
                 * Optional flag to indicate we want results for just the current file
                 * or the entire project.
                 */
                currentFileOnly?: boolean;
                projectFileName?: string;
            }
            /**
             * Navto request message; value of command field is "navto".
             * Return list of objects giving file locations and symbols that
             * match the search term given in argument 'searchTerm'.  The
             * context for the search is given by the named file.
             */
            interface NavtoRequest extends Request {
                command: CommandTypes.Navto;
                arguments: NavtoRequestArgs;
            }
            /**
             * An item found in a navto response.
             */
            interface NavtoItem extends FileSpan {
                /**
                 * The symbol's name.
                 */
                name: string;
                /**
                 * The symbol's kind (such as 'className' or 'parameterName').
                 */
                kind: ScriptElementKind;
                /**
                 * exact, substring, or prefix.
                 */
                matchKind: string;
                /**
                 * If this was a case sensitive or insensitive match.
                 */
                isCaseSensitive: boolean;
                /**
                 * Optional modifiers for the kind (such as 'public').
                 */
                kindModifiers?: string;
                /**
                 * Name of symbol's container symbol (if any); for example,
                 * the class name if symbol is a class member.
                 */
                containerName?: string;
                /**
                 * Kind of symbol's container symbol (if any).
                 */
                containerKind?: ScriptElementKind;
            }
            /**
             * Navto response message. Body is an array of navto items.  Each
             * item gives a symbol that matched the search term.
             */
            interface NavtoResponse extends Response {
                body?: NavtoItem[];
            }
            /**
             * Arguments for change request message.
             */
            interface ChangeRequestArgs extends FormatRequestArgs {
                /**
                 * Optional string to insert at location (file, line, offset).
                 */
                insertString?: string;
            }
            /**
             * Change request message; value of command field is "change".
             * Update the server's view of the file named by argument 'file'.
             * Server does not currently send a response to a change request.
             */
            interface ChangeRequest extends FileLocationRequest {
                command: CommandTypes.Change;
                arguments: ChangeRequestArgs;
            }
            /**
             * Response to "brace" request.
             */
            interface BraceResponse extends Response {
                body?: TextSpan[];
            }
            /**
             * Brace matching request; value of command field is "brace".
             * Return response giving the file locations of matching braces
             * found in file at location line, offset.
             */
            interface BraceRequest extends FileLocationRequest {
                command: CommandTypes.Brace;
            }
            /**
             * NavBar items request; value of command field is "navbar".
             * Return response giving the list of navigation bar entries
             * extracted from the requested file.
             */
            interface NavBarRequest extends FileRequest {
                command: CommandTypes.NavBar;
            }
            /**
             * NavTree request; value of command field is "navtree".
             * Return response giving the navigation tree of the requested file.
             */
            interface NavTreeRequest extends FileRequest {
                command: CommandTypes.NavTree;
            }
            interface NavigationBarItem {
                /**
                 * The item's display text.
                 */
                text: string;
                /**
                 * The symbol's kind (such as 'className' or 'parameterName').
                 */
                kind: ScriptElementKind;
                /**
                 * Optional modifiers for the kind (such as 'public').
                 */
                kindModifiers?: string;
                /**
                 * The definition locations of the item.
                 */
                spans: TextSpan[];
                /**
                 * Optional children.
                 */
                childItems?: NavigationBarItem[];
                /**
                 * Number of levels deep this item should appear.
                 */
                indent: number;
            }
            /** protocol.NavigationTree is identical to ts.NavigationTree, except using protocol.TextSpan instead of ts.TextSpan */
            interface NavigationTree {
                text: string;
                kind: ScriptElementKind;
                kindModifiers: string;
                spans: TextSpan[];
                nameSpan: TextSpan | undefined;
                childItems?: NavigationTree[];
            }
            type TelemetryEventName = "telemetry";
            interface TelemetryEvent extends Event {
                event: TelemetryEventName;
                body: TelemetryEventBody;
            }
            interface TelemetryEventBody {
                telemetryEventName: string;
                payload: any;
            }
            type TypesInstallerInitializationFailedEventName = "typesInstallerInitializationFailed";
            interface TypesInstallerInitializationFailedEvent extends Event {
                event: TypesInstallerInitializationFailedEventName;
                body: TypesInstallerInitializationFailedEventBody;
            }
            interface TypesInstallerInitializationFailedEventBody {
                message: string;
            }
            type TypingsInstalledTelemetryEventName = "typingsInstalled";
            interface TypingsInstalledTelemetryEventBody extends TelemetryEventBody {
                telemetryEventName: TypingsInstalledTelemetryEventName;
                payload: TypingsInstalledTelemetryEventPayload;
            }
            interface TypingsInstalledTelemetryEventPayload {
                /**
                 * Comma separated list of installed typing packages
                 */
                installedPackages: string;
                /**
                 * true if install request succeeded, otherwise - false
                 */
                installSuccess: boolean;
                /**
                 * version of typings installer
                 */
                typingsInstallerVersion: string;
            }
            type BeginInstallTypesEventName = "beginInstallTypes";
            type EndInstallTypesEventName = "endInstallTypes";
            interface BeginInstallTypesEvent extends Event {
                event: BeginInstallTypesEventName;
                body: BeginInstallTypesEventBody;
            }
            interface EndInstallTypesEvent extends Event {
                event: EndInstallTypesEventName;
                body: EndInstallTypesEventBody;
            }
            interface InstallTypesEventBody {
                /**
                 * correlation id to match begin and end events
                 */
                eventId: number;
                /**
                 * list of packages to install
                 */
                packages: readonly string[];
            }
            interface BeginInstallTypesEventBody extends InstallTypesEventBody {
            }
            interface EndInstallTypesEventBody extends InstallTypesEventBody {
                /**
                 * true if installation succeeded, otherwise false
                 */
                success: boolean;
            }
            interface NavBarResponse extends Response {
                body?: NavigationBarItem[];
            }
            interface NavTreeResponse extends Response {
                body?: NavigationTree;
            }
            interface CallHierarchyItem {
                name: string;
                kind: ScriptElementKind;
                kindModifiers?: string;
                file: string;
                span: TextSpan;
                selectionSpan: TextSpan;
                containerName?: string;
            }
            interface CallHierarchyIncomingCall {
                from: CallHierarchyItem;
                fromSpans: TextSpan[];
            }
            interface CallHierarchyOutgoingCall {
                to: CallHierarchyItem;
                fromSpans: TextSpan[];
            }
            interface PrepareCallHierarchyRequest extends FileLocationRequest {
                command: CommandTypes.PrepareCallHierarchy;
            }
            interface PrepareCallHierarchyResponse extends Response {
                readonly body: CallHierarchyItem | CallHierarchyItem[];
            }
            interface ProvideCallHierarchyIncomingCallsRequest extends FileLocationRequest {
                command: CommandTypes.ProvideCallHierarchyIncomingCalls;
            }
            interface ProvideCallHierarchyIncomingCallsResponse extends Response {
                readonly body: CallHierarchyIncomingCall[];
            }
            interface ProvideCallHierarchyOutgoingCallsRequest extends FileLocationRequest {
                command: CommandTypes.ProvideCallHierarchyOutgoingCalls;
            }
            interface ProvideCallHierarchyOutgoingCallsResponse extends Response {
                readonly body: CallHierarchyOutgoingCall[];
            }
            enum IndentStyle {
                None = "None",
                Block = "Block",
                Smart = "Smart"
            }
            enum SemicolonPreference {
                Ignore = "ignore",
                Insert = "insert",
                Remove = "remove"
            }
            interface EditorSettings {
                baseIndentSize?: number;
                indentSize?: number;
                tabSize?: number;
                newLineCharacter?: string;
                convertTabsToSpaces?: boolean;
                indentStyle?: IndentStyle | ts.IndentStyle;
                trimTrailingWhitespace?: boolean;
            }
            interface FormatCodeSettings extends EditorSettings {
                insertSpaceAfterCommaDelimiter?: boolean;
                insertSpaceAfterSemicolonInForStatements?: boolean;
                insertSpaceBeforeAndAfterBinaryOperators?: boolean;
                insertSpaceAfterConstructor?: boolean;
                insertSpaceAfterKeywordsInControlFlowStatements?: boolean;
                insertSpaceAfterFunctionKeywordForAnonymousFunctions?: boolean;
                insertSpaceAfterOpeningAndBeforeClosingEmptyBraces?: boolean;
                insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis?: boolean;
                insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets?: boolean;
                insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces?: boolean;
                insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces?: boolean;
                insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces?: boolean;
                insertSpaceAfterTypeAssertion?: boolean;
                insertSpaceBeforeFunctionParenthesis?: boolean;
                placeOpenBraceOnNewLineForFunctions?: boolean;
                placeOpenBraceOnNewLineForControlBlocks?: boolean;
                insertSpaceBeforeTypeAnnotation?: boolean;
                semicolons?: SemicolonPreference;
            }
            interface UserPreferences {
                readonly disableSuggestions?: boolean;
                readonly quotePreference?: "auto" | "double" | "single";
                /**
                 * If enabled, TypeScript will search through all external modules' exports and add them to the completions list.
                 * This affects lone identifier completions but not completions on the right hand side of `obj.`.
                 */
                readonly includeCompletionsForModuleExports?: boolean;
                /**
                 * Enables auto-import-style completions on partially-typed import statements. E.g., allows
                 * `import write|` to be completed to `import { writeFile } from "fs"`.
                 */
                readonly includeCompletionsForImportStatements?: boolean;
                /**
                 * Allows completions to be formatted with snippet text, indicated by `CompletionItem["isSnippet"]`.
                 */
                readonly includeCompletionsWithSnippetText?: boolean;
                /**
                 * If enabled, the completion list will include completions with invalid identifier names.
                 * For those entries, The `insertText` and `replacementSpan` properties will be set to change from `.x` property access to `["x"]`.
                 */
                readonly includeCompletionsWithInsertText?: boolean;
                /**
                 * Unless this option is `false`, or `includeCompletionsWithInsertText` is not enabled,
                 * member completion lists triggered with `.` will include entries on potentially-null and potentially-undefined
                 * values, with insertion text to replace preceding `.` tokens with `?.`.
                 */
                readonly includeAutomaticOptionalChainCompletions?: boolean;
                /**
                 * If enabled, completions for class members (e.g. methods and properties) will include
                 * a whole declaration for the member.
                 * E.g., `class A { f| }` could be completed to `class A { foo(): number {} }`, instead of
                 * `class A { foo }`.
                 */
                readonly includeCompletionsWithClassMemberSnippets?: boolean;
                /**
                 * If enabled, object literal methods will have a method declaration completion entry in addition
                 * to the regular completion entry containing just the method name.
                 * E.g., `const objectLiteral: T = { f| }` could be completed to `const objectLiteral: T = { foo(): void {} }`,
                 * in addition to `const objectLiteral: T = { foo }`.
                 */
                readonly includeCompletionsWithObjectLiteralMethodSnippets?: boolean;
                /**
                 * Indicates whether {@link CompletionEntry.labelDetails completion entry label details} are supported.
                 * If not, contents of `labelDetails` may be included in the {@link CompletionEntry.name} property.
                 */
                readonly useLabelDetailsInCompletionEntries?: boolean;
                readonly allowIncompleteCompletions?: boolean;
                readonly importModuleSpecifierPreference?: "shortest" | "project-relative" | "relative" | "non-relative";
                /** Determines whether we import `foo/index.ts` as "foo", "foo/index", or "foo/index.js" */
                readonly importModuleSpecifierEnding?: "auto" | "minimal" | "index" | "js";
                readonly allowTextChangesInNewFiles?: boolean;
                readonly lazyConfiguredProjectsFromExternalProject?: boolean;
                readonly providePrefixAndSuffixTextForRename?: boolean;
                readonly provideRefactorNotApplicableReason?: boolean;
                readonly allowRenameOfImportPath?: boolean;
                readonly includePackageJsonAutoImports?: "auto" | "on" | "off";
                readonly jsxAttributeCompletionStyle?: "auto" | "braces" | "none";
                readonly displayPartsForJSDoc?: boolean;
                readonly generateReturnInDocTemplate?: boolean;
                readonly includeInlayParameterNameHints?: "none" | "literals" | "all";
                readonly includeInlayParameterNameHintsWhenArgumentMatchesName?: boolean;
                readonly includeInlayFunctionParameterTypeHints?: boolean;
                readonly includeInlayVariableTypeHints?: boolean;
                readonly includeInlayVariableTypeHintsWhenTypeMatchesName?: boolean;
                readonly includeInlayPropertyDeclarationTypeHints?: boolean;
                readonly includeInlayFunctionLikeReturnTypeHints?: boolean;
                readonly includeInlayEnumMemberValueHints?: boolean;
                readonly autoImportFileExcludePatterns?: string[];
                /**
                 * Indicates whether {@link ReferencesResponseItem.lineText} is supported.
                 */
                readonly disableLineTextInReferences?: boolean;
            }
            interface CompilerOptions {
                allowJs?: boolean;
                allowSyntheticDefaultImports?: boolean;
                allowUnreachableCode?: boolean;
                allowUnusedLabels?: boolean;
                alwaysStrict?: boolean;
                baseUrl?: string;
                charset?: string;
                checkJs?: boolean;
                declaration?: boolean;
                declarationDir?: string;
                disableSizeLimit?: boolean;
                downlevelIteration?: boolean;
                emitBOM?: boolean;
                emitDecoratorMetadata?: boolean;
                experimentalDecorators?: boolean;
                forceConsistentCasingInFileNames?: boolean;
                importHelpers?: boolean;
                inlineSourceMap?: boolean;
                inlineSources?: boolean;
                isolatedModules?: boolean;
                jsx?: JsxEmit | ts.JsxEmit;
                lib?: string[];
                locale?: string;
                mapRoot?: string;
                maxNodeModuleJsDepth?: number;
                module?: ModuleKind | ts.ModuleKind;
                moduleResolution?: ModuleResolutionKind | ts.ModuleResolutionKind;
                newLine?: NewLineKind | ts.NewLineKind;
                noEmit?: boolean;
                noEmitHelpers?: boolean;
                noEmitOnError?: boolean;
                noErrorTruncation?: boolean;
                noFallthroughCasesInSwitch?: boolean;
                noImplicitAny?: boolean;
                noImplicitReturns?: boolean;
                noImplicitThis?: boolean;
                noUnusedLocals?: boolean;
                noUnusedParameters?: boolean;
                noImplicitUseStrict?: boolean;
                noLib?: boolean;
                noResolve?: boolean;
                out?: string;
                outDir?: string;
                outFile?: string;
                paths?: MapLike<string[]>;
                plugins?: PluginImport[];
                preserveConstEnums?: boolean;
                preserveSymlinks?: boolean;
                project?: string;
                reactNamespace?: string;
                removeComments?: boolean;
                references?: ProjectReference[];
                rootDir?: string;
                rootDirs?: string[];
                skipLibCheck?: boolean;
                skipDefaultLibCheck?: boolean;
                sourceMap?: boolean;
                sourceRoot?: string;
                strict?: boolean;
                strictNullChecks?: boolean;
                suppressExcessPropertyErrors?: boolean;
                suppressImplicitAnyIndexErrors?: boolean;
                useDefineForClassFields?: boolean;
                target?: ScriptTarget | ts.ScriptTarget;
                traceResolution?: boolean;
                resolveJsonModule?: boolean;
                types?: string[];
                /** Paths used to used to compute primary types search locations */
                typeRoots?: string[];
                ets?: EtsOptions;
                packageManagerType?: string;
                emitNodeModulesFiles?: boolean;
                [option: string]: CompilerOptionsValue | undefined;
            }
            enum JsxEmit {
                None = "None",
                Preserve = "Preserve",
                ReactNative = "ReactNative",
                React = "React"
            }
            enum ModuleKind {
                None = "None",
                CommonJS = "CommonJS",
                AMD = "AMD",
                UMD = "UMD",
                System = "System",
                ES6 = "ES6",
                ES2015 = "ES2015",
                ESNext = "ESNext"
            }
            enum ModuleResolutionKind {
                Classic = "Classic",
                Node = "Node"
            }
            enum NewLineKind {
                Crlf = "Crlf",
                Lf = "Lf"
            }
            enum ScriptTarget {
                ES3 = "ES3",
                ES5 = "ES5",
                ES6 = "ES6",
                ES2015 = "ES2015",
                ES2016 = "ES2016",
                ES2017 = "ES2017",
                ES2018 = "ES2018",
                ES2019 = "ES2019",
                ES2020 = "ES2020",
                ES2021 = "ES2021",
                ES2022 = "ES2022",
                ESNext = "ESNext"
            }
            enum ClassificationType {
                comment = 1,
                identifier = 2,
                keyword = 3,
                numericLiteral = 4,
                operator = 5,
                stringLiteral = 6,
                regularExpressionLiteral = 7,
                whiteSpace = 8,
                text = 9,
                punctuation = 10,
                className = 11,
                enumName = 12,
                interfaceName = 13,
                moduleName = 14,
                typeParameterName = 15,
                typeAliasName = 16,
                parameterName = 17,
                docCommentTagName = 18,
                jsxOpenTagName = 19,
                jsxCloseTagName = 20,
                jsxSelfClosingTagName = 21,
                jsxAttribute = 22,
                jsxText = 23,
                jsxAttributeStringLiteralValue = 24,
                bigintLiteral = 25
            }
        }
        interface CompressedData {
            length: number;
            compressionKind: string;
            data: any;
        }
        type ModuleImportResult = {
            module: {};
            error: undefined;
        } | {
            module: undefined;
            error: {
                stack?: string;
                message?: string;
            };
        };
        /** @deprecated Use {@link ModuleImportResult} instead. */
        type RequireResult = ModuleImportResult;
        interface ServerHost extends System {
            watchFile(path: string, callback: FileWatcherCallback, pollingInterval?: number, options?: WatchOptions): FileWatcher;
            watchDirectory(path: string, callback: DirectoryWatcherCallback, recursive?: boolean, options?: WatchOptions): FileWatcher;
            setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
            clearTimeout(timeoutId: any): void;
            setImmediate(callback: (...args: any[]) => void, ...args: any[]): any;
            clearImmediate(timeoutId: any): void;
            gc?(): void;
            trace?(s: string): void;
            require?(initialPath: string, moduleName: string): ModuleImportResult;
            getJsDocNodeCheckedConfig?(fileCheckedInfo: FileCheckModuleInfo, symbolSourceFilePath: string): JsDocNodeCheckConfig;
            getJsDocNodeConditionCheckedResult?(fileCheckedInfo: FileCheckModuleInfo, jsDocs: JsDocTagInfo[]): ConditionCheckResult;
            getFileCheckedModuleInfo?(containFilePath: string): FileCheckModuleInfo;
        }
        function createInstallTypingsRequest(project: Project, typeAcquisition: TypeAcquisition, unresolvedImports: SortedReadonlyArray<string>, cachePath?: string): DiscoverTypings;
        function toNormalizedPath(fileName: string): NormalizedPath;
        function normalizedPathToPath(normalizedPath: NormalizedPath, currentDirectory: string, getCanonicalFileName: (f: string) => string): Path;
        function asNormalizedPath(fileName: string): NormalizedPath;
        function createNormalizedPathMap<T>(): NormalizedPathMap<T>;
        function isInferredProjectName(name: string): boolean;
        function makeInferredProjectName(counter: number): string;
        function createSortedArray<T>(): SortedArray<T>;
        enum LogLevel {
            terse = 0,
            normal = 1,
            requestTime = 2,
            verbose = 3
        }
        const emptyArray: SortedReadonlyArray<never>;
        interface Logger {
            close(): void;
            hasLevel(level: LogLevel): boolean;
            loggingEnabled(): boolean;
            perftrc(s: string): void;
            info(s: string): void;
            startGroup(): void;
            endGroup(): void;
            msg(s: string, type?: Msg): void;
            getLogFileName(): string | undefined;
        }
        enum Msg {
            Err = "Err",
            Info = "Info",
            Perf = "Perf"
        }
        namespace Msg {
            /** @deprecated Only here for backwards-compatibility. Prefer just `Msg`. */
            type Types = Msg;
        }
        namespace Errors {
            function ThrowNoProject(): never;
            function ThrowProjectLanguageServiceDisabled(): never;
            function ThrowProjectDoesNotContainDocument(fileName: string, project: Project): never;
        }
        type NormalizedPath = string & {
            __normalizedPathTag: any;
        };
        interface NormalizedPathMap<T> {
            get(path: NormalizedPath): T | undefined;
            set(path: NormalizedPath, value: T): void;
            contains(path: NormalizedPath): boolean;
            remove(path: NormalizedPath): void;
        }
        function isDynamicFileName(fileName: NormalizedPath): boolean;
        interface ScriptInfoVersion {
            svc: number;
            text: number;
        }
        class ScriptInfo {
            private readonly host;
            readonly fileName: NormalizedPath;
            readonly scriptKind: ScriptKind;
            readonly hasMixedContent: boolean;
            readonly path: Path;
            /**
             * All projects that include this file
             */
            readonly containingProjects: Project[];
            private formatSettings;
            private preferences;
            private textStorage;
            constructor(host: ServerHost, fileName: NormalizedPath, scriptKind: ScriptKind, hasMixedContent: boolean, path: Path, initialVersion?: ScriptInfoVersion);
            isScriptOpen(): boolean;
            open(newText: string): void;
            close(fileExists?: boolean): void;
            getSnapshot(): IScriptSnapshot;
            private ensureRealPath;
            getFormatCodeSettings(): FormatCodeSettings | undefined;
            getPreferences(): protocol.UserPreferences | undefined;
            attachToProject(project: Project): boolean;
            isAttached(project: Project): boolean;
            detachFromProject(project: Project): void;
            detachAllProjects(): void;
            getDefaultProject(): Project;
            registerFileUpdate(): void;
            setOptions(formatSettings: FormatCodeSettings, preferences: protocol.UserPreferences | undefined): void;
            getLatestVersion(): string;
            saveTo(fileName: string): void;
            reloadFromFile(tempFileName?: NormalizedPath): boolean;
            editContent(start: number, end: number, newText: string): void;
            markContainingProjectsAsDirty(): void;
            isOrphan(): boolean;
            /**
             *  @param line 1 based index
             */
            lineToTextSpan(line: number): TextSpan;
            /**
             * @param line 1 based index
             * @param offset 1 based index
             */
            lineOffsetToPosition(line: number, offset: number): number;
            positionToLineOffset(position: number): protocol.Location;
            isJavaScript(): boolean;
        }
        interface InstallPackageOptionsWithProject extends InstallPackageOptions {
            projectName: string;
            projectRootPath: Path;
        }
        interface ITypingsInstaller {
            isKnownTypesPackageName(name: string): boolean;
            installPackage(options: InstallPackageOptionsWithProject): Promise<ApplyCodeActionCommandResult>;
            enqueueInstallTypingsRequest(p: Project, typeAcquisition: TypeAcquisition, unresolvedImports: SortedReadonlyArray<string> | undefined): void;
            attach(projectService: ProjectService): void;
            onProjectClosed(p: Project): void;
            readonly globalTypingsCacheLocation: string | undefined;
        }
        const nullTypingsInstaller: ITypingsInstaller;
        function allRootFilesAreJsOrDts(project: Project): boolean;
        function allFilesAreJsOrDts(project: Project): boolean;
        enum ProjectKind {
            Inferred = 0,
            Configured = 1,
            External = 2,
            AutoImportProvider = 3,
            Auxiliary = 4
        }
        interface PluginCreateInfo {
            project: Project;
            languageService: LanguageService;
            languageServiceHost: LanguageServiceHost;
            serverHost: ServerHost;
            session?: Session<unknown>;
            config: any;
        }
        interface PluginModule {
            create(createInfo: PluginCreateInfo): LanguageService;
            getExternalFiles?(proj: Project): string[];
            onConfigurationChanged?(config: any): void;
        }
        interface PluginModuleWithName {
            name: string;
            module: PluginModule;
        }
        type PluginModuleFactory = (mod: {
            typescript: typeof ts;
        }) => PluginModule;
        abstract class Project implements LanguageServiceHost, ModuleResolutionHost {
            readonly projectKind: ProjectKind;
            readonly projectService: ProjectService;
            private documentRegistry;
            private compilerOptions;
            compileOnSaveEnabled: boolean;
            protected watchOptions: WatchOptions | undefined;
            private rootFiles;
            private rootFilesMap;
            private program;
            private externalFiles;
            private missingFilesMap;
            private generatedFilesMap;
            protected languageService: LanguageService;
            languageServiceEnabled: boolean;
            readonly trace?: (s: string) => void;
            readonly realpath?: (path: string) => string;
            private builderState;
            /**
             * Set of files names that were updated since the last call to getChangesSinceVersion.
             */
            private updatedFileNames;
            /**
             * Set of files that was returned from the last call to getChangesSinceVersion.
             */
            private lastReportedFileNames;
            /**
             * Last version that was reported.
             */
            private lastReportedVersion;
            /**
             * Current project's program version. (incremented everytime new program is created that is not complete reuse from the old one)
             * This property is changed in 'updateGraph' based on the set of files in program
             */
            private projectProgramVersion;
            /**
             * Current version of the project state. It is changed when:
             * - new root file was added/removed
             * - edit happen in some file that is currently included in the project.
             * This property is different from projectStructureVersion since in most cases edits don't affect set of files in the project
             */
            private projectStateVersion;
            protected projectErrors: Diagnostic[] | undefined;
            protected isInitialLoadPending: () => boolean;
            private readonly cancellationToken;
            isNonTsProject(): boolean;
            isJsOnlyProject(): boolean;
            static resolveModule(moduleName: string, initialDir: string, host: ServerHost, log: (message: string) => void, logErrors?: (message: string) => void): {} | undefined;
            getFileCheckedModuleInfo?(containFilePath: string): FileCheckModuleInfo;
            getJsDocNodeCheckedConfig(jsDocFileCheckedInfo: FileCheckModuleInfo, sourceFilePath: string): JsDocNodeCheckConfig;
            getJsDocNodeConditionCheckedResult(jsDocFileCheckedInfo: FileCheckModuleInfo, jsDocs: JsDocTagInfo[]): ConditionCheckResult;
            getTagNameNeededCheckByFile(filePath: string): TagCheckParam;
            getExpressionCheckedResultsByFile?(filePath: string, jsDocs: JSDoc[]): ConditionCheckResult;
            isKnownTypesPackageName(name: string): boolean;
            installPackage(options: InstallPackageOptions): Promise<ApplyCodeActionCommandResult>;
            private get typingsCache();
            getCompilationSettings(): ts.CompilerOptions;
            getCompilerOptions(): ts.CompilerOptions;
            getNewLine(): string;
            getProjectVersion(): string;
            getProjectReferences(): readonly ProjectReference[] | undefined;
            getScriptFileNames(): string[];
            private getOrCreateScriptInfoAndAttachToProject;
            getScriptKind(fileName: string): ts.ScriptKind;
            getScriptVersion(filename: string): string;
            getScriptSnapshot(filename: string): IScriptSnapshot | undefined;
            getCancellationToken(): HostCancellationToken;
            getCurrentDirectory(): string;
            getDefaultLibFileName(): string;
            useCaseSensitiveFileNames(): boolean;
            readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
            readFile(fileName: string): string | undefined;
            writeFile(fileName: string, content: string): void;
            fileExists(file: string): boolean;
            resolveModuleNames(moduleNames: string[], containingFile: string, reusedNames?: string[], redirectedReference?: ResolvedProjectReference, _options?: CompilerOptions, containingSourceFile?: SourceFile): (ResolvedModuleFull | undefined)[];
            getModuleResolutionCache(): ModuleResolutionCache | undefined;
            getResolvedModuleWithFailedLookupLocationsFromCache(moduleName: string, containingFile: string, resolutionMode?: ModuleKind.CommonJS | ModuleKind.ESNext): ResolvedModuleWithFailedLookupLocations | undefined;
            resolveTypeReferenceDirectives(typeDirectiveNames: string[] | FileReference[], containingFile: string, redirectedReference?: ResolvedProjectReference, _options?: CompilerOptions, containingFileMode?: SourceFile["impliedNodeFormat"] | undefined): (ResolvedTypeReferenceDirective | undefined)[];
            directoryExists(path: string): boolean;
            getDirectories(path: string): string[];
            log(s: string): void;
            error(s: string): void;
            private setInternalCompilerOptionsForEmittingJsFiles;
            /**
             * Get the errors that dont have any file name associated
             */
            getGlobalProjectErrors(): readonly Diagnostic[];
            /**
             * Get all the project errors
             */
            getAllProjectErrors(): readonly Diagnostic[];
            setProjectErrors(projectErrors: Diagnostic[] | undefined): void;
            getLanguageService(ensureSynchronized?: boolean): LanguageService;
            getCompileOnSaveAffectedFileList(scriptInfo: ScriptInfo): string[];
            /**
             * Returns true if emit was conducted
             */
            emitFile(scriptInfo: ScriptInfo, writeFile: (path: string, data: string, writeByteOrderMark?: boolean) => void): EmitResult;
            enableLanguageService(): void;
            disableLanguageService(lastFileExceededProgramSize?: string): void;
            getProjectName(): string;
            protected removeLocalTypingsFromTypeAcquisition(newTypeAcquisition: TypeAcquisition): TypeAcquisition;
            getExternalFiles(): SortedReadonlyArray<string>;
            getSourceFile(path: Path): ts.SourceFile | undefined;
            close(): void;
            private detachScriptInfoIfNotRoot;
            isClosed(): boolean;
            hasRoots(): boolean;
            getRootFiles(): ts.server.NormalizedPath[];
            getRootScriptInfos(): ts.server.ScriptInfo[];
            getScriptInfos(): ScriptInfo[];
            getExcludedFiles(): readonly NormalizedPath[];
            getFileNames(excludeFilesFromExternalLibraries?: boolean, excludeConfigFiles?: boolean): ts.server.NormalizedPath[];
            hasConfigFile(configFilePath: NormalizedPath): boolean;
            containsScriptInfo(info: ScriptInfo): boolean;
            containsFile(filename: NormalizedPath, requireOpen?: boolean): boolean;
            isRoot(info: ScriptInfo): boolean;
            addRoot(info: ScriptInfo, fileName?: NormalizedPath): void;
            addMissingFileRoot(fileName: NormalizedPath): void;
            removeFile(info: ScriptInfo, fileExists: boolean, detachFromProject: boolean): void;
            registerFileUpdate(fileName: string): void;
            markAsDirty(): void;
            /**
             * Updates set of files that contribute to this project
             * @returns: true if set of files in the project stays the same and false - otherwise.
             */
            updateGraph(): boolean;
            protected removeExistingTypings(include: string[]): string[];
            private updateGraphWorker;
            private detachScriptInfoFromProject;
            private addMissingFileWatcher;
            private isWatchedMissingFile;
            private createGeneratedFileWatcher;
            private isValidGeneratedFileWatcher;
            private clearGeneratedFileWatch;
            getScriptInfoForNormalizedPath(fileName: NormalizedPath): ScriptInfo | undefined;
            getScriptInfo(uncheckedFileName: string): ts.server.ScriptInfo | undefined;
            filesToString(writeProjectFileNames: boolean): string;
            setCompilerOptions(compilerOptions: CompilerOptions): void;
            setTypeAcquisition(newTypeAcquisition: TypeAcquisition | undefined): void;
            getTypeAcquisition(): ts.TypeAcquisition;
            protected removeRoot(info: ScriptInfo): void;
            protected enableGlobalPlugins(options: CompilerOptions, pluginConfigOverrides: Map<any> | undefined): void;
            protected enablePlugin(pluginConfigEntry: PluginImport, searchPaths: string[], pluginConfigOverrides: Map<any> | undefined): void;
            private enableProxy;
            /** Starts a new check for diagnostics. Call this if some file has updated that would cause diagnostics to be changed. */
            refreshDiagnostics(): void;
        }
        /**
         * If a file is opened and no tsconfig (or jsconfig) is found,
         * the file and its imports/references are put into an InferredProject.
         */
        class InferredProject extends Project {
            private _isJsInferredProject;
            toggleJsInferredProject(isJsInferredProject: boolean): void;
            setCompilerOptions(options?: CompilerOptions): void;
            /** this is canonical project root path */
            readonly projectRootPath: string | undefined;
            addRoot(info: ScriptInfo): void;
            removeRoot(info: ScriptInfo): void;
            isProjectWithSingleRoot(): boolean;
            close(): void;
            getTypeAcquisition(): TypeAcquisition;
        }
        class AutoImportProviderProject extends Project {
            private hostProject;
            private rootFileNames;
            isOrphan(): boolean;
            updateGraph(): boolean;
            hasRoots(): boolean;
            markAsDirty(): void;
            getScriptFileNames(): string[];
            getLanguageService(): never;
            getModuleResolutionHostForAutoImportProvider(): never;
            getProjectReferences(): readonly ts.ProjectReference[] | undefined;
            getTypeAcquisition(): TypeAcquisition;
        }
        /**
         * If a file is opened, the server will look for a tsconfig (or jsconfig)
         * and if successful create a ConfiguredProject for it.
         * Otherwise it will create an InferredProject.
         */
        class ConfiguredProject extends Project {
            readonly canonicalConfigFilePath: NormalizedPath;
            /** Ref count to the project when opened from external project */
            private externalProjectRefCount;
            private projectReferences;
            /**
             * If the project has reload from disk pending, it reloads (and then updates graph as part of that) instead of just updating the graph
             * @returns: true if set of files in the project stays the same and false - otherwise.
             */
            updateGraph(): boolean;
            getConfigFilePath(): ts.server.NormalizedPath;
            getProjectReferences(): readonly ProjectReference[] | undefined;
            updateReferences(refs: readonly ProjectReference[] | undefined): void;
            /**
             * Get the errors that dont have any file name associated
             */
            getGlobalProjectErrors(): readonly Diagnostic[];
            /**
             * Get all the project errors
             */
            getAllProjectErrors(): readonly Diagnostic[];
            setProjectErrors(projectErrors: Diagnostic[]): void;
            close(): void;
            getEffectiveTypeRoots(): string[];
        }
        /**
         * Project whose configuration is handled externally, such as in a '.csproj'.
         * These are created only if a host explicitly calls `openExternalProject`.
         */
        class ExternalProject extends Project {
            externalProjectName: string;
            compileOnSaveEnabled: boolean;
            excludedFiles: readonly NormalizedPath[];
            updateGraph(): boolean;
            getExcludedFiles(): readonly ts.server.NormalizedPath[];
        }
        function convertFormatOptions(protocolOptions: protocol.FormatCodeSettings): FormatCodeSettings;
        function convertCompilerOptions(protocolOptions: protocol.ExternalProjectCompilerOptions): CompilerOptions & protocol.CompileOnSaveMixin;
        function convertWatchOptions(protocolOptions: protocol.ExternalProjectCompilerOptions, currentDirectory?: string): WatchOptionsAndErrors | undefined;
        function convertTypeAcquisition(protocolOptions: protocol.InferredProjectCompilerOptions): TypeAcquisition | undefined;
        function tryConvertScriptKindName(scriptKindName: protocol.ScriptKindName | ScriptKind): ScriptKind;
        function convertScriptKindName(scriptKindName: protocol.ScriptKindName): ScriptKind.Unknown | ScriptKind.JS | ScriptKind.JSX | ScriptKind.TS | ScriptKind.TSX | ScriptKind.ETS;
        const maxProgramSizeForNonTsFiles: number;
        const ProjectsUpdatedInBackgroundEvent = "projectsUpdatedInBackground";
        interface ProjectsUpdatedInBackgroundEvent {
            eventName: typeof ProjectsUpdatedInBackgroundEvent;
            data: {
                openFiles: string[];
            };
        }
        const ProjectLoadingStartEvent = "projectLoadingStart";
        interface ProjectLoadingStartEvent {
            eventName: typeof ProjectLoadingStartEvent;
            data: {
                project: Project;
                reason: string;
            };
        }
        const ProjectLoadingFinishEvent = "projectLoadingFinish";
        interface ProjectLoadingFinishEvent {
            eventName: typeof ProjectLoadingFinishEvent;
            data: {
                project: Project;
            };
        }
        const LargeFileReferencedEvent = "largeFileReferenced";
        interface LargeFileReferencedEvent {
            eventName: typeof LargeFileReferencedEvent;
            data: {
                file: string;
                fileSize: number;
                maxFileSize: number;
            };
        }
        const ConfigFileDiagEvent = "configFileDiag";
        interface ConfigFileDiagEvent {
            eventName: typeof ConfigFileDiagEvent;
            data: {
                triggerFile: string;
                configFileName: string;
                diagnostics: readonly Diagnostic[];
            };
        }
        const ProjectLanguageServiceStateEvent = "projectLanguageServiceState";
        interface ProjectLanguageServiceStateEvent {
            eventName: typeof ProjectLanguageServiceStateEvent;
            data: {
                project: Project;
                languageServiceEnabled: boolean;
            };
        }
        const ProjectInfoTelemetryEvent = "projectInfo";
        /** This will be converted to the payload of a protocol.TelemetryEvent in session.defaultEventHandler. */
        interface ProjectInfoTelemetryEvent {
            readonly eventName: typeof ProjectInfoTelemetryEvent;
            readonly data: ProjectInfoTelemetryEventData;
        }
        const OpenFileInfoTelemetryEvent = "openFileInfo";
        /**
         * Info that we may send about a file that was just opened.
         * Info about a file will only be sent once per session, even if the file changes in ways that might affect the info.
         * Currently this is only sent for '.js' files.
         */
        interface OpenFileInfoTelemetryEvent {
            readonly eventName: typeof OpenFileInfoTelemetryEvent;
            readonly data: OpenFileInfoTelemetryEventData;
        }
        interface ProjectInfoTelemetryEventData {
            /** Cryptographically secure hash of project file location. */
            readonly projectId: string;
            /** Count of file extensions seen in the project. */
            readonly fileStats: FileStats;
            /**
             * Any compiler options that might contain paths will be taken out.
             * Enum compiler options will be converted to strings.
             */
            readonly compilerOptions: CompilerOptions;
            readonly extends: boolean | undefined;
            readonly files: boolean | undefined;
            readonly include: boolean | undefined;
            readonly exclude: boolean | undefined;
            readonly compileOnSave: boolean;
            readonly typeAcquisition: ProjectInfoTypeAcquisitionData;
            readonly configFileName: "tsconfig.json" | "jsconfig.json" | "other";
            readonly projectType: "external" | "configured";
            readonly languageServiceEnabled: boolean;
            /** TypeScript version used by the server. */
            readonly version: string;
        }
        interface OpenFileInfoTelemetryEventData {
            readonly info: OpenFileInfo;
        }
        interface ProjectInfoTypeAcquisitionData {
            readonly enable: boolean | undefined;
            readonly include: boolean;
            readonly exclude: boolean;
        }
        interface FileStats {
            readonly js: number;
            readonly jsSize?: number;
            readonly jsx: number;
            readonly jsxSize?: number;
            readonly ts: number;
            readonly tsSize?: number;
            readonly tsx: number;
            readonly tsxSize?: number;
            readonly dts: number;
            readonly dtsSize?: number;
            readonly deferred: number;
            readonly deferredSize?: number;
            readonly ets: number;
            readonly etsSize?: number;
            readonly dets: number;
            readonly detsSize?: number;
        }
        interface OpenFileInfo {
            readonly checkJs: boolean;
        }
        type ProjectServiceEvent = LargeFileReferencedEvent | ProjectsUpdatedInBackgroundEvent | ProjectLoadingStartEvent | ProjectLoadingFinishEvent | ConfigFileDiagEvent | ProjectLanguageServiceStateEvent | ProjectInfoTelemetryEvent | OpenFileInfoTelemetryEvent;
        type ProjectServiceEventHandler = (event: ProjectServiceEvent) => void;
        interface SafeList {
            [name: string]: {
                match: RegExp;
                exclude?: (string | number)[][];
                types?: string[];
            };
        }
        interface TypesMapFile {
            typesMap: SafeList;
            simpleMap: {
                [libName: string]: string;
            };
        }
        interface HostConfiguration {
            formatCodeOptions: FormatCodeSettings;
            preferences: protocol.UserPreferences;
            hostInfo: string;
            extraFileExtensions?: FileExtensionInfo[];
            watchOptions?: WatchOptions;
        }
        interface OpenConfiguredProjectResult {
            configFileName?: NormalizedPath;
            configFileErrors?: readonly Diagnostic[];
        }
        interface ProjectServiceOptions {
            host: ServerHost;
            logger: Logger;
            cancellationToken: HostCancellationToken;
            useSingleInferredProject: boolean;
            useInferredProjectPerProjectRoot: boolean;
            typingsInstaller: ITypingsInstaller;
            eventHandler?: ProjectServiceEventHandler;
            suppressDiagnosticEvents?: boolean;
            throttleWaitMilliseconds?: number;
            globalPlugins?: readonly string[];
            pluginProbeLocations?: readonly string[];
            allowLocalPluginLoads?: boolean;
            typesMapLocation?: string;
            /** @deprecated use serverMode instead */
            syntaxOnly?: boolean;
            serverMode?: LanguageServiceMode;
            session: Session<unknown> | undefined;
        }
        interface WatchOptionsAndErrors {
            watchOptions: WatchOptions;
            errors: Diagnostic[] | undefined;
        }
        class ProjectService {
            private readonly nodeModulesWatchers;
            /**
             * Contains all the deleted script info's version information so that
             * it does not reset when creating script info again
             * (and could have potentially collided with version where contents mismatch)
             */
            private readonly filenameToScriptInfoVersion;
            private readonly allJsFilesForOpenFileTelemetry;
            /**
             * maps external project file name to list of config files that were the part of this project
             */
            private readonly externalProjectToConfiguredProjectMap;
            /**
             * external projects (configuration and list of root files is not controlled by tsserver)
             */
            readonly externalProjects: ExternalProject[];
            /**
             * projects built from openFileRoots
             */
            readonly inferredProjects: InferredProject[];
            /**
             * projects specified by a tsconfig.json file
             */
            readonly configuredProjects: Map<ConfiguredProject>;
            /**
             * Open files: with value being project root path, and key being Path of the file that is open
             */
            readonly openFiles: Map<NormalizedPath | undefined>;
            /**
             * Map of open files that are opened without complete path but have projectRoot as current directory
             */
            private readonly openFilesWithNonRootedDiskPath;
            private compilerOptionsForInferredProjects;
            private compilerOptionsForInferredProjectsPerProjectRoot;
            private watchOptionsForInferredProjects;
            private watchOptionsForInferredProjectsPerProjectRoot;
            private typeAcquisitionForInferredProjects;
            private typeAcquisitionForInferredProjectsPerProjectRoot;
            /**
             * Project size for configured or external projects
             */
            private readonly projectToSizeMap;
            private readonly hostConfiguration;
            private safelist;
            private readonly legacySafelist;
            private pendingProjectUpdates;
            readonly currentDirectory: NormalizedPath;
            readonly toCanonicalFileName: (f: string) => string;
            readonly host: ServerHost;
            readonly logger: Logger;
            readonly cancellationToken: HostCancellationToken;
            readonly useSingleInferredProject: boolean;
            readonly useInferredProjectPerProjectRoot: boolean;
            readonly typingsInstaller: ITypingsInstaller;
            private readonly globalCacheLocationDirectoryPath;
            readonly throttleWaitMilliseconds?: number;
            private readonly eventHandler?;
            private readonly suppressDiagnosticEvents?;
            readonly globalPlugins: readonly string[];
            readonly pluginProbeLocations: readonly string[];
            readonly allowLocalPluginLoads: boolean;
            private currentPluginConfigOverrides;
            readonly typesMapLocation: string | undefined;
            /** @deprecated use serverMode instead */
            readonly syntaxOnly: boolean;
            readonly serverMode: LanguageServiceMode;
            /** Tracks projects that we have already sent telemetry for. */
            private readonly seenProjects;
            private performanceEventHandler?;
            private pendingPluginEnablements?;
            private currentPluginEnablementPromise?;
            constructor(opts: ProjectServiceOptions);
            toPath(fileName: string): Path;
            private loadTypesMap;
            updateTypingsForProject(response: SetTypings | InvalidateCachedTypings | PackageInstalledResponse): void;
            private delayUpdateProjectGraph;
            private delayUpdateProjectGraphs;
            setCompilerOptionsForInferredProjects(projectCompilerOptions: protocol.InferredProjectCompilerOptions, projectRootPath?: string): void;
            findProject(projectName: string): Project | undefined;
            getDefaultProjectForFile(fileName: NormalizedPath, ensureProject: boolean): Project | undefined;
            private doEnsureDefaultProjectForFile;
            getScriptInfoEnsuringProjectsUptoDate(uncheckedFileName: string): ScriptInfo | undefined;
            /**
             * Ensures the project structures are upto date
             * This means,
             * - we go through all the projects and update them if they are dirty
             * - if updates reflect some change in structure or there was pending request to ensure projects for open files
             *   ensure that each open script info has project
             */
            private ensureProjectStructuresUptoDate;
            getFormatCodeOptions(file: NormalizedPath): FormatCodeSettings;
            getPreferences(file: NormalizedPath): protocol.UserPreferences;
            getHostFormatCodeOptions(): FormatCodeSettings;
            getHostPreferences(): protocol.UserPreferences;
            private onSourceFileChanged;
            private handleSourceMapProjects;
            private delayUpdateSourceInfoProjects;
            private delayUpdateProjectsOfScriptInfoPath;
            private handleDeletedFile;
            private removeProject;
            private assignOrphanScriptInfosToInferredProject;
            /**
             * Remove this file from the set of open, non-configured files.
             * @param info The file that has been closed or newly configured
             */
            private closeOpenFile;
            private deleteScriptInfo;
            private configFileExists;
            /**
             * Returns true if the configFileExistenceInfo is needed/impacted by open files that are root of inferred project
             */
            private configFileExistenceImpactsRootOfInferredProject;
            /**
             * This is called on file close, so that we stop watching the config file for this script info
             */
            private stopWatchingConfigFilesForClosedScriptInfo;
            /**
             * This function tries to search for a tsconfig.json for the given file.
             * This is different from the method the compiler uses because
             * the compiler can assume it will always start searching in the
             * current directory (the directory in which tsc was invoked).
             * The server must start searching from the directory containing
             * the newly opened file.
             */
            private forEachConfigFileLocation;
            /**
             * This function tries to search for a tsconfig.json for the given file.
             * This is different from the method the compiler uses because
             * the compiler can assume it will always start searching in the
             * current directory (the directory in which tsc was invoked).
             * The server must start searching from the directory containing
             * the newly opened file.
             * If script info is passed in, it is asserted to be open script info
             * otherwise just file name
             */
            private getConfigFileNameForFile;
            private printProjects;
            private getConfiguredProjectByCanonicalConfigFilePath;
            private findExternalProjectByProjectName;
            /** Get a filename if the language service exceeds the maximum allowed program size; otherwise returns undefined. */
            private getFilenameForExceededTotalSizeLimitForNonTsFiles;
            private createExternalProject;
            private addFilesToNonInferredProject;
            private updateNonInferredProjectFiles;
            private updateRootAndOptionsOfNonInferredProject;
            private sendConfigFileDiagEvent;
            private getOrCreateInferredProjectForProjectRootPathIfEnabled;
            private getOrCreateSingleInferredProjectIfEnabled;
            private getOrCreateSingleInferredWithoutProjectRoot;
            private createInferredProject;
            getScriptInfo(uncheckedFileName: string): ScriptInfo | undefined;
            private watchClosedScriptInfo;
            private createNodeModulesWatcher;
            private watchClosedScriptInfoInNodeModules;
            private getModifiedTime;
            private refreshScriptInfo;
            private refreshScriptInfosInDirectory;
            private stopWatchingScriptInfo;
            private getOrCreateScriptInfoNotOpenedByClientForNormalizedPath;
            private getOrCreateScriptInfoOpenedByClientForNormalizedPath;
            getOrCreateScriptInfoForNormalizedPath(fileName: NormalizedPath, openedByClient: boolean, fileContent?: string, scriptKind?: ScriptKind, hasMixedContent?: boolean, hostToQueryFileExistsOn?: {
                fileExists(path: string): boolean;
            }): ScriptInfo | undefined;
            private getOrCreateScriptInfoWorker;
            /**
             * This gets the script info for the normalized path. If the path is not rooted disk path then the open script info with project root context is preferred
             */
            getScriptInfoForNormalizedPath(fileName: NormalizedPath): ScriptInfo | undefined;
            getScriptInfoForPath(fileName: Path): ScriptInfo | undefined;
            private addSourceInfoToSourceMap;
            private addMissingSourceMapFile;
            setHostConfiguration(args: protocol.ConfigureRequestArguments): void;
            closeLog(): void;
            /**
             * This function rebuilds the project for every file opened by the client
             * This does not reload contents of open files from disk. But we could do that if needed
             */
            reloadProjects(): void;
            /**
             * This function goes through all the openFiles and tries to file the config file for them.
             * If the config file is found and it refers to existing project, it reloads it either immediately
             * or schedules it for reload depending on delayReload option
             * If there is no existing project it just opens the configured project for the config file
             * reloadForInfo provides a way to filter out files to reload configured project for
             */
            private reloadConfiguredProjectForFiles;
            /**
             * Remove the root of inferred project if script info is part of another project
             */
            private removeRootOfInferredProjectIfNowPartOfOtherProject;
            /**
             * This function is to update the project structure for every inferred project.
             * It is called on the premise that all the configured projects are
             * up to date.
             * This will go through open files and assign them to inferred project if open file is not part of any other project
             * After that all the inferred project graphs are updated
             */
            private ensureProjectForOpenFiles;
            /**
             * Open file whose contents is managed by the client
             * @param filename is absolute pathname
             * @param fileContent is a known version of the file content that is more up to date than the one on disk
             */
            openClientFile(fileName: string, fileContent?: string, scriptKind?: ScriptKind, projectRootPath?: string): OpenConfiguredProjectResult;
            private findExternalProjectContainingOpenScriptInfo;
            private getOrCreateOpenScriptInfo;
            private assignProjectToOpenedScriptInfo;
            private createAncestorProjects;
            private ensureProjectChildren;
            private cleanupAfterOpeningFile;
            openClientFileWithNormalizedPath(fileName: NormalizedPath, fileContent?: string, scriptKind?: ScriptKind, hasMixedContent?: boolean, projectRootPath?: NormalizedPath): OpenConfiguredProjectResult;
            private removeOrphanConfiguredProjects;
            private removeOrphanScriptInfos;
            private telemetryOnOpenFile;
            /**
             * Close file whose contents is managed by the client
             * @param filename is absolute pathname
             */
            closeClientFile(uncheckedFileName: string): void;
            private collectChanges;
            private closeConfiguredProjectReferencedFromExternalProject;
            closeExternalProject(uncheckedFileName: string): void;
            openExternalProjects(projects: protocol.ExternalProject[]): void;
            /** Makes a filename safe to insert in a RegExp */
            private static readonly filenameEscapeRegexp;
            private static escapeFilenameForRegex;
            resetSafeList(): void;
            applySafeList(proj: protocol.ExternalProject): NormalizedPath[];
            openExternalProject(proj: protocol.ExternalProject): void;
            hasDeferredExtension(): boolean;
            private enableRequestedPluginsAsync;
            private enableRequestedPluginsWorker;
            private enableRequestedPluginsForProjectAsync;
            configurePlugin(args: protocol.ConfigurePluginRequestArguments): void;
        }
        function formatMessage<T extends protocol.Message>(msg: T, logger: Logger, byteLength: (s: string, encoding: string) => number, newLine: string): string;
        interface ServerCancellationToken extends HostCancellationToken {
            setRequest(requestId: number): void;
            resetRequest(requestId: number): void;
        }
        const nullCancellationToken: ServerCancellationToken;
        interface PendingErrorCheck {
            fileName: NormalizedPath;
            project: Project;
        }
        type CommandNames = protocol.CommandTypes;
        const CommandNames: any;
        type Event = <T extends object>(body: T, eventName: string) => void;
        interface EventSender {
            event: Event;
        }
        interface SessionOptions {
            host: ServerHost;
            cancellationToken: ServerCancellationToken;
            useSingleInferredProject: boolean;
            useInferredProjectPerProjectRoot: boolean;
            typingsInstaller: ITypingsInstaller;
            byteLength: (buf: string, encoding?: string) => number;
            hrtime: (start?: number[]) => number[];
            logger: Logger;
            /**
             * If falsy, all events are suppressed.
             */
            canUseEvents: boolean;
            eventHandler?: ProjectServiceEventHandler;
            /** Has no effect if eventHandler is also specified. */
            suppressDiagnosticEvents?: boolean;
            /** @deprecated use serverMode instead */
            syntaxOnly?: boolean;
            serverMode?: LanguageServiceMode;
            throttleWaitMilliseconds?: number;
            noGetErrOnBackgroundUpdate?: boolean;
            globalPlugins?: readonly string[];
            pluginProbeLocations?: readonly string[];
            allowLocalPluginLoads?: boolean;
            typesMapLocation?: string;
        }
        class Session<TMessage = string> implements EventSender {
            private readonly gcTimer;
            protected projectService: ProjectService;
            private changeSeq;
            private performanceData;
            private currentRequestId;
            private errorCheck;
            protected host: ServerHost;
            private readonly cancellationToken;
            protected readonly typingsInstaller: ITypingsInstaller;
            protected byteLength: (buf: string, encoding?: string) => number;
            private hrtime;
            protected logger: Logger;
            protected canUseEvents: boolean;
            private suppressDiagnosticEvents?;
            private eventHandler;
            private readonly noGetErrOnBackgroundUpdate?;
            constructor(opts: SessionOptions);
            private sendRequestCompletedEvent;
            private addPerformanceData;
            private performanceEventHandler;
            private defaultEventHandler;
            private projectsUpdatedInBackgroundEvent;
            logError(err: Error, cmd: string): void;
            private logErrorWorker;
            send(msg: protocol.Message): void;
            protected writeMessage(msg: protocol.Message): void;
            event<T extends object>(body: T, eventName: string): void;
            /** @deprecated */
            output(info: any, cmdName: string, reqSeq?: number, errorMsg?: string): void;
            private doOutput;
            private semanticCheck;
            private syntacticCheck;
            private suggestionCheck;
            private sendDiagnosticsEvent;
            /** It is the caller's responsibility to verify that `!this.suppressDiagnosticEvents`. */
            private updateErrorCheck;
            private cleanProjects;
            private cleanup;
            private getEncodedSyntacticClassifications;
            private getEncodedSemanticClassifications;
            private getProject;
            private getConfigFileAndProject;
            private getConfigFileDiagnostics;
            private convertToDiagnosticsWithLinePositionFromDiagnosticFile;
            private getCompilerOptionsDiagnostics;
            private convertToDiagnosticsWithLinePosition;
            private getDiagnosticsWorker;
            private getDefinition;
            private mapDefinitionInfoLocations;
            private getDefinitionAndBoundSpan;
            private findSourceDefinition;
            private getEmitOutput;
            private mapJSDocTagInfo;
            private mapDisplayParts;
            private mapSignatureHelpItems;
            private mapDefinitionInfo;
            private static mapToOriginalLocation;
            private toFileSpan;
            private toFileSpanWithContext;
            private getTypeDefinition;
            private mapImplementationLocations;
            private getImplementation;
            private getOccurrences;
            private getSyntacticDiagnosticsSync;
            private getSemanticDiagnosticsSync;
            private getSuggestionDiagnosticsSync;
            private getJsxClosingTag;
            private getDocumentHighlights;
            private provideInlayHints;
            private setCompilerOptionsForInferredProjects;
            private getProjectInfo;
            private getProjectInfoWorker;
            private getRenameInfo;
            private getProjects;
            private getDefaultProject;
            private getRenameLocations;
            private mapRenameInfo;
            private toSpanGroups;
            private getReferences;
            private getFileReferences;
            /**
             * @param fileName is the name of the file to be opened
             * @param fileContent is a version of the file content that is known to be more up to date than the one on disk
             */
            private openClientFile;
            private getPosition;
            private getPositionInFile;
            private getFileAndProject;
            private getFileAndLanguageServiceForSyntacticOperation;
            private getFileAndProjectWorker;
            private getOutliningSpans;
            private getTodoComments;
            private getDocCommentTemplate;
            private getSpanOfEnclosingComment;
            private getIndentation;
            private getBreakpointStatement;
            private getNameOrDottedNameSpan;
            private isValidBraceCompletion;
            private getQuickInfoWorker;
            private getFormattingEditsForRange;
            private getFormattingEditsForRangeFull;
            private getFormattingEditsForDocumentFull;
            private getFormattingEditsAfterKeystrokeFull;
            private getFormattingEditsAfterKeystroke;
            private getCompletions;
            private getCompletionEntryDetails;
            private getCompileOnSaveAffectedFileList;
            private emitFile;
            private getSignatureHelpItems;
            private toPendingErrorCheck;
            private getDiagnostics;
            private change;
            private reload;
            private saveToTmp;
            private closeClientFile;
            private mapLocationNavigationBarItems;
            private getNavigationBarItems;
            private toLocationNavigationTree;
            private getNavigationTree;
            private getNavigateToItems;
            private getFullNavigateToItems;
            private getSupportedCodeFixes;
            private isLocation;
            private extractPositionOrRange;
            private getRange;
            private getApplicableRefactors;
            private getEditsForRefactor;
            private organizeImports;
            private getEditsForFileRename;
            private getCodeFixes;
            private getCombinedCodeFix;
            private applyCodeActionCommand;
            private getStartAndEndPosition;
            private mapCodeAction;
            private mapCodeFixAction;
            private mapTextChangesToCodeEdits;
            private mapTextChangeToCodeEdit;
            private convertTextChangeToCodeEdit;
            private getBraceMatching;
            private getDiagnosticsForProject;
            private configurePlugin;
            private getSmartSelectionRange;
            private toggleLineComment;
            private toggleMultilineComment;
            private commentSelection;
            private uncommentSelection;
            private mapSelectionRange;
            private getScriptInfoFromProjectService;
            private toProtocolCallHierarchyItem;
            private toProtocolCallHierarchyIncomingCall;
            private toProtocolCallHierarchyOutgoingCall;
            private prepareCallHierarchy;
            private provideCallHierarchyIncomingCalls;
            private provideCallHierarchyOutgoingCalls;
            getCanonicalFileName(fileName: string): string;
            exit(): void;
            private notRequired;
            private requiredResponse;
            private handlers;
            addProtocolHandler(command: string, handler: (request: protocol.Request) => HandlerResponse): void;
            private setCurrentRequest;
            private resetCurrentRequest;
            executeWithRequestId<T>(requestId: number, f: () => T): T;
            executeCommand(request: protocol.Request): HandlerResponse;
            onMessage(message: TMessage): void;
            protected parseMessage(message: TMessage): protocol.Request;
            protected toStringMessage(message: TMessage): string;
            private getFormatOptions;
            private getPreferences;
            private getHostFormatOptions;
            private getHostPreferences;
        }
        interface HandlerResponse {
            response?: {};
            responseRequired?: boolean;
        }
    }
    const versionMajorMinor = "4.9";
    /** The version of the TypeScript compiler release */
    const version: string;
    /**
     * Type of objects whose values are all of the same type.
     * The `in` and `for-in` operators can *not* be safely used,
     * since `Object.prototype` may be modified by outside code.
     */
    interface MapLike<T> {
        [index: string]: T;
    }
    interface SortedReadonlyArray<T> extends ReadonlyArray<T> {
        " __sortedArrayBrand": any;
    }
    interface SortedArray<T> extends Array<T> {
        " __sortedArrayBrand": any;
    }
    /** Common read methods for ES6 Map/Set. */
    interface ReadonlyCollection<K> {
        readonly size: number;
        has(key: K): boolean;
        keys(): Iterator<K>;
    }
    /** Common write methods for ES6 Map/Set. */
    interface Collection<K> extends ReadonlyCollection<K> {
        delete(key: K): boolean;
        clear(): void;
    }
    /** ES6 Map interface, only read methods included. */
    interface ReadonlyESMap<K, V> extends ReadonlyCollection<K> {
        get(key: K): V | undefined;
        values(): Iterator<V>;
        entries(): Iterator<[
            K,
            V
        ]>;
        forEach(action: (value: V, key: K) => void): void;
    }
    /**
     * ES6 Map interface, only read methods included.
     */
    interface ReadonlyMap<T> extends ReadonlyESMap<string, T> {
    }
    /**
     * @deprecated Use `ts.ReadonlyESMap<K, V>` instead.
     */
    interface ReadonlyMap<T> extends ReadonlyESMap<string, T> {
    }
    /** ES6 Map interface. */
    interface ESMap<K, V> extends ReadonlyESMap<K, V>, Collection<K> {
        set(key: K, value: V): this;
    }
    /**
     * ES6 Map interface.
     */
    interface Map<T> extends ESMap<string, T> {
    }
    /**
     * @deprecated Use `ts.ESMap<K, V>` instead.
     */
    interface Map<T> extends ESMap<string, T> {
    }
    /** ES6 Set interface, only read methods included. */
    interface ReadonlySet<T> extends ReadonlyCollection<T> {
        has(value: T): boolean;
        values(): Iterator<T>;
        entries(): Iterator<[
            T,
            T
        ]>;
        forEach(action: (value: T, key: T) => void): void;
    }
    /** ES6 Set interface. */
    interface Set<T> extends ReadonlySet<T>, Collection<T> {
        add(value: T): this;
        delete(value: T): boolean;
    }
    /** ES6 Iterator type. */
    interface Iterator<T> {
        next(): {
            value: T;
            done?: false;
        } | {
            value: void;
            done: true;
        };
    }
    /** Array that is only intended to be pushed to, never read. */
    interface Push<T> {
        push(...values: T[]): void;
    }
    namespace PerformanceDotting {
        export enum AnalyzeMode {
            DEFAULT = 0,
            VERBOSE = 1,
            TRACE = 3
        }
        interface PerformanceData {
            startTime: number;
            endTime: number;
            duration: number;
            name: string;
            parentEvent: string;
            tier: number;
            fullPath: string;
            id: string;
            parentId: string;
            fileName: string;
        }
        export function setPerformanceSwitch(projectConfigPerf: AnalyzeMode): void;
        export function startAdvanced(eventName: string, fileName?: string): void;
        export function stopAdvanced(eventName: string): void;
        export function start(eventName: string, fileName?: string): void;
        export function stop(eventName: string): void;
        export function getEventData(): Array<PerformanceData>;
        export function clearEvent(): void;
        export {};
    }
    type Path = string & {
        __pathBrand: any;
    };
    interface TextRange {
        pos: number;
        end: number;
    }
    interface ReadonlyTextRange {
        readonly pos: number;
        readonly end: number;
    }
    enum SyntaxKind {
        Unknown = 0,
        EndOfFileToken = 1,
        SingleLineCommentTrivia = 2,
        MultiLineCommentTrivia = 3,
        NewLineTrivia = 4,
        WhitespaceTrivia = 5,
        ShebangTrivia = 6,
        ConflictMarkerTrivia = 7,
        NumericLiteral = 8,
        BigIntLiteral = 9,
        StringLiteral = 10,
        JsxText = 11,
        JsxTextAllWhiteSpaces = 12,
        RegularExpressionLiteral = 13,
        NoSubstitutionTemplateLiteral = 14,
        TemplateHead = 15,
        TemplateMiddle = 16,
        TemplateTail = 17,
        OpenBraceToken = 18,
        CloseBraceToken = 19,
        OpenParenToken = 20,
        CloseParenToken = 21,
        OpenBracketToken = 22,
        CloseBracketToken = 23,
        DotToken = 24,
        DotDotDotToken = 25,
        SemicolonToken = 26,
        CommaToken = 27,
        QuestionDotToken = 28,
        LessThanToken = 29,
        LessThanSlashToken = 30,
        GreaterThanToken = 31,
        LessThanEqualsToken = 32,
        GreaterThanEqualsToken = 33,
        EqualsEqualsToken = 34,
        ExclamationEqualsToken = 35,
        EqualsEqualsEqualsToken = 36,
        ExclamationEqualsEqualsToken = 37,
        EqualsGreaterThanToken = 38,
        PlusToken = 39,
        MinusToken = 40,
        AsteriskToken = 41,
        AsteriskAsteriskToken = 42,
        SlashToken = 43,
        PercentToken = 44,
        PlusPlusToken = 45,
        MinusMinusToken = 46,
        LessThanLessThanToken = 47,
        GreaterThanGreaterThanToken = 48,
        GreaterThanGreaterThanGreaterThanToken = 49,
        AmpersandToken = 50,
        BarToken = 51,
        CaretToken = 52,
        ExclamationToken = 53,
        TildeToken = 54,
        AmpersandAmpersandToken = 55,
        BarBarToken = 56,
        QuestionToken = 57,
        ColonToken = 58,
        AtToken = 59,
        QuestionQuestionToken = 60,
        /** Only the JSDoc scanner produces BacktickToken. The normal scanner produces NoSubstitutionTemplateLiteral and related kinds. */
        BacktickToken = 61,
        /** Only the JSDoc scanner produces HashToken. The normal scanner produces PrivateIdentifier. */
        HashToken = 62,
        EqualsToken = 63,
        PlusEqualsToken = 64,
        MinusEqualsToken = 65,
        AsteriskEqualsToken = 66,
        AsteriskAsteriskEqualsToken = 67,
        SlashEqualsToken = 68,
        PercentEqualsToken = 69,
        LessThanLessThanEqualsToken = 70,
        GreaterThanGreaterThanEqualsToken = 71,
        GreaterThanGreaterThanGreaterThanEqualsToken = 72,
        AmpersandEqualsToken = 73,
        BarEqualsToken = 74,
        BarBarEqualsToken = 75,
        AmpersandAmpersandEqualsToken = 76,
        QuestionQuestionEqualsToken = 77,
        CaretEqualsToken = 78,
        Identifier = 79,
        PrivateIdentifier = 80,
        BreakKeyword = 81,
        CaseKeyword = 82,
        CatchKeyword = 83,
        ClassKeyword = 84,
        StructKeyword = 85,
        ConstKeyword = 86,
        ContinueKeyword = 87,
        DebuggerKeyword = 88,
        DefaultKeyword = 89,
        DeleteKeyword = 90,
        DoKeyword = 91,
        ElseKeyword = 92,
        EnumKeyword = 93,
        ExportKeyword = 94,
        ExtendsKeyword = 95,
        FalseKeyword = 96,
        FinallyKeyword = 97,
        ForKeyword = 98,
        FunctionKeyword = 99,
        IfKeyword = 100,
        ImportKeyword = 101,
        InKeyword = 102,
        InstanceOfKeyword = 103,
        NewKeyword = 104,
        NullKeyword = 105,
        ReturnKeyword = 106,
        SuperKeyword = 107,
        SwitchKeyword = 108,
        ThisKeyword = 109,
        ThrowKeyword = 110,
        TrueKeyword = 111,
        TryKeyword = 112,
        TypeOfKeyword = 113,
        VarKeyword = 114,
        VoidKeyword = 115,
        WhileKeyword = 116,
        WithKeyword = 117,
        ImplementsKeyword = 118,
        InterfaceKeyword = 119,
        LetKeyword = 120,
        PackageKeyword = 121,
        PrivateKeyword = 122,
        ProtectedKeyword = 123,
        PublicKeyword = 124,
        StaticKeyword = 125,
        YieldKeyword = 126,
        AbstractKeyword = 127,
        AccessorKeyword = 128,
        AsKeyword = 129,
        AssertsKeyword = 130,
        AssertKeyword = 131,
        AnyKeyword = 132,
        AsyncKeyword = 133,
        AwaitKeyword = 134,
        BooleanKeyword = 135,
        ConstructorKeyword = 136,
        DeclareKeyword = 137,
        GetKeyword = 138,
        InferKeyword = 139,
        IntrinsicKeyword = 140,
        IsKeyword = 141,
        KeyOfKeyword = 142,
        ModuleKeyword = 143,
        NamespaceKeyword = 144,
        NeverKeyword = 145,
        OutKeyword = 146,
        ReadonlyKeyword = 147,
        RequireKeyword = 148,
        NumberKeyword = 149,
        ObjectKeyword = 150,
        SatisfiesKeyword = 151,
        SetKeyword = 152,
        StringKeyword = 153,
        SymbolKeyword = 154,
        TypeKeyword = 155,
        LazyKeyword = 156,
        UndefinedKeyword = 157,
        UniqueKeyword = 158,
        UnknownKeyword = 159,
        FromKeyword = 160,
        GlobalKeyword = 161,
        BigIntKeyword = 162,
        OverrideKeyword = 163,
        OfKeyword = 164,
        QualifiedName = 165,
        ComputedPropertyName = 166,
        TypeParameter = 167,
        Parameter = 168,
        Decorator = 169,
        PropertySignature = 170,
        PropertyDeclaration = 171,
        AnnotationPropertyDeclaration = 172,
        MethodSignature = 173,
        MethodDeclaration = 174,
        ClassStaticBlockDeclaration = 175,
        Constructor = 176,
        GetAccessor = 177,
        SetAccessor = 178,
        CallSignature = 179,
        ConstructSignature = 180,
        IndexSignature = 181,
        TypePredicate = 182,
        TypeReference = 183,
        FunctionType = 184,
        ConstructorType = 185,
        TypeQuery = 186,
        TypeLiteral = 187,
        ArrayType = 188,
        TupleType = 189,
        OptionalType = 190,
        RestType = 191,
        UnionType = 192,
        IntersectionType = 193,
        ConditionalType = 194,
        InferType = 195,
        ParenthesizedType = 196,
        ThisType = 197,
        TypeOperator = 198,
        IndexedAccessType = 199,
        MappedType = 200,
        LiteralType = 201,
        NamedTupleMember = 202,
        TemplateLiteralType = 203,
        TemplateLiteralTypeSpan = 204,
        ImportType = 205,
        ObjectBindingPattern = 206,
        ArrayBindingPattern = 207,
        BindingElement = 208,
        ArrayLiteralExpression = 209,
        ObjectLiteralExpression = 210,
        PropertyAccessExpression = 211,
        ElementAccessExpression = 212,
        CallExpression = 213,
        NewExpression = 214,
        TaggedTemplateExpression = 215,
        TypeAssertionExpression = 216,
        ParenthesizedExpression = 217,
        FunctionExpression = 218,
        ArrowFunction = 219,
        EtsComponentExpression = 220,
        DeleteExpression = 221,
        TypeOfExpression = 222,
        VoidExpression = 223,
        AwaitExpression = 224,
        PrefixUnaryExpression = 225,
        PostfixUnaryExpression = 226,
        BinaryExpression = 227,
        ConditionalExpression = 228,
        TemplateExpression = 229,
        YieldExpression = 230,
        SpreadElement = 231,
        ClassExpression = 232,
        OmittedExpression = 233,
        ExpressionWithTypeArguments = 234,
        AsExpression = 235,
        NonNullExpression = 236,
        MetaProperty = 237,
        SyntheticExpression = 238,
        SatisfiesExpression = 239,
        TemplateSpan = 240,
        SemicolonClassElement = 241,
        Block = 242,
        EmptyStatement = 243,
        VariableStatement = 244,
        ExpressionStatement = 245,
        IfStatement = 246,
        DoStatement = 247,
        WhileStatement = 248,
        ForStatement = 249,
        ForInStatement = 250,
        ForOfStatement = 251,
        ContinueStatement = 252,
        BreakStatement = 253,
        ReturnStatement = 254,
        WithStatement = 255,
        SwitchStatement = 256,
        LabeledStatement = 257,
        ThrowStatement = 258,
        TryStatement = 259,
        DebuggerStatement = 260,
        VariableDeclaration = 261,
        VariableDeclarationList = 262,
        FunctionDeclaration = 263,
        ClassDeclaration = 264,
        StructDeclaration = 265,
        AnnotationDeclaration = 266,
        InterfaceDeclaration = 267,
        TypeAliasDeclaration = 268,
        EnumDeclaration = 269,
        ModuleDeclaration = 270,
        ModuleBlock = 271,
        CaseBlock = 272,
        NamespaceExportDeclaration = 273,
        ImportEqualsDeclaration = 274,
        ImportDeclaration = 275,
        ImportClause = 276,
        NamespaceImport = 277,
        NamedImports = 278,
        ImportSpecifier = 279,
        ExportAssignment = 280,
        ExportDeclaration = 281,
        NamedExports = 282,
        NamespaceExport = 283,
        ExportSpecifier = 284,
        MissingDeclaration = 285,
        ExternalModuleReference = 286,
        JsxElement = 287,
        JsxSelfClosingElement = 288,
        JsxOpeningElement = 289,
        JsxClosingElement = 290,
        JsxFragment = 291,
        JsxOpeningFragment = 292,
        JsxClosingFragment = 293,
        JsxAttribute = 294,
        JsxAttributes = 295,
        JsxSpreadAttribute = 296,
        JsxExpression = 297,
        CaseClause = 298,
        DefaultClause = 299,
        HeritageClause = 300,
        CatchClause = 301,
        AssertClause = 302,
        AssertEntry = 303,
        ImportTypeAssertionContainer = 304,
        PropertyAssignment = 305,
        ShorthandPropertyAssignment = 306,
        SpreadAssignment = 307,
        EnumMember = 308,
        UnparsedPrologue = 309,
        UnparsedPrepend = 310,
        UnparsedText = 311,
        UnparsedInternalText = 312,
        UnparsedSyntheticReference = 313,
        SourceFile = 314,
        Bundle = 315,
        UnparsedSource = 316,
        InputFiles = 317,
        JSDocTypeExpression = 318,
        JSDocNameReference = 319,
        JSDocMemberName = 320,
        JSDocAllType = 321,
        JSDocUnknownType = 322,
        JSDocNullableType = 323,
        JSDocNonNullableType = 324,
        JSDocOptionalType = 325,
        JSDocFunctionType = 326,
        JSDocVariadicType = 327,
        JSDocNamepathType = 328,
        JSDoc = 329,
        /** @deprecated Use SyntaxKind.JSDoc */
        JSDocComment = 329,
        JSDocText = 330,
        JSDocTypeLiteral = 331,
        JSDocSignature = 332,
        JSDocLink = 333,
        JSDocLinkCode = 334,
        JSDocLinkPlain = 335,
        JSDocTag = 336,
        JSDocAugmentsTag = 337,
        JSDocImplementsTag = 338,
        JSDocAuthorTag = 339,
        JSDocDeprecatedTag = 340,
        JSDocClassTag = 341,
        JSDocPublicTag = 342,
        JSDocPrivateTag = 343,
        JSDocProtectedTag = 344,
        JSDocReadonlyTag = 345,
        JSDocOverrideTag = 346,
        JSDocCallbackTag = 347,
        JSDocEnumTag = 348,
        JSDocParameterTag = 349,
        JSDocReturnTag = 350,
        JSDocThisTag = 351,
        JSDocTypeTag = 352,
        JSDocTemplateTag = 353,
        JSDocTypedefTag = 354,
        JSDocSeeTag = 355,
        JSDocPropertyTag = 356,
        SyntaxList = 357,
        NotEmittedStatement = 358,
        PartiallyEmittedExpression = 359,
        CommaListExpression = 360,
        MergeDeclarationMarker = 361,
        EndOfDeclarationMarker = 362,
        SyntheticReferenceExpression = 363,
        Count = 364,
        FirstAssignment = 63,
        LastAssignment = 78,
        FirstCompoundAssignment = 64,
        LastCompoundAssignment = 78,
        FirstReservedWord = 81,
        LastReservedWord = 117,
        FirstKeyword = 81,
        LastKeyword = 164,
        FirstFutureReservedWord = 118,
        LastFutureReservedWord = 126,
        FirstTypeNode = 182,
        LastTypeNode = 205,
        FirstPunctuation = 18,
        LastPunctuation = 78,
        FirstToken = 0,
        LastToken = 164,
        FirstTriviaToken = 2,
        LastTriviaToken = 7,
        FirstLiteralToken = 8,
        LastLiteralToken = 14,
        FirstTemplateToken = 14,
        LastTemplateToken = 17,
        FirstBinaryOperator = 29,
        LastBinaryOperator = 78,
        FirstStatement = 244,
        LastStatement = 260,
        FirstNode = 165,
        FirstJSDocNode = 318,
        LastJSDocNode = 356,
        FirstJSDocTagNode = 336,
        LastJSDocTagNode = 356
    }
    type TriviaSyntaxKind = SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia | SyntaxKind.NewLineTrivia | SyntaxKind.WhitespaceTrivia | SyntaxKind.ShebangTrivia | SyntaxKind.ConflictMarkerTrivia;
    type LiteralSyntaxKind = SyntaxKind.NumericLiteral | SyntaxKind.BigIntLiteral | SyntaxKind.StringLiteral | SyntaxKind.JsxText | SyntaxKind.JsxTextAllWhiteSpaces | SyntaxKind.RegularExpressionLiteral | SyntaxKind.NoSubstitutionTemplateLiteral;
    type PseudoLiteralSyntaxKind = SyntaxKind.TemplateHead | SyntaxKind.TemplateMiddle | SyntaxKind.TemplateTail;
    type PunctuationSyntaxKind = SyntaxKind.OpenBraceToken | SyntaxKind.CloseBraceToken | SyntaxKind.OpenParenToken | SyntaxKind.CloseParenToken | SyntaxKind.OpenBracketToken | SyntaxKind.CloseBracketToken | SyntaxKind.DotToken | SyntaxKind.DotDotDotToken | SyntaxKind.SemicolonToken | SyntaxKind.CommaToken | SyntaxKind.QuestionDotToken | SyntaxKind.LessThanToken | SyntaxKind.LessThanSlashToken | SyntaxKind.GreaterThanToken | SyntaxKind.LessThanEqualsToken | SyntaxKind.GreaterThanEqualsToken | SyntaxKind.EqualsEqualsToken | SyntaxKind.ExclamationEqualsToken | SyntaxKind.EqualsEqualsEqualsToken | SyntaxKind.ExclamationEqualsEqualsToken | SyntaxKind.EqualsGreaterThanToken | SyntaxKind.PlusToken | SyntaxKind.MinusToken | SyntaxKind.AsteriskToken | SyntaxKind.AsteriskAsteriskToken | SyntaxKind.SlashToken | SyntaxKind.PercentToken | SyntaxKind.PlusPlusToken | SyntaxKind.MinusMinusToken | SyntaxKind.LessThanLessThanToken | SyntaxKind.GreaterThanGreaterThanToken | SyntaxKind.GreaterThanGreaterThanGreaterThanToken | SyntaxKind.AmpersandToken | SyntaxKind.BarToken | SyntaxKind.CaretToken | SyntaxKind.ExclamationToken | SyntaxKind.TildeToken | SyntaxKind.AmpersandAmpersandToken | SyntaxKind.BarBarToken | SyntaxKind.QuestionQuestionToken | SyntaxKind.QuestionToken | SyntaxKind.ColonToken | SyntaxKind.AtToken | SyntaxKind.BacktickToken | SyntaxKind.HashToken | SyntaxKind.EqualsToken | SyntaxKind.PlusEqualsToken | SyntaxKind.MinusEqualsToken | SyntaxKind.AsteriskEqualsToken | SyntaxKind.AsteriskAsteriskEqualsToken | SyntaxKind.SlashEqualsToken | SyntaxKind.PercentEqualsToken | SyntaxKind.LessThanLessThanEqualsToken | SyntaxKind.GreaterThanGreaterThanEqualsToken | SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken | SyntaxKind.AmpersandEqualsToken | SyntaxKind.BarEqualsToken | SyntaxKind.CaretEqualsToken;
    type KeywordSyntaxKind = SyntaxKind.AbstractKeyword | SyntaxKind.AccessorKeyword | SyntaxKind.AnyKeyword | SyntaxKind.AsKeyword | SyntaxKind.AssertsKeyword | SyntaxKind.AssertKeyword | SyntaxKind.AsyncKeyword | SyntaxKind.AwaitKeyword | SyntaxKind.BigIntKeyword | SyntaxKind.BooleanKeyword | SyntaxKind.BreakKeyword | SyntaxKind.CaseKeyword | SyntaxKind.CatchKeyword | SyntaxKind.ClassKeyword | SyntaxKind.StructKeyword | SyntaxKind.ConstKeyword | SyntaxKind.ConstructorKeyword | SyntaxKind.ContinueKeyword | SyntaxKind.DebuggerKeyword | SyntaxKind.DeclareKeyword | SyntaxKind.DefaultKeyword | SyntaxKind.DeleteKeyword | SyntaxKind.DoKeyword | SyntaxKind.ElseKeyword | SyntaxKind.EnumKeyword | SyntaxKind.ExportKeyword | SyntaxKind.ExtendsKeyword | SyntaxKind.FalseKeyword | SyntaxKind.FinallyKeyword | SyntaxKind.ForKeyword | SyntaxKind.FromKeyword | SyntaxKind.FunctionKeyword | SyntaxKind.GetKeyword | SyntaxKind.GlobalKeyword | SyntaxKind.IfKeyword | SyntaxKind.ImplementsKeyword | SyntaxKind.ImportKeyword | SyntaxKind.InferKeyword | SyntaxKind.InKeyword | SyntaxKind.InstanceOfKeyword | SyntaxKind.InterfaceKeyword | SyntaxKind.IntrinsicKeyword | SyntaxKind.IsKeyword | SyntaxKind.KeyOfKeyword | SyntaxKind.LetKeyword | SyntaxKind.ModuleKeyword | SyntaxKind.NamespaceKeyword | SyntaxKind.NeverKeyword | SyntaxKind.NewKeyword | SyntaxKind.NullKeyword | SyntaxKind.NumberKeyword | SyntaxKind.ObjectKeyword | SyntaxKind.OfKeyword | SyntaxKind.PackageKeyword | SyntaxKind.PrivateKeyword | SyntaxKind.ProtectedKeyword | SyntaxKind.PublicKeyword | SyntaxKind.ReadonlyKeyword | SyntaxKind.OutKeyword | SyntaxKind.OverrideKeyword | SyntaxKind.RequireKeyword | SyntaxKind.ReturnKeyword | SyntaxKind.SatisfiesKeyword | SyntaxKind.SetKeyword | SyntaxKind.StaticKeyword | SyntaxKind.StringKeyword | SyntaxKind.SuperKeyword | SyntaxKind.SwitchKeyword | SyntaxKind.SymbolKeyword | SyntaxKind.ThisKeyword | SyntaxKind.ThrowKeyword | SyntaxKind.TrueKeyword | SyntaxKind.TryKeyword | SyntaxKind.TypeKeyword | SyntaxKind.LazyKeyword | SyntaxKind.TypeOfKeyword | SyntaxKind.UndefinedKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.UnknownKeyword | SyntaxKind.VarKeyword | SyntaxKind.VoidKeyword | SyntaxKind.WhileKeyword | SyntaxKind.WithKeyword | SyntaxKind.YieldKeyword;
    type ModifierSyntaxKind = SyntaxKind.AbstractKeyword | SyntaxKind.AccessorKeyword | SyntaxKind.AsyncKeyword | SyntaxKind.ConstKeyword | SyntaxKind.DeclareKeyword | SyntaxKind.DefaultKeyword | SyntaxKind.ExportKeyword | SyntaxKind.InKeyword | SyntaxKind.PrivateKeyword | SyntaxKind.ProtectedKeyword | SyntaxKind.PublicKeyword | SyntaxKind.ReadonlyKeyword | SyntaxKind.OutKeyword | SyntaxKind.OverrideKeyword | SyntaxKind.StaticKeyword;
    type KeywordTypeSyntaxKind = SyntaxKind.AnyKeyword | SyntaxKind.BigIntKeyword | SyntaxKind.BooleanKeyword | SyntaxKind.IntrinsicKeyword | SyntaxKind.NeverKeyword | SyntaxKind.NumberKeyword | SyntaxKind.ObjectKeyword | SyntaxKind.StringKeyword | SyntaxKind.SymbolKeyword | SyntaxKind.UndefinedKeyword | SyntaxKind.UnknownKeyword | SyntaxKind.VoidKeyword;
    type TokenSyntaxKind = SyntaxKind.Unknown | SyntaxKind.EndOfFileToken | TriviaSyntaxKind | LiteralSyntaxKind | PseudoLiteralSyntaxKind | PunctuationSyntaxKind | SyntaxKind.Identifier | KeywordSyntaxKind;
    type JsxTokenSyntaxKind = SyntaxKind.LessThanSlashToken | SyntaxKind.EndOfFileToken | SyntaxKind.ConflictMarkerTrivia | SyntaxKind.JsxText | SyntaxKind.JsxTextAllWhiteSpaces | SyntaxKind.OpenBraceToken | SyntaxKind.LessThanToken;
    type JSDocSyntaxKind = SyntaxKind.EndOfFileToken | SyntaxKind.WhitespaceTrivia | SyntaxKind.AtToken | SyntaxKind.NewLineTrivia | SyntaxKind.AsteriskToken | SyntaxKind.OpenBraceToken | SyntaxKind.CloseBraceToken | SyntaxKind.LessThanToken | SyntaxKind.GreaterThanToken | SyntaxKind.OpenBracketToken | SyntaxKind.CloseBracketToken | SyntaxKind.EqualsToken | SyntaxKind.CommaToken | SyntaxKind.DotToken | SyntaxKind.Identifier | SyntaxKind.BacktickToken | SyntaxKind.HashToken | SyntaxKind.Unknown | KeywordSyntaxKind;
    enum NodeFlags {
        None = 0,
        Let = 1,
        Const = 2,
        NestedNamespace = 4,
        Synthesized = 8,
        Namespace = 16,
        OptionalChain = 32,
        ExportContext = 64,
        ContainsThis = 128,
        HasImplicitReturn = 256,
        HasExplicitReturn = 512,
        GlobalAugmentation = 1024,
        HasAsyncFunctions = 2048,
        DisallowInContext = 4096,
        YieldContext = 8192,
        DecoratorContext = 16384,
        AwaitContext = 32768,
        DisallowConditionalTypesContext = 65536,
        ThisNodeHasError = 131072,
        JavaScriptFile = 262144,
        ThisNodeOrAnySubNodesHasError = 524288,
        HasAggregatedChildData = 1048576,
        JSDoc = 8388608,
        JsonFile = 67108864,
        EtsContext = 1073741824,
        BlockScoped = 3,
        ReachabilityCheckFlags = 768,
        ReachabilityAndEmitFlags = 2816,
        ContextFlags = 1124462592,
        TypeExcludesFlags = 40960
    }
    enum EtsFlags {
        None = 0,
        StructContext = 2,
        EtsExtendComponentsContext = 4,
        EtsStylesComponentsContext = 8,
        EtsBuildContext = 16,
        EtsBuilderContext = 32,
        EtsStateStylesContext = 64,
        EtsComponentsContext = 128,
        EtsNewExpressionContext = 256,
        UICallbackContext = 512,
        SyntaxComponentContext = 1024,
        SyntaxDataSourceContext = 2048,
        NoEtsComponentContext = 4096
    }
    enum ModifierFlags {
        None = 0,
        Export = 1,
        Ambient = 2,
        Public = 4,
        Private = 8,
        Protected = 16,
        Static = 32,
        Readonly = 64,
        Accessor = 128,
        Abstract = 256,
        Async = 512,
        Default = 1024,
        Const = 2048,
        HasComputedJSDocModifiers = 4096,
        Deprecated = 8192,
        Override = 16384,
        In = 32768,
        Out = 65536,
        Decorator = 131072,
        HasComputedFlags = 536870912,
        AccessibilityModifier = 28,
        ParameterPropertyModifier = 16476,
        NonPublicAccessibilityModifier = 24,
        TypeScriptModifier = 117086,
        ExportDefault = 1025,
        All = 258047,
        Modifier = 126975
    }
    enum JsxFlags {
        None = 0,
        /** An element from a named property of the JSX.IntrinsicElements interface */
        IntrinsicNamedElement = 1,
        /** An element inferred from the string index signature of the JSX.IntrinsicElements interface */
        IntrinsicIndexedElement = 2,
        IntrinsicElement = 3
    }
    interface Node extends ReadonlyTextRange {
        readonly kind: SyntaxKind;
        readonly flags: NodeFlags;
        readonly parent: Node;
        symbol: Symbol;
        locals?: SymbolTable;
        skipCheck?: boolean;
    }
    interface Node {
        getSourceFile(): SourceFile;
        getChildCount(sourceFile?: SourceFile): number;
        getChildAt(index: number, sourceFile?: SourceFile): Node;
        getChildren(sourceFile?: SourceFile): Node[];
        getStart(sourceFile?: SourceFile, includeJsDocComment?: boolean): number;
        getFullStart(): number;
        getEnd(): number;
        getWidth(sourceFile?: SourceFileLike): number;
        getFullWidth(): number;
        getLeadingTriviaWidth(sourceFile?: SourceFile): number;
        getFullText(sourceFile?: SourceFile): string;
        getText(sourceFile?: SourceFile): string;
        getFirstToken(sourceFile?: SourceFile): Node | undefined;
        getLastToken(sourceFile?: SourceFile): Node | undefined;
        forEachChild<T>(cbNode: (node: Node) => T | undefined, cbNodeArray?: (nodes: NodeArray<Node>) => T | undefined): T | undefined;
    }
    interface Node {
        /**
         * @deprecated `decorators` has been removed from `Node` and merged with `modifiers` on the `Node` subtypes that support them.
         * Use `ts.canHaveDecorators()` to test whether a `Node` can have decorators.
         * Use `ts.getDecorators()` to get the decorators of a `Node`.
         *
         * For example:
         * ```ts
         * const decorators = ts.canHaveDecorators(node) ? ts.getDecorators(node) : undefined;
         * ```
         */
        readonly decorators?: undefined;
        /**
         * @deprecated `modifiers` has been removed from `Node` and moved to the `Node` subtypes that support them.
         * Use `ts.canHaveModifiers()` to test whether a `Node` can have modifiers.
         * Use `ts.getModifiers()` to get the modifiers of a `Node`.
         *
         * For example:
         * ```ts
         * const modifiers = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined;
         * ```
         */
        readonly modifiers?: NodeArray<ModifierLike> | undefined;
    }
    interface JSDocContainer {
    }
    type HasJSDoc = ParameterDeclaration | CallSignatureDeclaration | ClassStaticBlockDeclaration | ConstructSignatureDeclaration | MethodSignature | PropertySignature | ArrowFunction | ParenthesizedExpression | SpreadAssignment | ShorthandPropertyAssignment | PropertyAssignment | FunctionExpression | EmptyStatement | DebuggerStatement | Block | VariableStatement | ExpressionStatement | IfStatement | DoStatement | WhileStatement | ForStatement | ForInStatement | ForOfStatement | BreakStatement | ContinueStatement | ReturnStatement | WithStatement | SwitchStatement | LabeledStatement | ThrowStatement | TryStatement | FunctionDeclaration | ConstructorDeclaration | MethodDeclaration | VariableDeclaration | PropertyDeclaration | AnnotationPropertyDeclaration | AnnotationDeclaration | AccessorDeclaration | ClassLikeDeclaration | InterfaceDeclaration | TypeAliasDeclaration | EnumMember | EnumDeclaration | ModuleDeclaration | ImportEqualsDeclaration | ImportDeclaration | NamespaceExportDeclaration | ExportAssignment | IndexSignatureDeclaration | FunctionTypeNode | ConstructorTypeNode | JSDocFunctionType | ExportDeclaration | NamedTupleMember | ExportSpecifier | CaseClause | EndOfFileToken;
    type HasType = SignatureDeclaration | VariableDeclaration | ParameterDeclaration | PropertySignature | PropertyDeclaration | AnnotationPropertyDeclaration | TypePredicateNode | ParenthesizedTypeNode | TypeOperatorNode | MappedTypeNode | AssertionExpression | TypeAliasDeclaration | JSDocTypeExpression | JSDocNonNullableType | JSDocNullableType | JSDocOptionalType | JSDocVariadicType;
    type HasTypeArguments = CallExpression | NewExpression | TaggedTemplateExpression | JsxOpeningElement | JsxSelfClosingElement;
    type HasInitializer = HasExpressionInitializer | ForStatement | ForInStatement | ForOfStatement | JsxAttribute;
    type HasExpressionInitializer = VariableDeclaration | ParameterDeclaration | BindingElement | PropertyDeclaration | AnnotationPropertyDeclaration | PropertyAssignment | EnumMember;
    type HasDecorators = ParameterDeclaration | PropertyDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ClassExpression | ClassDeclaration | StructDeclaration | FunctionDeclaration;
    type HasIllegalDecorators = PropertyAssignment | ShorthandPropertyAssignment | FunctionDeclaration | ConstructorDeclaration | IndexSignatureDeclaration | ClassStaticBlockDeclaration | MissingDeclaration | VariableStatement | InterfaceDeclaration | TypeAliasDeclaration | EnumDeclaration | ModuleDeclaration | ImportEqualsDeclaration | ImportDeclaration | NamespaceExportDeclaration | ExportDeclaration | ExportAssignment;
    type HasModifiers = TypeParameterDeclaration | ParameterDeclaration | ConstructorTypeNode | PropertySignature | PropertyDeclaration | MethodSignature | MethodDeclaration | ConstructorDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | IndexSignatureDeclaration | FunctionExpression | ArrowFunction | ClassExpression | VariableStatement | FunctionDeclaration | ClassDeclaration | StructDeclaration | AnnotationDeclaration | InterfaceDeclaration | TypeAliasDeclaration | EnumDeclaration | ModuleDeclaration | ImportEqualsDeclaration | ImportDeclaration | ExportAssignment | ExportDeclaration;
    interface NodeArray<T extends Node> extends ReadonlyArray<T>, ReadonlyTextRange {
        readonly hasTrailingComma: boolean;
    }
    interface Token<TKind extends SyntaxKind> extends Node {
        readonly kind: TKind;
    }
    type EndOfFileToken = Token<SyntaxKind.EndOfFileToken> & JSDocContainer;
    interface PunctuationToken<TKind extends PunctuationSyntaxKind> extends Token<TKind> {
    }
    type DotToken = PunctuationToken<SyntaxKind.DotToken>;
    type DotDotDotToken = PunctuationToken<SyntaxKind.DotDotDotToken>;
    type QuestionToken = PunctuationToken<SyntaxKind.QuestionToken>;
    type ExclamationToken = PunctuationToken<SyntaxKind.ExclamationToken>;
    type ColonToken = PunctuationToken<SyntaxKind.ColonToken>;
    type EqualsToken = PunctuationToken<SyntaxKind.EqualsToken>;
    type AsteriskToken = PunctuationToken<SyntaxKind.AsteriskToken>;
    type EqualsGreaterThanToken = PunctuationToken<SyntaxKind.EqualsGreaterThanToken>;
    type PlusToken = PunctuationToken<SyntaxKind.PlusToken>;
    type MinusToken = PunctuationToken<SyntaxKind.MinusToken>;
    type QuestionDotToken = PunctuationToken<SyntaxKind.QuestionDotToken>;
    interface KeywordToken<TKind extends KeywordSyntaxKind> extends Token<TKind> {
    }
    type AssertsKeyword = KeywordToken<SyntaxKind.AssertsKeyword>;
    type AssertKeyword = KeywordToken<SyntaxKind.AssertKeyword>;
    type AwaitKeyword = KeywordToken<SyntaxKind.AwaitKeyword>;
    /** @deprecated Use `AwaitKeyword` instead. */
    type AwaitKeywordToken = AwaitKeyword;
    /** @deprecated Use `AssertsKeyword` instead. */
    type AssertsToken = AssertsKeyword;
    interface ModifierToken<TKind extends ModifierSyntaxKind> extends KeywordToken<TKind> {
    }
    type AbstractKeyword = ModifierToken<SyntaxKind.AbstractKeyword>;
    type AccessorKeyword = ModifierToken<SyntaxKind.AccessorKeyword>;
    type AsyncKeyword = ModifierToken<SyntaxKind.AsyncKeyword>;
    type ConstKeyword = ModifierToken<SyntaxKind.ConstKeyword>;
    type DeclareKeyword = ModifierToken<SyntaxKind.DeclareKeyword>;
    type DefaultKeyword = ModifierToken<SyntaxKind.DefaultKeyword>;
    type ExportKeyword = ModifierToken<SyntaxKind.ExportKeyword>;
    type InKeyword = ModifierToken<SyntaxKind.InKeyword>;
    type PrivateKeyword = ModifierToken<SyntaxKind.PrivateKeyword>;
    type ProtectedKeyword = ModifierToken<SyntaxKind.ProtectedKeyword>;
    type PublicKeyword = ModifierToken<SyntaxKind.PublicKeyword>;
    type ReadonlyKeyword = ModifierToken<SyntaxKind.ReadonlyKeyword>;
    type OutKeyword = ModifierToken<SyntaxKind.OutKeyword>;
    type OverrideKeyword = ModifierToken<SyntaxKind.OverrideKeyword>;
    type StaticKeyword = ModifierToken<SyntaxKind.StaticKeyword>;
    /** @deprecated Use `ReadonlyKeyword` instead. */
    type ReadonlyToken = ReadonlyKeyword;
    type Modifier = AbstractKeyword | AccessorKeyword | AsyncKeyword | ConstKeyword | DeclareKeyword | DefaultKeyword | ExportKeyword | InKeyword | PrivateKeyword | ProtectedKeyword | PublicKeyword | OutKeyword | OverrideKeyword | ReadonlyKeyword | StaticKeyword;
    type ModifierLike = Modifier | Decorator;
    type AccessibilityModifier = PublicKeyword | PrivateKeyword | ProtectedKeyword;
    type ParameterPropertyModifier = AccessibilityModifier | ReadonlyKeyword;
    type ClassMemberModifier = AccessibilityModifier | ReadonlyKeyword | StaticKeyword | AccessorKeyword;
    type ModifiersArray = NodeArray<Modifier>;
    enum GeneratedIdentifierFlags {
        None = 0,
        ReservedInNestedScopes = 8,
        Optimistic = 16,
        FileLevel = 32,
        AllowNameSubstitution = 64
    }
    interface Identifier extends PrimaryExpression, Declaration {
        readonly kind: SyntaxKind.Identifier;
        /**
         * Prefer to use `id.unescapedText`. (Note: This is available only in services, not internally to the TypeScript compiler.)
         * Text of identifier, but if the identifier begins with two underscores, this will begin with three.
         */
        readonly escapedText: __String;
        readonly originalKeywordKind?: SyntaxKind;
        isInJSDocNamespace?: boolean;
    }
    interface Identifier {
        readonly text: string;
    }
    interface TransientIdentifier extends Identifier {
        resolvedSymbol: Symbol;
    }
    interface QualifiedName extends Node {
        readonly kind: SyntaxKind.QualifiedName;
        readonly left: EntityName;
        readonly right: Identifier;
    }
    type EntityName = Identifier | QualifiedName;
    type PropertyName = Identifier | StringLiteral | NumericLiteral | ComputedPropertyName | PrivateIdentifier;
    type MemberName = Identifier | PrivateIdentifier;
    type DeclarationName = Identifier | PrivateIdentifier | StringLiteralLike | NumericLiteral | ComputedPropertyName | ElementAccessExpression | BindingPattern | EntityNameExpression;
    interface Declaration extends Node {
        _declarationBrand: any;
    }
    interface NamedDeclaration extends Declaration {
        readonly name?: DeclarationName;
    }
    interface DeclarationStatement extends NamedDeclaration, Statement {
        readonly name?: Identifier | StringLiteral | NumericLiteral;
    }
    interface ComputedPropertyName extends Node {
        readonly kind: SyntaxKind.ComputedPropertyName;
        readonly parent: Declaration;
        readonly expression: Expression;
    }
    interface PrivateIdentifier extends PrimaryExpression {
        readonly kind: SyntaxKind.PrivateIdentifier;
        readonly escapedText: __String;
    }
    interface PrivateIdentifier {
        readonly text: string;
    }
    interface Decorator extends Node {
        readonly kind: SyntaxKind.Decorator;
        readonly parent: NamedDeclaration;
        readonly expression: LeftHandSideExpression;
        /** Refers to a annotation declaration (or undefined when decorator isn't annotation) */
        readonly annotationDeclaration?: AnnotationDeclaration;
    }
    type Annotation = Decorator;
    interface TypeParameterDeclaration extends NamedDeclaration {
        readonly kind: SyntaxKind.TypeParameter;
        readonly parent: DeclarationWithTypeParameterChildren | InferTypeNode;
        readonly modifiers?: NodeArray<Modifier>;
        readonly name: Identifier;
        /** Note: Consider calling `getEffectiveConstraintOfTypeParameter` */
        readonly constraint?: TypeNode;
        readonly default?: TypeNode;
        expression?: Expression;
    }
    interface SignatureDeclarationBase extends NamedDeclaration, JSDocContainer {
        readonly kind: SignatureDeclaration["kind"];
        readonly name?: PropertyName;
        readonly typeParameters?: NodeArray<TypeParameterDeclaration> | undefined;
        readonly parameters: NodeArray<ParameterDeclaration>;
        readonly type?: TypeNode | undefined;
    }
    type SignatureDeclaration = CallSignatureDeclaration | ConstructSignatureDeclaration | MethodSignature | IndexSignatureDeclaration | FunctionTypeNode | ConstructorTypeNode | JSDocFunctionType | FunctionDeclaration | MethodDeclaration | ConstructorDeclaration | AccessorDeclaration | FunctionExpression | ArrowFunction;
    interface CallSignatureDeclaration extends SignatureDeclarationBase, TypeElement {
        readonly kind: SyntaxKind.CallSignature;
    }
    interface ConstructSignatureDeclaration extends SignatureDeclarationBase, TypeElement {
        readonly kind: SyntaxKind.ConstructSignature;
    }
    type BindingName = Identifier | BindingPattern;
    interface VariableDeclaration extends NamedDeclaration, JSDocContainer {
        readonly kind: SyntaxKind.VariableDeclaration;
        readonly parent: VariableDeclarationList | CatchClause;
        readonly name: BindingName;
        readonly exclamationToken?: ExclamationToken;
        readonly type?: TypeNode;
        readonly initializer?: Expression;
    }
    interface VariableDeclarationList extends Node {
        readonly kind: SyntaxKind.VariableDeclarationList;
        readonly parent: VariableStatement | ForStatement | ForOfStatement | ForInStatement;
        readonly declarations: NodeArray<VariableDeclaration>;
    }
    interface ParameterDeclaration extends NamedDeclaration, JSDocContainer {
        readonly kind: SyntaxKind.Parameter;
        readonly parent: SignatureDeclaration;
        readonly modifiers?: NodeArray<ModifierLike>;
        readonly dotDotDotToken?: DotDotDotToken;
        readonly name: BindingName;
        readonly questionToken?: QuestionToken;
        readonly type?: TypeNode;
        readonly initializer?: Expression;
    }
    interface BindingElement extends NamedDeclaration {
        readonly kind: SyntaxKind.BindingElement;
        readonly parent: BindingPattern;
        readonly propertyName?: PropertyName;
        readonly dotDotDotToken?: DotDotDotToken;
        readonly name: BindingName;
        readonly initializer?: Expression;
    }
    interface PropertySignature extends TypeElement, JSDocContainer {
        readonly kind: SyntaxKind.PropertySignature;
        readonly modifiers?: NodeArray<Modifier>;
        readonly name: PropertyName;
        readonly questionToken?: QuestionToken;
        readonly type?: TypeNode;
    }
    interface PropertySignature {
        /** @deprecated A property signature cannot have an initializer */
        readonly initializer?: Expression | undefined;
    }
    interface PropertyDeclaration extends ClassElement, JSDocContainer {
        readonly kind: SyntaxKind.PropertyDeclaration;
        readonly parent: ClassLikeDeclaration;
        readonly modifiers?: NodeArray<ModifierLike>;
        readonly name: PropertyName;
        readonly questionToken?: QuestionToken;
        readonly exclamationToken?: ExclamationToken;
        readonly type?: TypeNode;
        readonly initializer?: Expression;
    }
    interface AnnotationPropertyDeclaration extends AnnotationElement, JSDocContainer {
        readonly kind: SyntaxKind.AnnotationPropertyDeclaration;
        readonly parent: AnnotationDeclaration;
        readonly name: PropertyName;
        readonly type?: TypeNode;
        readonly initializer?: Expression;
    }
    interface AutoAccessorPropertyDeclaration extends PropertyDeclaration {
        _autoAccessorBrand: any;
    }
    interface ObjectLiteralElement extends NamedDeclaration {
        _objectLiteralBrand: any;
        readonly name?: PropertyName;
    }
    /** Unlike ObjectLiteralElement, excludes JSXAttribute and JSXSpreadAttribute. */
    type ObjectLiteralElementLike = PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment | MethodDeclaration | AccessorDeclaration;
    interface PropertyAssignment extends ObjectLiteralElement, JSDocContainer {
        readonly kind: SyntaxKind.PropertyAssignment;
        readonly parent: ObjectLiteralExpression;
        readonly name: PropertyName;
        readonly initializer: Expression;
    }
    interface PropertyAssignment {
        /** @deprecated A property assignment cannot have a question token */
        readonly questionToken?: QuestionToken | undefined;
        /** @deprecated A property assignment cannot have an exclamation token */
        readonly exclamationToken?: ExclamationToken | undefined;
    }
    interface ShorthandPropertyAssignment extends ObjectLiteralElement, JSDocContainer {
        readonly kind: SyntaxKind.ShorthandPropertyAssignment;
        readonly parent: ObjectLiteralExpression;
        readonly name: Identifier;
        readonly equalsToken?: EqualsToken;
        readonly objectAssignmentInitializer?: Expression;
    }
    interface ShorthandPropertyAssignment {
        /** @deprecated A shorthand property assignment cannot have modifiers */
        readonly modifiers?: NodeArray<Modifier> | undefined;
        /** @deprecated A shorthand property assignment cannot have a question token */
        readonly questionToken?: QuestionToken | undefined;
        /** @deprecated A shorthand property assignment cannot have an exclamation token */
        readonly exclamationToken?: ExclamationToken | undefined;
    }
    interface SpreadAssignment extends ObjectLiteralElement, JSDocContainer {
        readonly kind: SyntaxKind.SpreadAssignment;
        readonly parent: ObjectLiteralExpression;
        readonly expression: Expression;
    }
    type VariableLikeDeclaration = VariableDeclaration | ParameterDeclaration | BindingElement | PropertyDeclaration | AnnotationPropertyDeclaration | PropertyAssignment | PropertySignature | JsxAttribute | ShorthandPropertyAssignment | EnumMember | JSDocPropertyTag | JSDocParameterTag;
    interface PropertyLikeDeclaration extends NamedDeclaration {
        readonly name: PropertyName;
    }
    interface ObjectBindingPattern extends Node {
        readonly kind: SyntaxKind.ObjectBindingPattern;
        readonly parent: VariableDeclaration | ParameterDeclaration | BindingElement;
        readonly elements: NodeArray<BindingElement>;
    }
    interface ArrayBindingPattern extends Node {
        readonly kind: SyntaxKind.ArrayBindingPattern;
        readonly parent: VariableDeclaration | ParameterDeclaration | BindingElement;
        readonly elements: NodeArray<ArrayBindingElement>;
    }
    type BindingPattern = ObjectBindingPattern | ArrayBindingPattern;
    type ArrayBindingElement = BindingElement | OmittedExpression;
    /**
     * Several node kinds share function-like features such as a signature,
     * a name, and a body. These nodes should extend FunctionLikeDeclarationBase.
     * Examples:
     * - FunctionDeclaration
     * - MethodDeclaration
     * - AccessorDeclaration
     */
    interface FunctionLikeDeclarationBase extends SignatureDeclarationBase {
        _functionLikeDeclarationBrand: any;
        readonly asteriskToken?: AsteriskToken | undefined;
        readonly questionToken?: QuestionToken | undefined;
        readonly exclamationToken?: ExclamationToken | undefined;
        readonly body?: Block | Expression | undefined;
    }
    type FunctionLikeDeclaration = FunctionDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ConstructorDeclaration | FunctionExpression | ArrowFunction;
    /** @deprecated Use SignatureDeclaration */
    type FunctionLike = SignatureDeclaration;
    interface FunctionDeclaration extends FunctionLikeDeclarationBase, DeclarationStatement {
        readonly kind: SyntaxKind.FunctionDeclaration;
        readonly modifiers?: NodeArray<Modifier>;
        readonly name?: Identifier;
        readonly body?: FunctionBody;
    }
    interface MethodSignature extends SignatureDeclarationBase, TypeElement {
        readonly kind: SyntaxKind.MethodSignature;
        readonly parent: ObjectTypeDeclaration;
        readonly modifiers?: NodeArray<Modifier>;
        readonly name: PropertyName;
    }
    interface MethodDeclaration extends FunctionLikeDeclarationBase, ClassElement, ObjectLiteralElement, JSDocContainer {
        readonly kind: SyntaxKind.MethodDeclaration;
        readonly parent: ClassLikeDeclaration | ObjectLiteralExpression;
        readonly modifiers?: NodeArray<ModifierLike> | undefined;
        readonly name: PropertyName;
        readonly body?: FunctionBody | undefined;
    }
    interface ConstructorDeclaration extends FunctionLikeDeclarationBase, ClassElement, JSDocContainer {
        readonly kind: SyntaxKind.Constructor;
        readonly parent: ClassLikeDeclaration;
        readonly modifiers?: NodeArray<Modifier> | undefined;
        readonly body?: FunctionBody | undefined;
    }
    /** For when we encounter a semicolon in a class declaration. ES6 allows these as class elements. */
    interface SemicolonClassElement extends ClassElement {
        readonly kind: SyntaxKind.SemicolonClassElement;
        readonly parent: ClassLikeDeclaration;
    }
    interface GetAccessorDeclaration extends FunctionLikeDeclarationBase, ClassElement, TypeElement, ObjectLiteralElement, JSDocContainer {
        readonly kind: SyntaxKind.GetAccessor;
        readonly parent: ClassLikeDeclaration | ObjectLiteralExpression | TypeLiteralNode | InterfaceDeclaration;
        readonly modifiers?: NodeArray<ModifierLike>;
        readonly name: PropertyName;
        readonly body?: FunctionBody;
    }
    interface SetAccessorDeclaration extends FunctionLikeDeclarationBase, ClassElement, TypeElement, ObjectLiteralElement, JSDocContainer {
        readonly kind: SyntaxKind.SetAccessor;
        readonly parent: ClassLikeDeclaration | ObjectLiteralExpression | TypeLiteralNode | InterfaceDeclaration;
        readonly modifiers?: NodeArray<ModifierLike>;
        readonly name: PropertyName;
        readonly body?: FunctionBody;
    }
    type AccessorDeclaration = GetAccessorDeclaration | SetAccessorDeclaration;
    interface IndexSignatureDeclaration extends SignatureDeclarationBase, ClassElement, TypeElement {
        readonly kind: SyntaxKind.IndexSignature;
        readonly parent: ObjectTypeDeclaration;
        readonly modifiers?: NodeArray<Modifier>;
        readonly type: TypeNode;
    }
    interface ClassStaticBlockDeclaration extends ClassElement, JSDocContainer {
        readonly kind: SyntaxKind.ClassStaticBlockDeclaration;
        readonly parent: ClassDeclaration | ClassExpression;
        readonly body: Block;
    }
    interface TypeNode extends Node {
        _typeNodeBrand: any;
    }
    interface KeywordTypeNode<TKind extends KeywordTypeSyntaxKind = KeywordTypeSyntaxKind> extends KeywordToken<TKind>, TypeNode {
        readonly kind: TKind;
    }
    interface ImportTypeAssertionContainer extends Node {
        readonly kind: SyntaxKind.ImportTypeAssertionContainer;
        readonly parent: ImportTypeNode;
        readonly assertClause: AssertClause;
        readonly multiLine?: boolean;
    }
    interface ImportTypeNode extends NodeWithTypeArguments {
        readonly kind: SyntaxKind.ImportType;
        readonly isTypeOf: boolean;
        readonly argument: TypeNode;
        readonly assertions?: ImportTypeAssertionContainer;
        readonly qualifier?: EntityName;
    }
    interface ThisTypeNode extends TypeNode {
        readonly kind: SyntaxKind.ThisType;
    }
    type FunctionOrConstructorTypeNode = FunctionTypeNode | ConstructorTypeNode;
    interface FunctionOrConstructorTypeNodeBase extends TypeNode, SignatureDeclarationBase {
        readonly kind: SyntaxKind.FunctionType | SyntaxKind.ConstructorType;
        readonly type: TypeNode;
    }
    interface FunctionTypeNode extends FunctionOrConstructorTypeNodeBase {
        readonly kind: SyntaxKind.FunctionType;
    }
    interface FunctionTypeNode {
        /** @deprecated A function type cannot have modifiers */
        readonly modifiers?: NodeArray<Modifier> | undefined;
    }
    interface ConstructorTypeNode extends FunctionOrConstructorTypeNodeBase {
        readonly kind: SyntaxKind.ConstructorType;
        readonly modifiers?: NodeArray<Modifier>;
    }
    interface NodeWithTypeArguments extends TypeNode {
        readonly typeArguments?: NodeArray<TypeNode>;
    }
    type TypeReferenceType = TypeReferenceNode | ExpressionWithTypeArguments;
    interface TypeReferenceNode extends NodeWithTypeArguments {
        readonly kind: SyntaxKind.TypeReference;
        readonly typeName: EntityName;
    }
    interface TypePredicateNode extends TypeNode {
        readonly kind: SyntaxKind.TypePredicate;
        readonly parent: SignatureDeclaration | JSDocTypeExpression;
        readonly assertsModifier?: AssertsKeyword;
        readonly parameterName: Identifier | ThisTypeNode;
        readonly type?: TypeNode;
    }
    interface TypeQueryNode extends NodeWithTypeArguments {
        readonly kind: SyntaxKind.TypeQuery;
        readonly exprName: EntityName;
    }
    interface TypeLiteralNode extends TypeNode, Declaration {
        readonly kind: SyntaxKind.TypeLiteral;
        readonly members: NodeArray<TypeElement>;
    }
    interface ArrayTypeNode extends TypeNode {
        readonly kind: SyntaxKind.ArrayType;
        readonly elementType: TypeNode;
    }
    interface TupleTypeNode extends TypeNode {
        readonly kind: SyntaxKind.TupleType;
        readonly elements: NodeArray<TypeNode | NamedTupleMember>;
    }
    interface NamedTupleMember extends TypeNode, JSDocContainer, Declaration {
        readonly kind: SyntaxKind.NamedTupleMember;
        readonly dotDotDotToken?: Token<SyntaxKind.DotDotDotToken>;
        readonly name: Identifier;
        readonly questionToken?: Token<SyntaxKind.QuestionToken>;
        readonly type: TypeNode;
    }
    interface OptionalTypeNode extends TypeNode {
        readonly kind: SyntaxKind.OptionalType;
        readonly type: TypeNode;
    }
    interface RestTypeNode extends TypeNode {
        readonly kind: SyntaxKind.RestType;
        readonly type: TypeNode;
    }
    type UnionOrIntersectionTypeNode = UnionTypeNode | IntersectionTypeNode;
    interface UnionTypeNode extends TypeNode {
        readonly kind: SyntaxKind.UnionType;
        readonly types: NodeArray<TypeNode>;
    }
    interface IntersectionTypeNode extends TypeNode {
        readonly kind: SyntaxKind.IntersectionType;
        readonly types: NodeArray<TypeNode>;
    }
    interface ConditionalTypeNode extends TypeNode {
        readonly kind: SyntaxKind.ConditionalType;
        readonly checkType: TypeNode;
        readonly extendsType: TypeNode;
        readonly trueType: TypeNode;
        readonly falseType: TypeNode;
    }
    interface InferTypeNode extends TypeNode {
        readonly kind: SyntaxKind.InferType;
        readonly typeParameter: TypeParameterDeclaration;
    }
    interface ParenthesizedTypeNode extends TypeNode {
        readonly kind: SyntaxKind.ParenthesizedType;
        readonly type: TypeNode;
    }
    interface TypeOperatorNode extends TypeNode {
        readonly kind: SyntaxKind.TypeOperator;
        readonly operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword;
        readonly type: TypeNode;
    }
    interface IndexedAccessTypeNode extends TypeNode {
        readonly kind: SyntaxKind.IndexedAccessType;
        readonly objectType: TypeNode;
        readonly indexType: TypeNode;
    }
    interface MappedTypeNode extends TypeNode, Declaration {
        readonly kind: SyntaxKind.MappedType;
        readonly readonlyToken?: ReadonlyKeyword | PlusToken | MinusToken;
        readonly typeParameter: TypeParameterDeclaration;
        readonly nameType?: TypeNode;
        readonly questionToken?: QuestionToken | PlusToken | MinusToken;
        readonly type?: TypeNode;
        /** Used only to produce grammar errors */
        readonly members?: NodeArray<TypeElement>;
    }
    interface LiteralTypeNode extends TypeNode {
        readonly kind: SyntaxKind.LiteralType;
        readonly literal: NullLiteral | BooleanLiteral | LiteralExpression | PrefixUnaryExpression;
    }
    interface StringLiteral extends LiteralExpression, Declaration {
        readonly kind: SyntaxKind.StringLiteral;
    }
    type StringLiteralLike = StringLiteral | NoSubstitutionTemplateLiteral;
    type PropertyNameLiteral = Identifier | StringLiteralLike | NumericLiteral;
    interface TemplateLiteralTypeNode extends TypeNode {
        kind: SyntaxKind.TemplateLiteralType;
        readonly head: TemplateHead;
        readonly templateSpans: NodeArray<TemplateLiteralTypeSpan>;
    }
    interface TemplateLiteralTypeSpan extends TypeNode {
        readonly kind: SyntaxKind.TemplateLiteralTypeSpan;
        readonly parent: TemplateLiteralTypeNode;
        readonly type: TypeNode;
        readonly literal: TemplateMiddle | TemplateTail;
    }
    interface Expression extends Node {
        _expressionBrand: any;
    }
    interface OmittedExpression extends Expression {
        readonly kind: SyntaxKind.OmittedExpression;
    }
    interface PartiallyEmittedExpression extends LeftHandSideExpression {
        readonly kind: SyntaxKind.PartiallyEmittedExpression;
        readonly expression: Expression;
    }
    interface UnaryExpression extends Expression {
        _unaryExpressionBrand: any;
    }
    /** Deprecated, please use UpdateExpression */
    type IncrementExpression = UpdateExpression;
    interface UpdateExpression extends UnaryExpression {
        _updateExpressionBrand: any;
    }
    type PrefixUnaryOperator = SyntaxKind.PlusPlusToken | SyntaxKind.MinusMinusToken | SyntaxKind.PlusToken | SyntaxKind.MinusToken | SyntaxKind.TildeToken | SyntaxKind.ExclamationToken;
    interface PrefixUnaryExpression extends UpdateExpression {
        readonly kind: SyntaxKind.PrefixUnaryExpression;
        readonly operator: PrefixUnaryOperator;
        readonly operand: UnaryExpression;
    }
    type PostfixUnaryOperator = SyntaxKind.PlusPlusToken | SyntaxKind.MinusMinusToken;
    interface PostfixUnaryExpression extends UpdateExpression {
        readonly kind: SyntaxKind.PostfixUnaryExpression;
        readonly operand: LeftHandSideExpression;
        readonly operator: PostfixUnaryOperator;
    }
    interface LeftHandSideExpression extends UpdateExpression {
        _leftHandSideExpressionBrand: any;
    }
    interface MemberExpression extends LeftHandSideExpression {
        _memberExpressionBrand: any;
    }
    interface PrimaryExpression extends MemberExpression {
        _primaryExpressionBrand: any;
    }
    interface NullLiteral extends PrimaryExpression {
        readonly kind: SyntaxKind.NullKeyword;
    }
    interface TrueLiteral extends PrimaryExpression {
        readonly kind: SyntaxKind.TrueKeyword;
    }
    interface FalseLiteral extends PrimaryExpression {
        readonly kind: SyntaxKind.FalseKeyword;
    }
    type BooleanLiteral = TrueLiteral | FalseLiteral;
    interface ThisExpression extends PrimaryExpression {
        readonly kind: SyntaxKind.ThisKeyword;
    }
    interface SuperExpression extends PrimaryExpression {
        readonly kind: SyntaxKind.SuperKeyword;
    }
    interface ImportExpression extends PrimaryExpression {
        readonly kind: SyntaxKind.ImportKeyword;
    }
    interface DeleteExpression extends UnaryExpression {
        readonly kind: SyntaxKind.DeleteExpression;
        readonly expression: UnaryExpression;
    }
    interface TypeOfExpression extends UnaryExpression {
        readonly kind: SyntaxKind.TypeOfExpression;
        readonly expression: UnaryExpression;
    }
    interface VoidExpression extends UnaryExpression {
        readonly kind: SyntaxKind.VoidExpression;
        readonly expression: UnaryExpression;
    }
    interface AwaitExpression extends UnaryExpression {
        readonly kind: SyntaxKind.AwaitExpression;
        readonly expression: UnaryExpression;
    }
    interface YieldExpression extends Expression {
        readonly kind: SyntaxKind.YieldExpression;
        readonly asteriskToken?: AsteriskToken;
        readonly expression?: Expression;
    }
    interface SyntheticExpression extends Expression {
        readonly kind: SyntaxKind.SyntheticExpression;
        readonly isSpread: boolean;
        readonly type: Type;
        readonly tupleNameSource?: ParameterDeclaration | NamedTupleMember;
    }
    type ExponentiationOperator = SyntaxKind.AsteriskAsteriskToken;
    type MultiplicativeOperator = SyntaxKind.AsteriskToken | SyntaxKind.SlashToken | SyntaxKind.PercentToken;
    type MultiplicativeOperatorOrHigher = ExponentiationOperator | MultiplicativeOperator;
    type AdditiveOperator = SyntaxKind.PlusToken | SyntaxKind.MinusToken;
    type AdditiveOperatorOrHigher = MultiplicativeOperatorOrHigher | AdditiveOperator;
    type ShiftOperator = SyntaxKind.LessThanLessThanToken | SyntaxKind.GreaterThanGreaterThanToken | SyntaxKind.GreaterThanGreaterThanGreaterThanToken;
    type ShiftOperatorOrHigher = AdditiveOperatorOrHigher | ShiftOperator;
    type RelationalOperator = SyntaxKind.LessThanToken | SyntaxKind.LessThanEqualsToken | SyntaxKind.GreaterThanToken | SyntaxKind.GreaterThanEqualsToken | SyntaxKind.InstanceOfKeyword | SyntaxKind.InKeyword;
    type RelationalOperatorOrHigher = ShiftOperatorOrHigher | RelationalOperator;
    type EqualityOperator = SyntaxKind.EqualsEqualsToken | SyntaxKind.EqualsEqualsEqualsToken | SyntaxKind.ExclamationEqualsEqualsToken | SyntaxKind.ExclamationEqualsToken;
    type EqualityOperatorOrHigher = RelationalOperatorOrHigher | EqualityOperator;
    type BitwiseOperator = SyntaxKind.AmpersandToken | SyntaxKind.BarToken | SyntaxKind.CaretToken;
    type BitwiseOperatorOrHigher = EqualityOperatorOrHigher | BitwiseOperator;
    type LogicalOperator = SyntaxKind.AmpersandAmpersandToken | SyntaxKind.BarBarToken;
    type LogicalOperatorOrHigher = BitwiseOperatorOrHigher | LogicalOperator;
    type CompoundAssignmentOperator = SyntaxKind.PlusEqualsToken | SyntaxKind.MinusEqualsToken | SyntaxKind.AsteriskAsteriskEqualsToken | SyntaxKind.AsteriskEqualsToken | SyntaxKind.SlashEqualsToken | SyntaxKind.PercentEqualsToken | SyntaxKind.AmpersandEqualsToken | SyntaxKind.BarEqualsToken | SyntaxKind.CaretEqualsToken | SyntaxKind.LessThanLessThanEqualsToken | SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken | SyntaxKind.GreaterThanGreaterThanEqualsToken | SyntaxKind.BarBarEqualsToken | SyntaxKind.AmpersandAmpersandEqualsToken | SyntaxKind.QuestionQuestionEqualsToken;
    type AssignmentOperator = SyntaxKind.EqualsToken | CompoundAssignmentOperator;
    type AssignmentOperatorOrHigher = SyntaxKind.QuestionQuestionToken | LogicalOperatorOrHigher | AssignmentOperator;
    type BinaryOperator = AssignmentOperatorOrHigher | SyntaxKind.CommaToken;
    type LogicalOrCoalescingAssignmentOperator = SyntaxKind.AmpersandAmpersandEqualsToken | SyntaxKind.BarBarEqualsToken | SyntaxKind.QuestionQuestionEqualsToken;
    type BinaryOperatorToken = Token<BinaryOperator>;
    interface BinaryExpression extends Expression, Declaration {
        readonly kind: SyntaxKind.BinaryExpression;
        readonly left: Expression;
        readonly operatorToken: BinaryOperatorToken;
        readonly right: Expression;
    }
    type AssignmentOperatorToken = Token<AssignmentOperator>;
    interface AssignmentExpression<TOperator extends AssignmentOperatorToken> extends BinaryExpression {
        readonly left: LeftHandSideExpression;
        readonly operatorToken: TOperator;
    }
    interface ObjectDestructuringAssignment extends AssignmentExpression<EqualsToken> {
        readonly left: ObjectLiteralExpression;
    }
    interface ArrayDestructuringAssignment extends AssignmentExpression<EqualsToken> {
        readonly left: ArrayLiteralExpression;
    }
    type DestructuringAssignment = ObjectDestructuringAssignment | ArrayDestructuringAssignment;
    type BindingOrAssignmentElement = VariableDeclaration | ParameterDeclaration | ObjectBindingOrAssignmentElement | ArrayBindingOrAssignmentElement;
    type ObjectBindingOrAssignmentElement = BindingElement | PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment;
    type ArrayBindingOrAssignmentElement = BindingElement | OmittedExpression | SpreadElement | ArrayLiteralExpression | ObjectLiteralExpression | AssignmentExpression<EqualsToken> | Identifier | PropertyAccessExpression | ElementAccessExpression;
    type BindingOrAssignmentElementRestIndicator = DotDotDotToken | SpreadElement | SpreadAssignment;
    type BindingOrAssignmentElementTarget = BindingOrAssignmentPattern | Identifier | PropertyAccessExpression | ElementAccessExpression | OmittedExpression;
    type ObjectBindingOrAssignmentPattern = ObjectBindingPattern | ObjectLiteralExpression;
    type ArrayBindingOrAssignmentPattern = ArrayBindingPattern | ArrayLiteralExpression;
    type AssignmentPattern = ObjectLiteralExpression | ArrayLiteralExpression;
    type BindingOrAssignmentPattern = ObjectBindingOrAssignmentPattern | ArrayBindingOrAssignmentPattern;
    interface ConditionalExpression extends Expression {
        readonly kind: SyntaxKind.ConditionalExpression;
        readonly condition: Expression;
        readonly questionToken: QuestionToken;
        readonly whenTrue: Expression;
        readonly colonToken: ColonToken;
        readonly whenFalse: Expression;
    }
    type FunctionBody = Block;
    type ConciseBody = FunctionBody | Expression;
    interface FunctionExpression extends PrimaryExpression, FunctionLikeDeclarationBase, JSDocContainer {
        readonly kind: SyntaxKind.FunctionExpression;
        readonly modifiers?: NodeArray<Modifier>;
        readonly name?: Identifier;
        readonly body: FunctionBody;
    }
    interface EtsComponentExpression extends PrimaryExpression, Declaration {
        readonly kind: SyntaxKind.EtsComponentExpression;
        readonly expression: LeftHandSideExpression;
        readonly typeArguments?: NodeArray<TypeNode>;
        readonly arguments: NodeArray<Expression>;
        readonly body?: Block;
    }
    interface ArrowFunction extends Expression, FunctionLikeDeclarationBase, JSDocContainer {
        readonly kind: SyntaxKind.ArrowFunction;
        readonly modifiers?: NodeArray<Modifier>;
        readonly equalsGreaterThanToken: EqualsGreaterThanToken;
        readonly body: ConciseBody;
        readonly name: never;
    }
    interface LiteralLikeNode extends Node {
        text: string;
        isUnterminated?: boolean;
        hasExtendedUnicodeEscape?: boolean;
    }
    interface TemplateLiteralLikeNode extends LiteralLikeNode {
        rawText?: string;
    }
    interface LiteralExpression extends LiteralLikeNode, PrimaryExpression {
        _literalExpressionBrand: any;
    }
    interface RegularExpressionLiteral extends LiteralExpression {
        readonly kind: SyntaxKind.RegularExpressionLiteral;
    }
    interface NoSubstitutionTemplateLiteral extends LiteralExpression, TemplateLiteralLikeNode, Declaration {
        readonly kind: SyntaxKind.NoSubstitutionTemplateLiteral;
    }
    enum TokenFlags {
        None = 0,
        Scientific = 16,
        Octal = 32,
        HexSpecifier = 64,
        BinarySpecifier = 128,
        OctalSpecifier = 256
    }
    interface NumericLiteral extends LiteralExpression, Declaration {
        readonly kind: SyntaxKind.NumericLiteral;
    }
    interface BigIntLiteral extends LiteralExpression {
        readonly kind: SyntaxKind.BigIntLiteral;
    }
    type LiteralToken = NumericLiteral | BigIntLiteral | StringLiteral | JsxText | RegularExpressionLiteral | NoSubstitutionTemplateLiteral;
    interface TemplateHead extends TemplateLiteralLikeNode {
        readonly kind: SyntaxKind.TemplateHead;
        readonly parent: TemplateExpression | TemplateLiteralTypeNode;
    }
    interface TemplateMiddle extends TemplateLiteralLikeNode {
        readonly kind: SyntaxKind.TemplateMiddle;
        readonly parent: TemplateSpan | TemplateLiteralTypeSpan;
    }
    interface TemplateTail extends TemplateLiteralLikeNode {
        readonly kind: SyntaxKind.TemplateTail;
        readonly parent: TemplateSpan | TemplateLiteralTypeSpan;
    }
    type PseudoLiteralToken = TemplateHead | TemplateMiddle | TemplateTail;
    type TemplateLiteralToken = NoSubstitutionTemplateLiteral | PseudoLiteralToken;
    interface TemplateExpression extends PrimaryExpression {
        readonly kind: SyntaxKind.TemplateExpression;
        readonly head: TemplateHead;
        readonly templateSpans: NodeArray<TemplateSpan>;
    }
    type TemplateLiteral = TemplateExpression | NoSubstitutionTemplateLiteral;
    interface TemplateSpan extends Node {
        readonly kind: SyntaxKind.TemplateSpan;
        readonly parent: TemplateExpression;
        readonly expression: Expression;
        readonly literal: TemplateMiddle | TemplateTail;
    }
    interface ParenthesizedExpression extends PrimaryExpression, JSDocContainer {
        readonly kind: SyntaxKind.ParenthesizedExpression;
        readonly expression: Expression;
    }
    interface ArrayLiteralExpression extends PrimaryExpression {
        readonly kind: SyntaxKind.ArrayLiteralExpression;
        readonly elements: NodeArray<Expression>;
    }
    interface SpreadElement extends Expression {
        readonly kind: SyntaxKind.SpreadElement;
        readonly parent: ArrayLiteralExpression | CallExpression | NewExpression;
        readonly expression: Expression;
    }
    /**
     * This interface is a base interface for ObjectLiteralExpression and JSXAttributes to extend from. JSXAttributes is similar to
     * ObjectLiteralExpression in that it contains array of properties; however, JSXAttributes' properties can only be
     * JSXAttribute or JSXSpreadAttribute. ObjectLiteralExpression, on the other hand, can only have properties of type
     * ObjectLiteralElement (e.g. PropertyAssignment, ShorthandPropertyAssignment etc.)
     */
    interface ObjectLiteralExpressionBase<T extends ObjectLiteralElement> extends PrimaryExpression, Declaration {
        readonly properties: NodeArray<T>;
    }
    interface ObjectLiteralExpression extends ObjectLiteralExpressionBase<ObjectLiteralElementLike> {
        readonly kind: SyntaxKind.ObjectLiteralExpression;
    }
    type EntityNameExpression = Identifier | PropertyAccessEntityNameExpression;
    type EntityNameOrEntityNameExpression = EntityName | EntityNameExpression;
    type AccessExpression = PropertyAccessExpression | ElementAccessExpression;
    interface PropertyAccessExpression extends MemberExpression, NamedDeclaration {
        readonly kind: SyntaxKind.PropertyAccessExpression;
        readonly expression: LeftHandSideExpression;
        readonly questionDotToken?: QuestionDotToken;
        readonly name: MemberName;
    }
    interface PropertyAccessChain extends PropertyAccessExpression {
        _optionalChainBrand: any;
        readonly name: MemberName;
    }
    interface SuperPropertyAccessExpression extends PropertyAccessExpression {
        readonly expression: SuperExpression;
    }
    /** Brand for a PropertyAccessExpression which, like a QualifiedName, consists of a sequence of identifiers separated by dots. */
    interface PropertyAccessEntityNameExpression extends PropertyAccessExpression {
        _propertyAccessExpressionLikeQualifiedNameBrand?: any;
        readonly expression: EntityNameExpression;
        readonly name: Identifier;
    }
    interface ElementAccessExpression extends MemberExpression {
        readonly kind: SyntaxKind.ElementAccessExpression;
        readonly expression: LeftHandSideExpression;
        readonly questionDotToken?: QuestionDotToken;
        readonly argumentExpression: Expression;
    }
    interface ElementAccessChain extends ElementAccessExpression {
        _optionalChainBrand: any;
    }
    interface SuperElementAccessExpression extends ElementAccessExpression {
        readonly expression: SuperExpression;
    }
    type SuperProperty = SuperPropertyAccessExpression | SuperElementAccessExpression;
    interface CallExpression extends LeftHandSideExpression, Declaration {
        readonly kind: SyntaxKind.CallExpression;
        readonly expression: LeftHandSideExpression;
        readonly questionDotToken?: QuestionDotToken;
        readonly typeArguments?: NodeArray<TypeNode>;
        readonly arguments: NodeArray<Expression>;
    }
    interface CallChain extends CallExpression {
        _optionalChainBrand: any;
    }
    type OptionalChain = PropertyAccessChain | ElementAccessChain | CallChain | NonNullChain;
    interface SuperCall extends CallExpression {
        readonly expression: SuperExpression;
    }
    interface ImportCall extends CallExpression {
        readonly expression: ImportExpression;
    }
    interface ExpressionWithTypeArguments extends MemberExpression, NodeWithTypeArguments {
        readonly kind: SyntaxKind.ExpressionWithTypeArguments;
        readonly expression: LeftHandSideExpression;
    }
    interface NewExpression extends PrimaryExpression, Declaration {
        readonly kind: SyntaxKind.NewExpression;
        readonly expression: LeftHandSideExpression;
        readonly typeArguments?: NodeArray<TypeNode>;
        readonly arguments?: NodeArray<Expression>;
    }
    interface TaggedTemplateExpression extends MemberExpression {
        readonly kind: SyntaxKind.TaggedTemplateExpression;
        readonly tag: LeftHandSideExpression;
        readonly typeArguments?: NodeArray<TypeNode>;
        readonly template: TemplateLiteral;
    }
    type CallLikeExpression = CallExpression | NewExpression | TaggedTemplateExpression | Decorator | JsxOpeningLikeElement | EtsComponentExpression;
    interface AsExpression extends Expression {
        readonly kind: SyntaxKind.AsExpression;
        readonly expression: Expression;
        readonly type: TypeNode;
    }
    interface TypeAssertion extends UnaryExpression {
        readonly kind: SyntaxKind.TypeAssertionExpression;
        readonly type: TypeNode;
        readonly expression: UnaryExpression;
    }
    interface SatisfiesExpression extends Expression {
        readonly kind: SyntaxKind.SatisfiesExpression;
        readonly expression: Expression;
        readonly type: TypeNode;
    }
    type AssertionExpression = TypeAssertion | AsExpression;
    interface NonNullExpression extends LeftHandSideExpression {
        readonly kind: SyntaxKind.NonNullExpression;
        readonly expression: Expression;
    }
    interface NonNullChain extends NonNullExpression {
        _optionalChainBrand: any;
    }
    interface MetaProperty extends PrimaryExpression {
        readonly kind: SyntaxKind.MetaProperty;
        readonly keywordToken: SyntaxKind.NewKeyword | SyntaxKind.ImportKeyword;
        readonly name: Identifier;
    }
    interface JsxElement extends PrimaryExpression {
        readonly kind: SyntaxKind.JsxElement;
        readonly openingElement: JsxOpeningElement;
        readonly children: NodeArray<JsxChild>;
        readonly closingElement: JsxClosingElement;
    }
    type JsxOpeningLikeElement = JsxSelfClosingElement | JsxOpeningElement;
    type JsxAttributeLike = JsxAttribute | JsxSpreadAttribute;
    type JsxTagNameExpression = Identifier | ThisExpression | JsxTagNamePropertyAccess;
    interface JsxTagNamePropertyAccess extends PropertyAccessExpression {
        readonly expression: JsxTagNameExpression;
    }
    interface JsxAttributes extends ObjectLiteralExpressionBase<JsxAttributeLike> {
        readonly kind: SyntaxKind.JsxAttributes;
        readonly parent: JsxOpeningLikeElement;
    }
    interface JsxOpeningElement extends Expression {
        readonly kind: SyntaxKind.JsxOpeningElement;
        readonly parent: JsxElement;
        readonly tagName: JsxTagNameExpression;
        readonly typeArguments?: NodeArray<TypeNode>;
        readonly attributes: JsxAttributes;
    }
    interface JsxSelfClosingElement extends PrimaryExpression {
        readonly kind: SyntaxKind.JsxSelfClosingElement;
        readonly tagName: JsxTagNameExpression;
        readonly typeArguments?: NodeArray<TypeNode>;
        readonly attributes: JsxAttributes;
    }
    interface JsxFragment extends PrimaryExpression {
        readonly kind: SyntaxKind.JsxFragment;
        readonly openingFragment: JsxOpeningFragment;
        readonly children: NodeArray<JsxChild>;
        readonly closingFragment: JsxClosingFragment;
    }
    interface JsxOpeningFragment extends Expression {
        readonly kind: SyntaxKind.JsxOpeningFragment;
        readonly parent: JsxFragment;
    }
    interface JsxClosingFragment extends Expression {
        readonly kind: SyntaxKind.JsxClosingFragment;
        readonly parent: JsxFragment;
    }
    interface JsxAttribute extends ObjectLiteralElement {
        readonly kind: SyntaxKind.JsxAttribute;
        readonly parent: JsxAttributes;
        readonly name: Identifier;
        readonly initializer?: JsxAttributeValue;
    }
    type JsxAttributeValue = StringLiteral | JsxExpression | JsxElement | JsxSelfClosingElement | JsxFragment;
    interface JsxSpreadAttribute extends ObjectLiteralElement {
        readonly kind: SyntaxKind.JsxSpreadAttribute;
        readonly parent: JsxAttributes;
        readonly expression: Expression;
    }
    interface JsxClosingElement extends Node {
        readonly kind: SyntaxKind.JsxClosingElement;
        readonly parent: JsxElement;
        readonly tagName: JsxTagNameExpression;
    }
    interface JsxExpression extends Expression {
        readonly kind: SyntaxKind.JsxExpression;
        readonly parent: JsxElement | JsxFragment | JsxAttributeLike;
        readonly dotDotDotToken?: Token<SyntaxKind.DotDotDotToken>;
        readonly expression?: Expression;
    }
    interface JsxText extends LiteralLikeNode {
        readonly kind: SyntaxKind.JsxText;
        readonly parent: JsxElement | JsxFragment;
        readonly containsOnlyTriviaWhiteSpaces: boolean;
    }
    type JsxChild = JsxText | JsxExpression | JsxElement | JsxSelfClosingElement | JsxFragment;
    interface Statement extends Node, JSDocContainer {
        _statementBrand: any;
    }
    interface NotEmittedStatement extends Statement {
        readonly kind: SyntaxKind.NotEmittedStatement;
    }
    /**
     * A list of comma-separated expressions. This node is only created by transformations.
     */
    interface CommaListExpression extends Expression {
        readonly kind: SyntaxKind.CommaListExpression;
        readonly elements: NodeArray<Expression>;
    }
    interface EmptyStatement extends Statement {
        readonly kind: SyntaxKind.EmptyStatement;
    }
    interface DebuggerStatement extends Statement {
        readonly kind: SyntaxKind.DebuggerStatement;
    }
    interface MissingDeclaration extends DeclarationStatement {
        readonly kind: SyntaxKind.MissingDeclaration;
        readonly name?: Identifier;
    }
    type BlockLike = SourceFile | Block | ModuleBlock | CaseOrDefaultClause;
    interface Block extends Statement {
        readonly kind: SyntaxKind.Block;
        readonly statements: NodeArray<Statement>;
    }
    interface VariableStatement extends Statement {
        readonly kind: SyntaxKind.VariableStatement;
        readonly modifiers?: NodeArray<Modifier>;
        readonly declarationList: VariableDeclarationList;
    }
    interface ExpressionStatement extends Statement {
        readonly kind: SyntaxKind.ExpressionStatement;
        readonly expression: Expression;
    }
    interface IfStatement extends Statement {
        readonly kind: SyntaxKind.IfStatement;
        readonly expression: Expression;
        readonly thenStatement: Statement;
        readonly elseStatement?: Statement;
    }
    interface IterationStatement extends Statement {
        readonly statement: Statement;
    }
    interface DoStatement extends IterationStatement {
        readonly kind: SyntaxKind.DoStatement;
        readonly expression: Expression;
    }
    interface WhileStatement extends IterationStatement {
        readonly kind: SyntaxKind.WhileStatement;
        readonly expression: Expression;
    }
    type ForInitializer = VariableDeclarationList | Expression;
    interface ForStatement extends IterationStatement {
        readonly kind: SyntaxKind.ForStatement;
        readonly initializer?: ForInitializer;
        readonly condition?: Expression;
        readonly incrementor?: Expression;
    }
    type ForInOrOfStatement = ForInStatement | ForOfStatement;
    interface ForInStatement extends IterationStatement {
        readonly kind: SyntaxKind.ForInStatement;
        readonly initializer: ForInitializer;
        readonly expression: Expression;
    }
    interface ForOfStatement extends IterationStatement {
        readonly kind: SyntaxKind.ForOfStatement;
        readonly awaitModifier?: AwaitKeyword;
        readonly initializer: ForInitializer;
        readonly expression: Expression;
    }
    interface BreakStatement extends Statement {
        readonly kind: SyntaxKind.BreakStatement;
        readonly label?: Identifier;
    }
    interface ContinueStatement extends Statement {
        readonly kind: SyntaxKind.ContinueStatement;
        readonly label?: Identifier;
    }
    type BreakOrContinueStatement = BreakStatement | ContinueStatement;
    interface ReturnStatement extends Statement {
        readonly kind: SyntaxKind.ReturnStatement;
        readonly expression?: Expression;
    }
    interface WithStatement extends Statement {
        readonly kind: SyntaxKind.WithStatement;
        readonly expression: Expression;
        readonly statement: Statement;
    }
    interface SwitchStatement extends Statement {
        readonly kind: SyntaxKind.SwitchStatement;
        readonly expression: Expression;
        readonly caseBlock: CaseBlock;
        possiblyExhaustive?: boolean;
    }
    interface CaseBlock extends Node {
        readonly kind: SyntaxKind.CaseBlock;
        readonly parent: SwitchStatement;
        readonly clauses: NodeArray<CaseOrDefaultClause>;
    }
    interface CaseClause extends Node, JSDocContainer {
        readonly kind: SyntaxKind.CaseClause;
        readonly parent: CaseBlock;
        readonly expression: Expression;
        readonly statements: NodeArray<Statement>;
    }
    interface DefaultClause extends Node {
        readonly kind: SyntaxKind.DefaultClause;
        readonly parent: CaseBlock;
        readonly statements: NodeArray<Statement>;
    }
    type CaseOrDefaultClause = CaseClause | DefaultClause;
    interface LabeledStatement extends Statement {
        readonly kind: SyntaxKind.LabeledStatement;
        readonly label: Identifier;
        readonly statement: Statement;
    }
    interface ThrowStatement extends Statement {
        readonly kind: SyntaxKind.ThrowStatement;
        readonly expression: Expression;
    }
    interface TryStatement extends Statement {
        readonly kind: SyntaxKind.TryStatement;
        readonly tryBlock: Block;
        readonly catchClause?: CatchClause;
        readonly finallyBlock?: Block;
    }
    interface CatchClause extends Node {
        readonly kind: SyntaxKind.CatchClause;
        readonly parent: TryStatement;
        readonly variableDeclaration?: VariableDeclaration;
        readonly block: Block;
    }
    type ObjectTypeDeclaration = ClassLikeDeclaration | InterfaceDeclaration | TypeLiteralNode;
    type DeclarationWithTypeParameters = DeclarationWithTypeParameterChildren | JSDocTypedefTag | JSDocCallbackTag | JSDocSignature;
    type DeclarationWithTypeParameterChildren = SignatureDeclaration | ClassLikeDeclaration | InterfaceDeclaration | TypeAliasDeclaration | JSDocTemplateTag;
    interface ClassLikeDeclarationBase extends NamedDeclaration, JSDocContainer {
        readonly kind: SyntaxKind.ClassDeclaration | SyntaxKind.ClassExpression | SyntaxKind.StructDeclaration | SyntaxKind.AnnotationDeclaration;
        readonly name?: Identifier;
        readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
        readonly heritageClauses?: NodeArray<HeritageClause>;
        readonly members: NodeArray<ClassElement>;
    }
    interface ClassDeclaration extends ClassLikeDeclarationBase, DeclarationStatement {
        readonly kind: SyntaxKind.ClassDeclaration;
        readonly modifiers?: NodeArray<ModifierLike>;
        /** May be undefined in `export default class { ... }`. */
        readonly name?: Identifier;
    }
    interface StructDeclaration extends ClassLikeDeclarationBase, DeclarationStatement {
        readonly kind: SyntaxKind.StructDeclaration;
        readonly modifiers?: NodeArray<ModifierLike>;
        /** May be undefined in `export default class { ... }`. */
        readonly name?: Identifier;
    }
    interface AnnotationDeclaration extends DeclarationStatement {
        readonly kind: SyntaxKind.AnnotationDeclaration;
        readonly modifiers?: NodeArray<ModifierLike>;
        readonly name: Identifier;
        readonly members: NodeArray<AnnotationElement>;
    }
    interface ClassExpression extends ClassLikeDeclarationBase, PrimaryExpression {
        readonly kind: SyntaxKind.ClassExpression;
        readonly modifiers?: NodeArray<ModifierLike>;
    }
    type ClassLikeDeclaration = ClassDeclaration | ClassExpression | StructDeclaration;
    interface ClassElement extends NamedDeclaration {
        _classElementBrand: any;
        readonly name?: PropertyName;
    }
    interface AnnotationElement extends NamedDeclaration {
        _annnotationElementBrand: any;
        readonly name: PropertyName;
    }
    interface TypeElement extends NamedDeclaration {
        _typeElementBrand: any;
        readonly name?: PropertyName;
        readonly questionToken?: QuestionToken | undefined;
    }
    interface InterfaceDeclaration extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.InterfaceDeclaration;
        readonly modifiers?: NodeArray<Modifier>;
        readonly name: Identifier;
        readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
        readonly heritageClauses?: NodeArray<HeritageClause>;
        readonly members: NodeArray<TypeElement>;
    }
    interface HeritageClause extends Node {
        readonly kind: SyntaxKind.HeritageClause;
        readonly parent: InterfaceDeclaration | ClassLikeDeclaration;
        readonly token: SyntaxKind.ExtendsKeyword | SyntaxKind.ImplementsKeyword;
        readonly types: NodeArray<ExpressionWithTypeArguments>;
    }
    interface TypeAliasDeclaration extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.TypeAliasDeclaration;
        readonly modifiers?: NodeArray<Modifier>;
        readonly name: Identifier;
        readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
        readonly type: TypeNode;
    }
    interface EnumMember extends NamedDeclaration, JSDocContainer {
        readonly kind: SyntaxKind.EnumMember;
        readonly parent: EnumDeclaration;
        readonly name: PropertyName;
        readonly initializer?: Expression;
    }
    interface EnumDeclaration extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.EnumDeclaration;
        readonly modifiers?: NodeArray<Modifier>;
        readonly name: Identifier;
        readonly members: NodeArray<EnumMember>;
    }
    type ModuleName = Identifier | StringLiteral;
    type ModuleBody = NamespaceBody | JSDocNamespaceBody;
    interface ModuleDeclaration extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.ModuleDeclaration;
        readonly parent: ModuleBody | SourceFile;
        readonly modifiers?: NodeArray<Modifier>;
        readonly name: ModuleName;
        readonly body?: ModuleBody | JSDocNamespaceDeclaration;
    }
    type NamespaceBody = ModuleBlock | NamespaceDeclaration;
    interface NamespaceDeclaration extends ModuleDeclaration {
        readonly name: Identifier;
        readonly body: NamespaceBody;
    }
    type JSDocNamespaceBody = Identifier | JSDocNamespaceDeclaration;
    interface JSDocNamespaceDeclaration extends ModuleDeclaration {
        readonly name: Identifier;
        readonly body?: JSDocNamespaceBody;
    }
    interface ModuleBlock extends Node, Statement {
        readonly kind: SyntaxKind.ModuleBlock;
        readonly parent: ModuleDeclaration;
        readonly statements: NodeArray<Statement>;
    }
    type ModuleReference = EntityName | ExternalModuleReference;
    /**
     * One of:
     * - import x = require("mod");
     * - import x = M.x;
     */
    interface ImportEqualsDeclaration extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.ImportEqualsDeclaration;
        readonly parent: SourceFile | ModuleBlock;
        readonly modifiers?: NodeArray<Modifier>;
        readonly name: Identifier;
        readonly isTypeOnly: boolean;
        readonly moduleReference: ModuleReference;
    }
    interface ExternalModuleReference extends Node {
        readonly kind: SyntaxKind.ExternalModuleReference;
        readonly parent: ImportEqualsDeclaration;
        readonly expression: Expression;
    }
    interface ImportDeclaration extends Statement {
        readonly kind: SyntaxKind.ImportDeclaration;
        readonly parent: SourceFile | ModuleBlock;
        readonly modifiers?: NodeArray<Modifier>;
        readonly importClause?: ImportClause;
        /** If this is not a StringLiteral it will be a grammar error. */
        readonly moduleSpecifier: Expression;
        readonly assertClause?: AssertClause;
    }
    type NamedImportBindings = NamespaceImport | NamedImports;
    type NamedExportBindings = NamespaceExport | NamedExports;
    interface ImportClause extends NamedDeclaration {
        readonly kind: SyntaxKind.ImportClause;
        readonly parent: ImportDeclaration;
        readonly isTypeOnly: boolean;
        readonly name?: Identifier;
        readonly namedBindings?: NamedImportBindings;
        readonly isLazy?: boolean;
    }
    type AssertionKey = Identifier | StringLiteral;
    interface AssertEntry extends Node {
        readonly kind: SyntaxKind.AssertEntry;
        readonly parent: AssertClause;
        readonly name: AssertionKey;
        readonly value: Expression;
    }
    interface AssertClause extends Node {
        readonly kind: SyntaxKind.AssertClause;
        readonly parent: ImportDeclaration | ExportDeclaration;
        readonly elements: NodeArray<AssertEntry>;
        readonly multiLine?: boolean;
    }
    interface NamespaceImport extends NamedDeclaration {
        readonly kind: SyntaxKind.NamespaceImport;
        readonly parent: ImportClause;
        readonly name: Identifier;
    }
    interface NamespaceExport extends NamedDeclaration {
        readonly kind: SyntaxKind.NamespaceExport;
        readonly parent: ExportDeclaration;
        readonly name: Identifier;
    }
    interface NamespaceExportDeclaration extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.NamespaceExportDeclaration;
        readonly name: Identifier;
    }
    interface ExportDeclaration extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.ExportDeclaration;
        readonly parent: SourceFile | ModuleBlock;
        readonly modifiers?: NodeArray<Modifier>;
        readonly isTypeOnly: boolean;
        /** Will not be assigned in the case of `export * from "foo";` */
        readonly exportClause?: NamedExportBindings;
        /** If this is not a StringLiteral it will be a grammar error. */
        readonly moduleSpecifier?: Expression;
        readonly assertClause?: AssertClause;
    }
    interface NamedImports extends Node {
        readonly kind: SyntaxKind.NamedImports;
        readonly parent: ImportClause;
        readonly elements: NodeArray<ImportSpecifier>;
    }
    interface NamedExports extends Node {
        readonly kind: SyntaxKind.NamedExports;
        readonly parent: ExportDeclaration;
        readonly elements: NodeArray<ExportSpecifier>;
    }
    type NamedImportsOrExports = NamedImports | NamedExports;
    interface ImportSpecifier extends NamedDeclaration {
        readonly kind: SyntaxKind.ImportSpecifier;
        readonly parent: NamedImports;
        readonly propertyName?: Identifier;
        readonly name: Identifier;
        readonly isTypeOnly: boolean;
    }
    interface ExportSpecifier extends NamedDeclaration, JSDocContainer {
        readonly kind: SyntaxKind.ExportSpecifier;
        readonly parent: NamedExports;
        readonly isTypeOnly: boolean;
        readonly propertyName?: Identifier;
        readonly name: Identifier;
    }
    type ImportOrExportSpecifier = ImportSpecifier | ExportSpecifier;
    type TypeOnlyCompatibleAliasDeclaration = ImportClause | ImportEqualsDeclaration | NamespaceImport | ImportOrExportSpecifier;
    type TypeOnlyAliasDeclaration = ImportClause & {
        readonly isTypeOnly: true;
        readonly name: Identifier;
    } | ImportEqualsDeclaration & {
        readonly isTypeOnly: true;
    } | NamespaceImport & {
        readonly parent: ImportClause & {
            readonly isTypeOnly: true;
        };
    } | ImportSpecifier & ({
        readonly isTypeOnly: true;
    } | {
        readonly parent: NamedImports & {
            readonly parent: ImportClause & {
                readonly isTypeOnly: true;
            };
        };
    }) | ExportSpecifier & ({
        readonly isTypeOnly: true;
    } | {
        readonly parent: NamedExports & {
            readonly parent: ExportDeclaration & {
                readonly isTypeOnly: true;
            };
        };
    });
    /**
     * This is either an `export =` or an `export default` declaration.
     * Unless `isExportEquals` is set, this node was parsed as an `export default`.
     */
    interface ExportAssignment extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.ExportAssignment;
        readonly parent: SourceFile;
        readonly modifiers?: NodeArray<Modifier>;
        readonly isExportEquals?: boolean;
        readonly expression: Expression;
    }
    interface FileReference extends TextRange {
        fileName: string;
        resolutionMode?: SourceFile["impliedNodeFormat"];
    }
    interface CheckJsDirective extends TextRange {
        enabled: boolean;
    }
    type CommentKind = SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia;
    interface CommentRange extends TextRange {
        hasTrailingNewLine?: boolean;
        kind: CommentKind;
    }
    interface SynthesizedComment extends CommentRange {
        text: string;
        pos: -1;
        end: -1;
        hasLeadingNewline?: boolean;
    }
    interface JSDocTypeExpression extends TypeNode {
        readonly kind: SyntaxKind.JSDocTypeExpression;
        readonly type: TypeNode;
    }
    interface JSDocNameReference extends Node {
        readonly kind: SyntaxKind.JSDocNameReference;
        readonly name: EntityName | JSDocMemberName;
    }
    /** Class#method reference in JSDoc */
    interface JSDocMemberName extends Node {
        readonly kind: SyntaxKind.JSDocMemberName;
        readonly left: EntityName | JSDocMemberName;
        readonly right: Identifier;
    }
    interface JSDocType extends TypeNode {
        _jsDocTypeBrand: any;
    }
    interface JSDocAllType extends JSDocType {
        readonly kind: SyntaxKind.JSDocAllType;
    }
    interface JSDocUnknownType extends JSDocType {
        readonly kind: SyntaxKind.JSDocUnknownType;
    }
    interface JSDocNonNullableType extends JSDocType {
        readonly kind: SyntaxKind.JSDocNonNullableType;
        readonly type: TypeNode;
        readonly postfix: boolean;
    }
    interface JSDocNullableType extends JSDocType {
        readonly kind: SyntaxKind.JSDocNullableType;
        readonly type: TypeNode;
        readonly postfix: boolean;
    }
    interface JSDocOptionalType extends JSDocType {
        readonly kind: SyntaxKind.JSDocOptionalType;
        readonly type: TypeNode;
    }
    interface JSDocFunctionType extends JSDocType, SignatureDeclarationBase {
        readonly kind: SyntaxKind.JSDocFunctionType;
    }
    interface JSDocVariadicType extends JSDocType {
        readonly kind: SyntaxKind.JSDocVariadicType;
        readonly type: TypeNode;
    }
    interface JSDocNamepathType extends JSDocType {
        readonly kind: SyntaxKind.JSDocNamepathType;
        readonly type: TypeNode;
    }
    type JSDocTypeReferencingNode = JSDocVariadicType | JSDocOptionalType | JSDocNullableType | JSDocNonNullableType;
    interface JSDoc extends Node {
        readonly kind: SyntaxKind.JSDoc;
        readonly parent: HasJSDoc;
        readonly tags?: NodeArray<JSDocTag>;
        readonly comment?: string | NodeArray<JSDocComment>;
    }
    interface JSDocTag extends Node {
        readonly parent: JSDoc | JSDocTypeLiteral;
        readonly tagName: Identifier;
        readonly comment?: string | NodeArray<JSDocComment>;
    }
    interface JSDocLink extends Node {
        readonly kind: SyntaxKind.JSDocLink;
        readonly name?: EntityName | JSDocMemberName;
        text: string;
    }
    interface JSDocLinkCode extends Node {
        readonly kind: SyntaxKind.JSDocLinkCode;
        readonly name?: EntityName | JSDocMemberName;
        text: string;
    }
    interface JSDocLinkPlain extends Node {
        readonly kind: SyntaxKind.JSDocLinkPlain;
        readonly name?: EntityName | JSDocMemberName;
        text: string;
    }
    type JSDocComment = JSDocText | JSDocLink | JSDocLinkCode | JSDocLinkPlain;
    interface JSDocText extends Node {
        readonly kind: SyntaxKind.JSDocText;
        text: string;
    }
    interface JSDocUnknownTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocTag;
    }
    /**
     * Note that `@extends` is a synonym of `@augments`.
     * Both tags are represented by this interface.
     */
    interface JSDocAugmentsTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocAugmentsTag;
        readonly class: ExpressionWithTypeArguments & {
            readonly expression: Identifier | PropertyAccessEntityNameExpression;
        };
    }
    interface JSDocImplementsTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocImplementsTag;
        readonly class: ExpressionWithTypeArguments & {
            readonly expression: Identifier | PropertyAccessEntityNameExpression;
        };
    }
    interface JSDocAuthorTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocAuthorTag;
    }
    interface JSDocDeprecatedTag extends JSDocTag {
        kind: SyntaxKind.JSDocDeprecatedTag;
    }
    interface JSDocClassTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocClassTag;
    }
    interface JSDocPublicTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocPublicTag;
    }
    interface JSDocPrivateTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocPrivateTag;
    }
    interface JSDocProtectedTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocProtectedTag;
    }
    interface JSDocReadonlyTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocReadonlyTag;
    }
    interface JSDocOverrideTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocOverrideTag;
    }
    interface JSDocEnumTag extends JSDocTag, Declaration {
        readonly kind: SyntaxKind.JSDocEnumTag;
        readonly parent: JSDoc;
        readonly typeExpression: JSDocTypeExpression;
    }
    interface JSDocThisTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocThisTag;
        readonly typeExpression: JSDocTypeExpression;
    }
    interface JSDocTemplateTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocTemplateTag;
        readonly constraint: JSDocTypeExpression | undefined;
        readonly typeParameters: NodeArray<TypeParameterDeclaration>;
    }
    interface JSDocSeeTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocSeeTag;
        readonly name?: JSDocNameReference;
    }
    interface JSDocReturnTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocReturnTag;
        readonly typeExpression?: JSDocTypeExpression;
    }
    interface JSDocTypeTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocTypeTag;
        readonly typeExpression: JSDocTypeExpression;
    }
    interface JSDocTypedefTag extends JSDocTag, NamedDeclaration {
        readonly kind: SyntaxKind.JSDocTypedefTag;
        readonly parent: JSDoc;
        readonly fullName?: JSDocNamespaceDeclaration | Identifier;
        readonly name?: Identifier;
        readonly typeExpression?: JSDocTypeExpression | JSDocTypeLiteral;
    }
    interface JSDocCallbackTag extends JSDocTag, NamedDeclaration {
        readonly kind: SyntaxKind.JSDocCallbackTag;
        readonly parent: JSDoc;
        readonly fullName?: JSDocNamespaceDeclaration | Identifier;
        readonly name?: Identifier;
        readonly typeExpression: JSDocSignature;
    }
    interface JSDocSignature extends JSDocType, Declaration {
        readonly kind: SyntaxKind.JSDocSignature;
        readonly typeParameters?: readonly JSDocTemplateTag[];
        readonly parameters: readonly JSDocParameterTag[];
        readonly type: JSDocReturnTag | undefined;
    }
    interface JSDocPropertyLikeTag extends JSDocTag, Declaration {
        readonly parent: JSDoc;
        readonly name: EntityName;
        readonly typeExpression?: JSDocTypeExpression;
        /** Whether the property name came before the type -- non-standard for JSDoc, but Typescript-like */
        readonly isNameFirst: boolean;
        readonly isBracketed: boolean;
    }
    interface JSDocPropertyTag extends JSDocPropertyLikeTag {
        readonly kind: SyntaxKind.JSDocPropertyTag;
    }
    interface JSDocParameterTag extends JSDocPropertyLikeTag {
        readonly kind: SyntaxKind.JSDocParameterTag;
    }
    interface JSDocTypeLiteral extends JSDocType {
        readonly kind: SyntaxKind.JSDocTypeLiteral;
        readonly jsDocPropertyTags?: readonly JSDocPropertyLikeTag[];
        /** If true, then this type literal represents an *array* of its type. */
        readonly isArrayType: boolean;
    }
    enum FlowFlags {
        Unreachable = 1,
        Start = 2,
        BranchLabel = 4,
        LoopLabel = 8,
        Assignment = 16,
        TrueCondition = 32,
        FalseCondition = 64,
        SwitchClause = 128,
        ArrayMutation = 256,
        Call = 512,
        ReduceLabel = 1024,
        Referenced = 2048,
        Shared = 4096,
        Label = 12,
        Condition = 96
    }
    type FlowNode = FlowStart | FlowLabel | FlowAssignment | FlowCondition | FlowSwitchClause | FlowArrayMutation | FlowCall | FlowReduceLabel;
    interface FlowNodeBase {
        flags: FlowFlags;
        id?: number;
    }
    interface FlowStart extends FlowNodeBase {
        node?: FunctionExpression | ArrowFunction | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration;
    }
    interface FlowLabel extends FlowNodeBase {
        antecedents: FlowNode[] | undefined;
    }
    interface FlowAssignment extends FlowNodeBase {
        node: Expression | VariableDeclaration | BindingElement;
        antecedent: FlowNode;
    }
    interface FlowCall extends FlowNodeBase {
        node: CallExpression;
        antecedent: FlowNode;
    }
    interface FlowCondition extends FlowNodeBase {
        node: Expression;
        antecedent: FlowNode;
    }
    interface FlowSwitchClause extends FlowNodeBase {
        switchStatement: SwitchStatement;
        clauseStart: number;
        clauseEnd: number;
        antecedent: FlowNode;
    }
    interface FlowArrayMutation extends FlowNodeBase {
        node: CallExpression | BinaryExpression;
        antecedent: FlowNode;
    }
    interface FlowReduceLabel extends FlowNodeBase {
        target: FlowLabel;
        antecedents: FlowNode[];
        antecedent: FlowNode;
    }
    type FlowType = Type | IncompleteType;
    interface IncompleteType {
        flags: TypeFlags;
        type: Type;
    }
    interface AmdDependency {
        path: string;
        name?: string;
    }
    /**
     * Subset of properties from SourceFile that are used in multiple utility functions
     */
    interface SourceFileLike {
        readonly text: string;
        readonly fileName?: string;
    }
    interface SourceFileLike {
        getLineAndCharacterOfPosition(pos: number): LineAndCharacter;
    }
    interface SourceFile extends Declaration {
        readonly kind: SyntaxKind.SourceFile;
        readonly statements: NodeArray<Statement>;
        readonly endOfFileToken: Token<SyntaxKind.EndOfFileToken>;
        fileName: string;
        text: string;
        amdDependencies: readonly AmdDependency[];
        moduleName?: string;
        referencedFiles: readonly FileReference[];
        typeReferenceDirectives: readonly FileReference[];
        libReferenceDirectives: readonly FileReference[];
        languageVariant: LanguageVariant;
        isDeclarationFile: boolean;
        /**
         * lib.d.ts should have a reference comment like
         *
         *  /// <reference no-default-lib="true"/>
         *
         * If any other file has this comment, it signals not to include lib.d.ts
         * because this containing file is intended to act as a default library.
         */
        hasNoDefaultLib: boolean;
        languageVersion: ScriptTarget;
        /**
         * When `module` is `Node16` or `NodeNext`, this field controls whether the
         * source file in question is an ESNext-output-format file, or a CommonJS-output-format
         * module. This is derived by the module resolver as it looks up the file, since
         * it is derived from either the file extension of the module, or the containing
         * `package.json` context, and affects both checking and emit.
         *
         * It is _public_ so that (pre)transformers can set this field,
         * since it switches the builtin `node` module transform. Generally speaking, if unset,
         * the field is treated as though it is `ModuleKind.CommonJS`.
         *
         * Note that this field is only set by the module resolution process when
         * `moduleResolution` is `Node16` or `NodeNext`, which is implied by the `module` setting
         * of `Node16` or `NodeNext`, respectively, but may be overriden (eg, by a `moduleResolution`
         * of `node`). If so, this field will be unset and source files will be considered to be
         * CommonJS-output-format by the node module transformer and type checker, regardless of extension or context.
         */
        impliedNodeFormat?: ModuleKind.ESNext | ModuleKind.CommonJS;
    }
    interface SourceFile {
        getLineAndCharacterOfPosition(pos: number): LineAndCharacter;
        getLineEndOfPosition(pos: number): number;
        getLineStarts(): readonly number[];
        getPositionOfLineAndCharacter(line: number, character: number): number;
        update(newText: string, textChangeRange: TextChangeRange): SourceFile;
    }
    interface Bundle extends Node {
        readonly kind: SyntaxKind.Bundle;
        readonly prepends: readonly (InputFiles | UnparsedSource)[];
        readonly sourceFiles: readonly SourceFile[];
    }
    interface InputFiles extends Node {
        readonly kind: SyntaxKind.InputFiles;
        javascriptPath?: string;
        javascriptText: string;
        javascriptMapPath?: string;
        javascriptMapText?: string;
        declarationPath?: string;
        declarationText: string;
        declarationMapPath?: string;
        declarationMapText?: string;
    }
    interface UnparsedSource extends Node {
        readonly kind: SyntaxKind.UnparsedSource;
        fileName: string;
        text: string;
        readonly prologues: readonly UnparsedPrologue[];
        helpers: readonly UnscopedEmitHelper[] | undefined;
        referencedFiles: readonly FileReference[];
        typeReferenceDirectives: readonly FileReference[] | undefined;
        libReferenceDirectives: readonly FileReference[];
        hasNoDefaultLib?: boolean;
        sourceMapPath?: string;
        sourceMapText?: string;
        readonly syntheticReferences?: readonly UnparsedSyntheticReference[];
        readonly texts: readonly UnparsedSourceText[];
    }
    type UnparsedSourceText = UnparsedPrepend | UnparsedTextLike;
    type UnparsedNode = UnparsedPrologue | UnparsedSourceText | UnparsedSyntheticReference;
    interface UnparsedSection extends Node {
        readonly kind: SyntaxKind;
        readonly parent: UnparsedSource;
        readonly data?: string;
    }
    interface UnparsedPrologue extends UnparsedSection {
        readonly kind: SyntaxKind.UnparsedPrologue;
        readonly parent: UnparsedSource;
        readonly data: string;
    }
    interface UnparsedPrepend extends UnparsedSection {
        readonly kind: SyntaxKind.UnparsedPrepend;
        readonly parent: UnparsedSource;
        readonly data: string;
        readonly texts: readonly UnparsedTextLike[];
    }
    interface UnparsedTextLike extends UnparsedSection {
        readonly kind: SyntaxKind.UnparsedText | SyntaxKind.UnparsedInternalText;
        readonly parent: UnparsedSource;
    }
    interface UnparsedSyntheticReference extends UnparsedSection {
        readonly kind: SyntaxKind.UnparsedSyntheticReference;
        readonly parent: UnparsedSource;
    }
    interface JsonSourceFile extends SourceFile {
        readonly statements: NodeArray<JsonObjectExpressionStatement>;
    }
    interface TsConfigSourceFile extends JsonSourceFile {
        extendedSourceFiles?: string[];
    }
    interface JsonMinusNumericLiteral extends PrefixUnaryExpression {
        readonly kind: SyntaxKind.PrefixUnaryExpression;
        readonly operator: SyntaxKind.MinusToken;
        readonly operand: NumericLiteral;
    }
    type JsonObjectExpression = ObjectLiteralExpression | ArrayLiteralExpression | JsonMinusNumericLiteral | NumericLiteral | StringLiteral | BooleanLiteral | NullLiteral;
    interface JsonObjectExpressionStatement extends ExpressionStatement {
        readonly expression: JsonObjectExpression;
    }
    interface ScriptReferenceHost {
        getCompilerOptions(): CompilerOptions;
        getSourceFile(fileName: string): SourceFile | undefined;
        getSourceFileByPath(path: Path): SourceFile | undefined;
        getCurrentDirectory(): string;
    }
    interface ParseConfigHost {
        useCaseSensitiveFileNames: boolean;
        readDirectory(rootDir: string, extensions: readonly string[], excludes: readonly string[] | undefined, includes: readonly string[], depth?: number): readonly string[];
        /**
         * Gets a value indicating whether the specified path exists and is a file.
         * @param path The path to test.
         */
        fileExists(path: string): boolean;
        readFile(path: string): string | undefined;
        trace?(s: string): void;
    }
    /**
     * Branded string for keeping track of when we've turned an ambiguous path
     * specified like "./blah" to an absolute path to an actual
     * tsconfig file, e.g. "/root/blah/tsconfig.json"
     */
    type ResolvedConfigFileName = string & {
        _isResolvedConfigFileName: never;
    };
    interface WriteFileCallbackData {
    }
    type WriteFileCallback = (fileName: string, text: string, writeByteOrderMark: boolean, onError?: (message: string) => void, sourceFiles?: readonly SourceFile[], data?: WriteFileCallbackData) => void;
    class OperationCanceledException {
    }
    interface CancellationToken {
        isCancellationRequested(): boolean;
        /** OperationCanceledException if isCancellationRequested is true */
        throwIfCancellationRequested(): void;
    }
    interface SymbolDisplayPart {
        text: string;
        kind: string;
    }
    interface SymbolDisplayPart {
        text: string;
        kind: string;
    }
    interface JsDocTagInfo {
        name: string;
        text?: string | SymbolDisplayPart[];
    }
    interface Program extends ScriptReferenceHost {
        getCurrentDirectory(): string;
        /**
         * Get a list of root file names that were passed to a 'createProgram'
         */
        getRootFileNames(): readonly string[];
        /**
         * Get a list of files in the program
         */
        getSourceFiles(): readonly SourceFile[];
        /**
         * Emits the JavaScript and declaration files.  If targetSourceFile is not specified, then
         * the JavaScript and declaration files will be produced for all the files in this program.
         * If targetSourceFile is specified, then only the JavaScript and declaration for that
         * specific file will be generated.
         *
         * If writeFile is not specified then the writeFile callback from the compiler host will be
         * used for writing the JavaScript and declaration files.  Otherwise, the writeFile parameter
         * will be invoked when writing the JavaScript and declaration files.
         */
        emit(targetSourceFile?: SourceFile, writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: CustomTransformers): EmitResult;
        getOptionsDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
        getGlobalDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
        getSyntacticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[];
        /** The first time this is called, it will return global diagnostics (no location). */
        getSemanticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
        getSemanticDiagnosticsForLinter(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
        getDeclarationDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[];
        getConfigFileParsingDiagnostics(): readonly Diagnostic[];
        getEtsLibSFromProgram(): string[];
        /**
         * Gets a type checker that can be used to semantically analyze source files in the program.
         */
        getTypeChecker(): TypeChecker;
        /**
         * Gets a type checker that can be used to semantically analyze source files in the program for arkts linter.
         */
        getLinterTypeChecker(): TypeChecker;
        getNodeCount(): number;
        getIdentifierCount(): number;
        getSymbolCount(): number;
        getTypeCount(): number;
        getInstantiationCount(): number;
        getRelationCacheSizes(): {
            assignable: number;
            identity: number;
            subtype: number;
            strictSubtype: number;
        };
        isSourceFileFromExternalLibrary(file: SourceFile): boolean;
        isSourceFileDefaultLibrary(file: SourceFile): boolean;
        getSourceFileFromReference(referencingFile: SourceFile | UnparsedSource, ref: FileReference): SourceFile | undefined;
        getProjectReferences(): readonly ProjectReference[] | undefined;
        getResolvedProjectReferences(): readonly (ResolvedProjectReference | undefined)[] | undefined;
        getJsDocNodeCheckedConfig?(jsDocFileCheckInfo: FileCheckModuleInfo, symbolSourceFilePath: string): JsDocNodeCheckConfig;
        getJsDocNodeConditionCheckedResult?(jsDocFileCheckedInfo: FileCheckModuleInfo, jsDocTagInfos: JsDocTagInfo[], jsDocs?: JSDoc[]): ConditionCheckResult;
        getFileCheckedModuleInfo?(containFilePath: string): FileCheckModuleInfo;
        /**
         * Release typeChecker & linterTypeChecker
         */
        releaseTypeChecker(): void;
        getEmitHost(writeFileCallback?: WriteFileCallback): EmitHost;
        refreshTypeChecker(): void;
        setProgramSourceFiles(file: SourceFile): void;
        initProcessingFiles(): void;
        processImportedModules(file: SourceFile): void;
        getProcessingFiles(): SourceFile[] | undefined;
        deleteProgramSourceFiles(fileNames: string[]): void;
    }
    type RedirectTargetsMap = ReadonlyESMap<Path, readonly string[]>;
    interface ResolvedProjectReference {
        commandLine: ParsedCommandLine;
        sourceFile: SourceFile;
        references?: readonly (ResolvedProjectReference | undefined)[];
    }
    type CustomTransformerFactory = (context: TransformationContext) => CustomTransformer;
    interface CustomTransformer {
        transformSourceFile(node: SourceFile): SourceFile;
        transformBundle(node: Bundle): Bundle;
    }
    interface CustomTransformers {
        /** Custom transformers to evaluate before built-in .js transformations. */
        before?: (TransformerFactory<SourceFile> | CustomTransformerFactory)[];
        /** Custom transformers to evaluate after built-in .js transformations. */
        after?: (TransformerFactory<SourceFile> | CustomTransformerFactory)[];
        /** Custom transformers to evaluate after built-in .d.ts transformations. */
        afterDeclarations?: (TransformerFactory<Bundle | SourceFile> | CustomTransformerFactory)[];
    }
    interface SourceMapSpan {
        /** Line number in the .js file. */
        emittedLine: number;
        /** Column number in the .js file. */
        emittedColumn: number;
        /** Line number in the .ts file. */
        sourceLine: number;
        /** Column number in the .ts file. */
        sourceColumn: number;
        /** Optional name (index into names array) associated with this span. */
        nameIndex?: number;
        /** .ts file (index into sources array) associated with this span */
        sourceIndex: number;
    }
    /** Return code used by getEmitOutput function to indicate status of the function */
    enum ExitStatus {
        Success = 0,
        DiagnosticsPresent_OutputsSkipped = 1,
        DiagnosticsPresent_OutputsGenerated = 2,
        InvalidProject_OutputsSkipped = 3,
        ProjectReferenceCycle_OutputsSkipped = 4,
        /** @deprecated Use ProjectReferenceCycle_OutputsSkipped instead. */
        ProjectReferenceCycle_OutputsSkupped = 4
    }
    interface EmitResult {
        emitSkipped: boolean;
        /** Contains declaration emit diagnostics */
        diagnostics: readonly Diagnostic[];
        emittedFiles?: string[];
    }
    interface TypeChecker {
        getTypeOfSymbolAtLocation(symbol: Symbol, node: Node): Type;
        getDeclaredTypeOfSymbol(symbol: Symbol): Type;
        getPropertiesOfType(type: Type): Symbol[];
        getPropertyOfType(type: Type, propertyName: string): Symbol | undefined;
        getPrivateIdentifierPropertyOfType(leftType: Type, name: string, location: Node): Symbol | undefined;
        getIndexInfoOfType(type: Type, kind: IndexKind): IndexInfo | undefined;
        getIndexInfosOfType(type: Type): readonly IndexInfo[];
        getIndexInfosOfIndexSymbol: (indexSymbol: Symbol) => IndexInfo[];
        getSignaturesOfType(type: Type, kind: SignatureKind): readonly Signature[];
        getIndexTypeOfType(type: Type, kind: IndexKind): Type | undefined;
        getBaseTypes(type: InterfaceType): BaseType[];
        getBaseTypeOfLiteralType(type: Type): Type;
        getWidenedType(type: Type): Type;
        getReturnTypeOfSignature(signature: Signature): Type;
        getNullableType(type: Type, flags: TypeFlags): Type;
        getNonNullableType(type: Type): Type;
        getTypeArguments(type: TypeReference): readonly Type[];
        /** Note that the resulting nodes cannot be checked. */
        typeToTypeNode(type: Type, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): TypeNode | undefined;
        /** Note that the resulting nodes cannot be checked. */
        signatureToSignatureDeclaration(signature: Signature, kind: SyntaxKind, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): SignatureDeclaration & {
            typeArguments?: NodeArray<TypeNode>;
        } | undefined;
        /** Note that the resulting nodes cannot be checked. */
        indexInfoToIndexSignatureDeclaration(indexInfo: IndexInfo, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): IndexSignatureDeclaration | undefined;
        /** Note that the resulting nodes cannot be checked. */
        symbolToEntityName(symbol: Symbol, meaning: SymbolFlags, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): EntityName | undefined;
        /** Note that the resulting nodes cannot be checked. */
        symbolToExpression(symbol: Symbol, meaning: SymbolFlags, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): Expression | undefined;
        /** Note that the resulting nodes cannot be checked. */
        symbolToTypeParameterDeclarations(symbol: Symbol, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): NodeArray<TypeParameterDeclaration> | undefined;
        /** Note that the resulting nodes cannot be checked. */
        symbolToParameterDeclaration(symbol: Symbol, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): ParameterDeclaration | undefined;
        /** Note that the resulting nodes cannot be checked. */
        typeParameterToDeclaration(parameter: TypeParameter, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): TypeParameterDeclaration | undefined;
        getSymbolsInScope(location: Node, meaning: SymbolFlags): Symbol[];
        getSymbolAtLocation(node: Node): Symbol | undefined;
        getSymbolsOfParameterPropertyDeclaration(parameter: ParameterDeclaration, parameterName: string): Symbol[];
        /**
         * The function returns the value (local variable) symbol of an identifier in the short-hand property assignment.
         * This is necessary as an identifier in short-hand property assignment can contains two meaning: property name and property value.
         */
        getShorthandAssignmentValueSymbol(location: Node | undefined): Symbol | undefined;
        getExportSpecifierLocalTargetSymbol(location: ExportSpecifier | Identifier): Symbol | undefined;
        /**
         * If a symbol is a local symbol with an associated exported symbol, returns the exported symbol.
         * Otherwise returns its input.
         * For example, at `export type T = number;`:
         *     - `getSymbolAtLocation` at the location `T` will return the exported symbol for `T`.
         *     - But the result of `getSymbolsInScope` will contain the *local* symbol for `T`, not the exported symbol.
         *     - Calling `getExportSymbolOfSymbol` on that local symbol will return the exported symbol.
         */
        getExportSymbolOfSymbol(symbol: Symbol): Symbol;
        getPropertySymbolOfDestructuringAssignment(location: Identifier): Symbol | undefined;
        getTypeOfAssignmentPattern(pattern: AssignmentPattern): Type;
        getTypeAtLocation(node: Node): Type;
        tryGetTypeAtLocationWithoutCheck(node: Node): Type;
        getTypeFromTypeNode(node: TypeNode): Type;
        signatureToString(signature: Signature, enclosingDeclaration?: Node, flags?: TypeFormatFlags, kind?: SignatureKind): string;
        typeToString(type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string;
        symbolToString(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags): string;
        typePredicateToString(predicate: TypePredicate, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string;
        getFullyQualifiedName(symbol: Symbol): string;
        getAugmentedPropertiesOfType(type: Type): Symbol[];
        getRootSymbols(symbol: Symbol): readonly Symbol[];
        getSymbolOfExpando(node: Node, allowDeclaration: boolean): Symbol | undefined;
        getContextualType(node: Expression): Type | undefined;
        /**
         * returns unknownSignature in the case of an error.
         * returns undefined if the node is not valid.
         * @param argumentCount Apparent number of arguments, passed in case of a possibly incomplete call. This should come from an ArgumentListInfo. See `signatureHelp.ts`.
         */
        getResolvedSignature(node: CallLikeExpression, candidatesOutArray?: Signature[], argumentCount?: number): Signature | undefined;
        tryGetResolvedSignatureWithoutCheck(node: CallLikeExpression, candidatesOutArray?: Signature[], argumentCount?: number): Signature | undefined;
        getSignatureFromDeclaration(declaration: SignatureDeclaration): Signature | undefined;
        isImplementationOfOverload(node: SignatureDeclaration): boolean | undefined;
        isUndefinedSymbol(symbol: Symbol): boolean;
        isArgumentsSymbol(symbol: Symbol): boolean;
        isUnknownSymbol(symbol: Symbol): boolean;
        getMergedSymbol(symbol: Symbol): Symbol;
        getConstantValue(node: EnumMember | PropertyAccessExpression | ElementAccessExpression): string | number | undefined;
        isValidPropertyAccess(node: PropertyAccessExpression | QualifiedName | ImportTypeNode, propertyName: string): boolean;
        /** Follow all aliases to get the original symbol. */
        getAliasedSymbol(symbol: Symbol): Symbol;
        /** Follow a *single* alias to get the immediately aliased symbol. */
        getImmediateAliasedSymbol(symbol: Symbol): Symbol | undefined;
        getExportsOfModule(moduleSymbol: Symbol): Symbol[];
        getJsxIntrinsicTagNamesAt(location: Node): Symbol[];
        isOptionalParameter(node: ParameterDeclaration): boolean;
        getAmbientModules(): Symbol[];
        tryGetMemberInModuleExports(memberName: string, moduleSymbol: Symbol): Symbol | undefined;
        getApparentType(type: Type): Type;
        getBaseConstraintOfType(type: Type): Type | undefined;
        getDefaultFromTypeParameter(type: Type): Type | undefined;
        getTypePredicateOfSignature(signature: Signature): TypePredicate | undefined;
        /**
         * Depending on the operation performed, it may be appropriate to throw away the checker
         * if the cancellation token is triggered. Typically, if it is used for error checking
         * and the operation is cancelled, then it should be discarded, otherwise it is safe to keep.
         */
        runWithCancellationToken<T>(token: CancellationToken, cb: (checker: TypeChecker) => T): T;
        getConstEnumRelate?(): ESMap<string, ESMap<string, string>>;
        clearConstEnumRelate?(): void;
        deleteConstEnumRelate?(path: string): void;
        getTypeArgumentsForResolvedSignature(signature: Signature): readonly Type[] | undefined;
        getCheckedSourceFiles(): Set<SourceFile>;
        collectHaveTsNoCheckFilesForLinter(sourceFile: SourceFile): void;
        clearQualifiedNameCache?(): void;
        isStaticRecord?(type: Type): boolean;
        isStaticSourceFile?(sourceFile: SourceFile | undefined): boolean;
    }
    enum NodeBuilderFlags {
        None = 0,
        NoTruncation = 1,
        WriteArrayAsGenericType = 2,
        GenerateNamesForShadowedTypeParams = 4,
        UseStructuralFallback = 8,
        ForbidIndexedAccessSymbolReferences = 16,
        WriteTypeArgumentsOfSignature = 32,
        UseFullyQualifiedType = 64,
        UseOnlyExternalAliasing = 128,
        SuppressAnyReturnType = 256,
        WriteTypeParametersInQualifiedName = 512,
        MultilineObjectLiterals = 1024,
        WriteClassExpressionAsTypeLiteral = 2048,
        UseTypeOfFunction = 4096,
        OmitParameterModifiers = 8192,
        UseAliasDefinedOutsideCurrentScope = 16384,
        UseSingleQuotesForStringLiteralType = 268435456,
        NoTypeReduction = 536870912,
        OmitThisParameter = 33554432,
        AllowThisInObjectLiteral = 32768,
        AllowQualifiedNameInPlaceOfIdentifier = 65536,
        /** @deprecated AllowQualifedNameInPlaceOfIdentifier. Use AllowQualifiedNameInPlaceOfIdentifier instead. */
        AllowQualifedNameInPlaceOfIdentifier = 65536,
        AllowAnonymousIdentifier = 131072,
        AllowEmptyUnionOrIntersection = 262144,
        AllowEmptyTuple = 524288,
        AllowUniqueESSymbolType = 1048576,
        AllowEmptyIndexInfoType = 2097152,
        AllowNodeModulesRelativePaths = 67108864,
        IgnoreErrors = 70221824,
        InObjectTypeLiteral = 4194304,
        InTypeAlias = 8388608,
        InInitialEntityName = 16777216
    }
    enum TypeFormatFlags {
        None = 0,
        NoTruncation = 1,
        WriteArrayAsGenericType = 2,
        UseStructuralFallback = 8,
        WriteTypeArgumentsOfSignature = 32,
        UseFullyQualifiedType = 64,
        SuppressAnyReturnType = 256,
        MultilineObjectLiterals = 1024,
        WriteClassExpressionAsTypeLiteral = 2048,
        UseTypeOfFunction = 4096,
        OmitParameterModifiers = 8192,
        UseAliasDefinedOutsideCurrentScope = 16384,
        UseSingleQuotesForStringLiteralType = 268435456,
        NoTypeReduction = 536870912,
        OmitThisParameter = 33554432,
        AllowUniqueESSymbolType = 1048576,
        AddUndefined = 131072,
        WriteArrowStyleSignature = 262144,
        InArrayType = 524288,
        InElementType = 2097152,
        InFirstTypeArgument = 4194304,
        InTypeAlias = 8388608,
        /** @deprecated */ WriteOwnNameForAnyLike = 0,
        NodeBuilderFlagsMask = 848330091
    }
    enum SymbolFormatFlags {
        None = 0,
        WriteTypeParametersOrArguments = 1,
        UseOnlyExternalAliasing = 2,
        AllowAnyNodeKind = 4,
        UseAliasDefinedOutsideCurrentScope = 8
    }
    interface SymbolWriter extends SymbolTracker {
        writeKeyword(text: string): void;
        writeOperator(text: string): void;
        writePunctuation(text: string): void;
        writeSpace(text: string): void;
        writeStringLiteral(text: string): void;
        writeParameter(text: string): void;
        writeProperty(text: string): void;
        writeSymbol(text: string, symbol: Symbol): void;
        writeLine(force?: boolean): void;
        increaseIndent(): void;
        decreaseIndent(): void;
        clear(): void;
    }
    enum TypePredicateKind {
        This = 0,
        Identifier = 1,
        AssertsThis = 2,
        AssertsIdentifier = 3
    }
    interface TypePredicateBase {
        kind: TypePredicateKind;
        type: Type | undefined;
    }
    interface ThisTypePredicate extends TypePredicateBase {
        kind: TypePredicateKind.This;
        parameterName: undefined;
        parameterIndex: undefined;
        type: Type;
    }
    interface IdentifierTypePredicate extends TypePredicateBase {
        kind: TypePredicateKind.Identifier;
        parameterName: string;
        parameterIndex: number;
        type: Type;
    }
    interface AssertsThisTypePredicate extends TypePredicateBase {
        kind: TypePredicateKind.AssertsThis;
        parameterName: undefined;
        parameterIndex: undefined;
        type: Type | undefined;
    }
    interface AssertsIdentifierTypePredicate extends TypePredicateBase {
        kind: TypePredicateKind.AssertsIdentifier;
        parameterName: string;
        parameterIndex: number;
        type: Type | undefined;
    }
    type TypePredicate = ThisTypePredicate | IdentifierTypePredicate | AssertsThisTypePredicate | AssertsIdentifierTypePredicate;
    enum SymbolFlags {
        None = 0,
        FunctionScopedVariable = 1,
        BlockScopedVariable = 2,
        Property = 4,
        EnumMember = 8,
        Function = 16,
        Class = 32,
        Interface = 64,
        ConstEnum = 128,
        RegularEnum = 256,
        ValueModule = 512,
        NamespaceModule = 1024,
        TypeLiteral = 2048,
        ObjectLiteral = 4096,
        Method = 8192,
        Constructor = 16384,
        GetAccessor = 32768,
        SetAccessor = 65536,
        Signature = 131072,
        TypeParameter = 262144,
        TypeAlias = 524288,
        ExportValue = 1048576,
        Alias = 2097152,
        Prototype = 4194304,
        ExportStar = 8388608,
        Optional = 16777216,
        Transient = 33554432,
        Assignment = 67108864,
        ModuleExports = 134217728,
        Annotation = 268435456,
        Enum = 384,
        Variable = 3,
        Value = 111551,
        Type = 788968,
        Namespace = 1920,
        Module = 1536,
        Accessor = 98304,
        FunctionScopedVariableExcludes = 111550,
        BlockScopedVariableExcludes = 111551,
        ParameterExcludes = 111551,
        PropertyExcludes = 0,
        EnumMemberExcludes = 900095,
        FunctionExcludes = 110991,
        ClassExcludes = 899503,
        InterfaceExcludes = 788872,
        RegularEnumExcludes = 899327,
        ConstEnumExcludes = 899967,
        ValueModuleExcludes = 110735,
        NamespaceModuleExcludes = 0,
        MethodExcludes = 103359,
        GetAccessorExcludes = 46015,
        SetAccessorExcludes = 78783,
        AccessorExcludes = 13247,
        TypeParameterExcludes = 526824,
        TypeAliasExcludes = 788968,
        AliasExcludes = 2097152,
        ModuleMember = 2623475,
        ExportHasLocal = 944,
        BlockScoped = 418,
        PropertyOrAccessor = 98308,
        ClassMember = 106500
    }
    interface Symbol {
        flags: SymbolFlags;
        escapedName: __String;
        declarations?: Declaration[];
        valueDeclaration?: Declaration;
        members?: SymbolTable;
        exports?: SymbolTable;
        globalExports?: SymbolTable;
        exportSymbol?: Symbol;
    }
    interface Symbol {
        readonly name: string;
        getFlags(): SymbolFlags;
        getEscapedName(): __String;
        getName(): string;
        getDeclarations(): Declaration[] | undefined;
        getDocumentationComment(typeChecker: TypeChecker | undefined): SymbolDisplayPart[];
        getJsDocTags(checker?: TypeChecker): JSDocTagInfo[];
    }
    enum InternalSymbolName {
        Call = "__call",
        Constructor = "__constructor",
        New = "__new",
        Index = "__index",
        ExportStar = "__export",
        Global = "__global",
        Missing = "__missing",
        Type = "__type",
        Object = "__object",
        JSXAttributes = "__jsxAttributes",
        Class = "__class",
        Function = "__function",
        Computed = "__computed",
        Resolving = "__resolving__",
        ExportEquals = "export=",
        Default = "default",
        This = "this"
    }
    /**
     * This represents a string whose leading underscore have been escaped by adding extra leading underscores.
     * The shape of this brand is rather unique compared to others we've used.
     * Instead of just an intersection of a string and an object, it is that union-ed
     * with an intersection of void and an object. This makes it wholly incompatible
     * with a normal string (which is good, it cannot be misused on assignment or on usage),
     * while still being comparable with a normal string via === (also good) and castable from a string.
     */
    type __String = (string & {
        __escapedIdentifier: void;
    }) | (void & {
        __escapedIdentifier: void;
    }) | InternalSymbolName;
    /** ReadonlyMap where keys are `__String`s. */
    interface ReadonlyUnderscoreEscapedMap<T> extends ReadonlyESMap<__String, T> {
    }
    /** Map where keys are `__String`s. */
    interface UnderscoreEscapedMap<T> extends ESMap<__String, T>, ReadonlyUnderscoreEscapedMap<T> {
    }
    /** SymbolTable based on ES6 Map interface. */
    type SymbolTable = UnderscoreEscapedMap<Symbol>;
    enum TypeFlags {
        Any = 1,
        Unknown = 2,
        String = 4,
        Number = 8,
        Boolean = 16,
        Enum = 32,
        BigInt = 64,
        StringLiteral = 128,
        NumberLiteral = 256,
        BooleanLiteral = 512,
        EnumLiteral = 1024,
        BigIntLiteral = 2048,
        ESSymbol = 4096,
        UniqueESSymbol = 8192,
        Void = 16384,
        Undefined = 32768,
        Null = 65536,
        Never = 131072,
        TypeParameter = 262144,
        Object = 524288,
        Union = 1048576,
        Intersection = 2097152,
        Index = 4194304,
        IndexedAccess = 8388608,
        Conditional = 16777216,
        Substitution = 33554432,
        NonPrimitive = 67108864,
        TemplateLiteral = 134217728,
        StringMapping = 268435456,
        Literal = 2944,
        Unit = 109440,
        StringOrNumberLiteral = 384,
        PossiblyFalsy = 117724,
        StringLike = 402653316,
        NumberLike = 296,
        BigIntLike = 2112,
        BooleanLike = 528,
        EnumLike = 1056,
        ESSymbolLike = 12288,
        VoidLike = 49152,
        UnionOrIntersection = 3145728,
        StructuredType = 3670016,
        TypeVariable = 8650752,
        InstantiableNonPrimitive = 58982400,
        InstantiablePrimitive = 406847488,
        Instantiable = 465829888,
        StructuredOrInstantiable = 469499904,
        Narrowable = 536624127
    }
    type DestructuringPattern = BindingPattern | ObjectLiteralExpression | ArrayLiteralExpression;
    interface Type {
        flags: TypeFlags;
        symbol: Symbol;
        pattern?: DestructuringPattern;
        aliasSymbol?: Symbol;
        aliasTypeArguments?: readonly Type[];
    }
    interface Type {
        getFlags(): TypeFlags;
        getSymbol(): Symbol | undefined;
        getProperties(): Symbol[];
        getProperty(propertyName: string): Symbol | undefined;
        getApparentProperties(): Symbol[];
        getCallSignatures(): readonly Signature[];
        getConstructSignatures(): readonly Signature[];
        getStringIndexType(): Type | undefined;
        getNumberIndexType(): Type | undefined;
        getBaseTypes(): BaseType[] | undefined;
        getNonNullableType(): Type;
        getConstraint(): Type | undefined;
        getDefault(): Type | undefined;
        isUnion(): this is UnionType;
        isIntersection(): this is IntersectionType;
        isUnionOrIntersection(): this is UnionOrIntersectionType;
        isLiteral(): this is LiteralType;
        isStringLiteral(): this is StringLiteralType;
        isNumberLiteral(): this is NumberLiteralType;
        isTypeParameter(): this is TypeParameter;
        isClassOrInterface(): this is InterfaceType;
        isClass(): this is InterfaceType;
        isIndexType(): this is IndexType;
    }
    interface LiteralType extends Type {
        value: string | number | PseudoBigInt;
        freshType: LiteralType;
        regularType: LiteralType;
    }
    interface UniqueESSymbolType extends Type {
        symbol: Symbol;
        escapedName: __String;
    }
    interface StringLiteralType extends LiteralType {
        value: string;
    }
    interface NumberLiteralType extends LiteralType {
        value: number;
    }
    interface BigIntLiteralType extends LiteralType {
        value: PseudoBigInt;
    }
    interface EnumType extends Type {
    }
    enum ObjectFlags {
        Class = 1,
        Interface = 2,
        Reference = 4,
        Tuple = 8,
        Anonymous = 16,
        Mapped = 32,
        Instantiated = 64,
        ObjectLiteral = 128,
        EvolvingArray = 256,
        ObjectLiteralPatternWithComputedProperties = 512,
        ReverseMapped = 1024,
        JsxAttributes = 2048,
        JSLiteral = 4096,
        FreshLiteral = 8192,
        ArrayLiteral = 16384,
        Annotation = 134217728,
        ClassOrInterface = 3,
        ContainsSpread = 2097152,
        ObjectRestType = 4194304,
        InstantiationExpressionType = 8388608
    }
    interface ObjectType extends Type {
        objectFlags: ObjectFlags;
    }
    /** Class and interface types (ObjectFlags.Class and ObjectFlags.Interface). */
    interface InterfaceType extends ObjectType {
        typeParameters: TypeParameter[] | undefined;
        outerTypeParameters: TypeParameter[] | undefined;
        localTypeParameters: TypeParameter[] | undefined;
        thisType: TypeParameter | undefined;
    }
    type BaseType = ObjectType | IntersectionType | TypeVariable;
    interface InterfaceTypeWithDeclaredMembers extends InterfaceType {
        declaredProperties: Symbol[];
        declaredCallSignatures: Signature[];
        declaredConstructSignatures: Signature[];
        declaredIndexInfos: IndexInfo[];
    }
    /**
     * Type references (ObjectFlags.Reference). When a class or interface has type parameters or
     * a "this" type, references to the class or interface are made using type references. The
     * typeArguments property specifies the types to substitute for the type parameters of the
     * class or interface and optionally includes an extra element that specifies the type to
     * substitute for "this" in the resulting instantiation. When no extra argument is present,
     * the type reference itself is substituted for "this". The typeArguments property is undefined
     * if the class or interface has no type parameters and the reference isn't specifying an
     * explicit "this" argument.
     */
    interface TypeReference extends ObjectType {
        target: GenericType;
        node?: TypeReferenceNode | ArrayTypeNode | TupleTypeNode;
    }
    interface TypeReference {
        typeArguments?: readonly Type[];
    }
    interface DeferredTypeReference extends TypeReference {
    }
    interface GenericType extends InterfaceType, TypeReference {
    }
    enum ElementFlags {
        Required = 1,
        Optional = 2,
        Rest = 4,
        Variadic = 8,
        Fixed = 3,
        Variable = 12,
        NonRequired = 14,
        NonRest = 11
    }
    interface TupleType extends GenericType {
        elementFlags: readonly ElementFlags[];
        minLength: number;
        fixedLength: number;
        hasRestElement: boolean;
        combinedFlags: ElementFlags;
        readonly: boolean;
        labeledElementDeclarations?: readonly (NamedTupleMember | ParameterDeclaration)[];
    }
    interface TupleTypeReference extends TypeReference {
        target: TupleType;
    }
    interface UnionOrIntersectionType extends Type {
        types: Type[];
    }
    interface UnionType extends UnionOrIntersectionType {
    }
    interface IntersectionType extends UnionOrIntersectionType {
    }
    type StructuredType = ObjectType | UnionType | IntersectionType;
    interface EvolvingArrayType extends ObjectType {
        elementType: Type;
        finalArrayType?: Type;
    }
    interface InstantiableType extends Type {
    }
    interface TypeParameter extends InstantiableType {
    }
    interface IndexedAccessType extends InstantiableType {
        objectType: Type;
        indexType: Type;
        constraint?: Type;
        simplifiedForReading?: Type;
        simplifiedForWriting?: Type;
    }
    type TypeVariable = TypeParameter | IndexedAccessType;
    interface IndexType extends InstantiableType {
        type: InstantiableType | UnionOrIntersectionType;
    }
    interface ConditionalRoot {
        node: ConditionalTypeNode;
        checkType: Type;
        extendsType: Type;
        isDistributive: boolean;
        inferTypeParameters?: TypeParameter[];
        outerTypeParameters?: TypeParameter[];
        instantiations?: Map<Type>;
        aliasSymbol?: Symbol;
        aliasTypeArguments?: Type[];
    }
    interface ConditionalType extends InstantiableType {
        root: ConditionalRoot;
        checkType: Type;
        extendsType: Type;
        resolvedTrueType?: Type;
        resolvedFalseType?: Type;
    }
    interface TemplateLiteralType extends InstantiableType {
        texts: readonly string[];
        types: readonly Type[];
    }
    interface StringMappingType extends InstantiableType {
        symbol: Symbol;
        type: Type;
    }
    interface SubstitutionType extends InstantiableType {
        objectFlags: ObjectFlags;
        baseType: Type;
        constraint: Type;
    }
    enum SignatureKind {
        Call = 0,
        Construct = 1
    }
    interface Signature {
        declaration?: SignatureDeclaration | JSDocSignature;
        typeParameters?: readonly TypeParameter[];
        parameters: readonly Symbol[];
    }
    interface Signature {
        getDeclaration(): SignatureDeclaration;
        getTypeParameters(): TypeParameter[] | undefined;
        getParameters(): Symbol[];
        getTypeParameterAtPosition(pos: number): Type;
        getReturnType(): Type;
        getDocumentationComment(typeChecker: TypeChecker | undefined): SymbolDisplayPart[];
        getJsDocTags(): JSDocTagInfo[];
    }
    enum IndexKind {
        String = 0,
        Number = 1
    }
    interface IndexInfo {
        keyType: Type;
        type: Type;
        isReadonly: boolean;
        declaration?: IndexSignatureDeclaration;
    }
    enum InferencePriority {
        NakedTypeVariable = 1,
        SpeculativeTuple = 2,
        SubstituteSource = 4,
        HomomorphicMappedType = 8,
        PartialHomomorphicMappedType = 16,
        MappedTypeConstraint = 32,
        ContravariantConditional = 64,
        ReturnType = 128,
        LiteralKeyof = 256,
        NoConstraints = 512,
        AlwaysStrict = 1024,
        MaxValue = 2048,
        PriorityImpliesCombination = 416,
        Circularity = -1
    }
    /** @deprecated Use FileExtensionInfo instead. */
    type JsFileExtensionInfo = FileExtensionInfo;
    interface FileExtensionInfo {
        extension: string;
        isMixedContent: boolean;
        scriptKind?: ScriptKind;
    }
    interface DiagnosticMessage {
        key: string;
        category: DiagnosticCategory;
        code: number;
        message: string;
        reportsUnnecessary?: {};
        reportsDeprecated?: {};
    }
    /**
     * A linked list of formatted diagnostic messages to be used as part of a multiline message.
     * It is built from the bottom up, leaving the head to be the "main" diagnostic.
     * While it seems that DiagnosticMessageChain is structurally similar to DiagnosticMessage,
     * the difference is that messages are all preformatted in DMC.
     */
    interface DiagnosticMessageChain {
        messageText: string;
        category: DiagnosticCategory;
        code: number;
        next?: DiagnosticMessageChain[];
    }
    interface Diagnostic extends DiagnosticRelatedInformation {
        /** May store more in future. For now, this will simply be `true` to indicate when a diagnostic is an unused-identifier diagnostic. */
        reportsUnnecessary?: {};
        reportsDeprecated?: {};
        source?: string;
        relatedInformation?: DiagnosticRelatedInformation[];
    }
    interface DiagnosticRelatedInformation {
        category: DiagnosticCategory;
        code: number;
        file: SourceFile | undefined;
        start: number | undefined;
        length: number | undefined;
        messageText: string | DiagnosticMessageChain;
    }
    interface DiagnosticWithLocation extends Diagnostic {
        file: SourceFile;
        start: number;
        length: number;
    }
    enum DiagnosticCategory {
        Warning = 0,
        Error = 1,
        Suggestion = 2,
        Message = 3
    }
    enum ModuleResolutionKind {
        Classic = 1,
        NodeJs = 2,
        Node16 = 3,
        NodeNext = 99
    }
    enum ModuleDetectionKind {
        /**
         * Files with imports, exports and/or import.meta are considered modules
         */
        Legacy = 1,
        /**
         * Legacy, but also files with jsx under react-jsx or react-jsxdev and esm mode files under moduleResolution: node16+
         */
        Auto = 2,
        /**
         * Consider all non-declaration files modules, regardless of present syntax
         */
        Force = 3
    }
    interface PluginImport {
        name: string;
    }
    interface ProjectReference {
        /** A normalized path on disk */
        path: string;
        /** The path as the user originally wrote it */
        originalPath?: string;
        /** True if the output of this reference should be prepended to the output of this project. Only valid for --outFile compilations */
        prepend?: boolean;
        /** True if it is intended that this reference form a circularity */
        circular?: boolean;
    }
    enum WatchFileKind {
        FixedPollingInterval = 0,
        PriorityPollingInterval = 1,
        DynamicPriorityPolling = 2,
        FixedChunkSizePolling = 3,
        UseFsEvents = 4,
        UseFsEventsOnParentDirectory = 5
    }
    enum WatchDirectoryKind {
        UseFsEvents = 0,
        FixedPollingInterval = 1,
        DynamicPriorityPolling = 2,
        FixedChunkSizePolling = 3
    }
    enum PollingWatchKind {
        FixedInterval = 0,
        PriorityInterval = 1,
        DynamicPriority = 2,
        FixedChunkSize = 3
    }
    type CompilerOptionsValue = string | number | boolean | (string | number)[] | string[] | MapLike<string[]> | PluginImport[] | ProjectReference[] | null | undefined | EtsOptions;
    interface CompilerOptions {
        allowJs?: boolean;
        allowSyntheticDefaultImports?: boolean;
        allowUmdGlobalAccess?: boolean;
        allowUnreachableCode?: boolean;
        allowUnusedLabels?: boolean;
        alwaysStrict?: boolean;
        baseUrl?: string;
        charset?: string;
        checkJs?: boolean;
        declaration?: boolean;
        declarationMap?: boolean;
        emitDeclarationOnly?: boolean;
        declarationDir?: string;
        disableSizeLimit?: boolean;
        disableSourceOfProjectReferenceRedirect?: boolean;
        disableSolutionSearching?: boolean;
        disableReferencedProjectLoad?: boolean;
        downlevelIteration?: boolean;
        emitBOM?: boolean;
        emitDecoratorMetadata?: boolean;
        exactOptionalPropertyTypes?: boolean;
        experimentalDecorators?: boolean;
        forceConsistentCasingInFileNames?: boolean;
        importHelpers?: boolean;
        importsNotUsedAsValues?: ImportsNotUsedAsValues;
        inlineSourceMap?: boolean;
        inlineSources?: boolean;
        isolatedModules?: boolean;
        jsx?: JsxEmit;
        keyofStringsOnly?: boolean;
        lib?: string[];
        locale?: string;
        mapRoot?: string;
        maxNodeModuleJsDepth?: number;
        module?: ModuleKind;
        moduleResolution?: ModuleResolutionKind;
        moduleSuffixes?: string[];
        moduleDetection?: ModuleDetectionKind;
        newLine?: NewLineKind;
        noEmit?: boolean;
        noEmitHelpers?: boolean;
        noEmitOnError?: boolean;
        noErrorTruncation?: boolean;
        noFallthroughCasesInSwitch?: boolean;
        noImplicitAny?: boolean;
        noImplicitReturns?: boolean;
        noImplicitThis?: boolean;
        noStrictGenericChecks?: boolean;
        noUnusedLocals?: boolean;
        noUnusedParameters?: boolean;
        noImplicitUseStrict?: boolean;
        noPropertyAccessFromIndexSignature?: boolean;
        assumeChangesOnlyAffectDirectDependencies?: boolean;
        noLib?: boolean;
        noResolve?: boolean;
        noUncheckedIndexedAccess?: boolean;
        out?: string;
        outDir?: string;
        outFile?: string;
        paths?: MapLike<string[]>;
        preserveConstEnums?: boolean;
        noImplicitOverride?: boolean;
        preserveSymlinks?: boolean;
        preserveValueImports?: boolean;
        project?: string;
        reactNamespace?: string;
        jsxFactory?: string;
        jsxFragmentFactory?: string;
        jsxImportSource?: string;
        composite?: boolean;
        incremental?: boolean;
        tsBuildInfoFile?: string;
        removeComments?: boolean;
        rootDir?: string;
        rootDirs?: string[];
        skipLibCheck?: boolean;
        skipDefaultLibCheck?: boolean;
        sourceMap?: boolean;
        sourceRoot?: string;
        strict?: boolean;
        strictFunctionTypes?: boolean;
        strictBindCallApply?: boolean;
        strictNullChecks?: boolean;
        strictPropertyInitialization?: boolean;
        stripInternal?: boolean;
        suppressExcessPropertyErrors?: boolean;
        suppressImplicitAnyIndexErrors?: boolean;
        target?: ScriptTarget;
        traceResolution?: boolean;
        useUnknownInCatchVariables?: boolean;
        resolveJsonModule?: boolean;
        types?: string[];
        /** Paths used to compute primary types search locations */
        typeRoots?: string[];
        esModuleInterop?: boolean;
        useDefineForClassFields?: boolean;
        ets?: EtsOptions;
        packageManagerType?: string;
        emitNodeModulesFiles?: boolean;
        etsLoaderPath?: string;
        tsImportSendableEnable?: boolean;
        skipPathsInKeyForCompilationSettings?: boolean;
        compatibleSdkVersion?: number;
        compatibleSdkVersionStage?: string;
        noTransformedKitInParser?: boolean;
        [option: string]: CompilerOptionsValue | TsConfigSourceFile | undefined;
        etsAnnotationsEnable?: boolean;
        maxFlowDepth?: number;
        skipOhModulesLint?: boolean;
        mixCompile?: boolean;
    }
    interface EtsOptions {
        render: {
            method: string[];
            decorator: string[];
        };
        components: string[];
        libs: string[];
        extend: {
            decorator: string[];
            components: {
                name: string;
                type: string;
                instance: string;
            }[];
        };
        styles: {
            decorator: string;
            component: {
                name: string;
                type: string;
                instance: string;
            };
            property: string;
        };
        concurrent: {
            decorator: string;
        };
        customComponent?: string;
        propertyDecorators: {
            name: string;
            needInitialization: boolean;
        }[];
        emitDecorators: {
            name: string;
            emitParameters: boolean;
        }[];
        syntaxComponents: {
            paramsUICallback: string[];
            attrUICallback: {
                name: string;
                attributes: string[];
            }[];
        };
    }
    interface WatchOptions {
        watchFile?: WatchFileKind;
        watchDirectory?: WatchDirectoryKind;
        fallbackPolling?: PollingWatchKind;
        synchronousWatchDirectory?: boolean;
        excludeDirectories?: string[];
        excludeFiles?: string[];
        [option: string]: CompilerOptionsValue | undefined;
    }
    interface TypeAcquisition {
        /**
         * @deprecated typingOptions.enableAutoDiscovery
         * Use typeAcquisition.enable instead.
         */
        enableAutoDiscovery?: boolean;
        enable?: boolean;
        include?: string[];
        exclude?: string[];
        disableFilenameBasedTypeAcquisition?: boolean;
        [option: string]: CompilerOptionsValue | undefined;
    }
    enum ModuleKind {
        None = 0,
        CommonJS = 1,
        AMD = 2,
        UMD = 3,
        System = 4,
        ES2015 = 5,
        ES2020 = 6,
        ES2022 = 7,
        ESNext = 99,
        Node16 = 100,
        NodeNext = 199
    }
    enum JsxEmit {
        None = 0,
        Preserve = 1,
        React = 2,
        ReactNative = 3,
        ReactJSX = 4,
        ReactJSXDev = 5
    }
    enum ImportsNotUsedAsValues {
        Remove = 0,
        Preserve = 1,
        Error = 2
    }
    enum NewLineKind {
        CarriageReturnLineFeed = 0,
        LineFeed = 1
    }
    interface LineAndCharacter {
        /** 0-based. */
        line: number;
        character: number;
    }
    enum ScriptKind {
        Unknown = 0,
        JS = 1,
        JSX = 2,
        TS = 3,
        TSX = 4,
        External = 5,
        JSON = 6,
        /**
         * Used on extensions that doesn't define the ScriptKind but the content defines it.
         * Deferred extensions are going to be included in all project contexts.
         */
        Deferred = 7,
        ETS = 8
    }
    enum ScriptTarget {
        ES3 = 0,
        ES5 = 1,
        ES2015 = 2,
        ES2016 = 3,
        ES2017 = 4,
        ES2018 = 5,
        ES2019 = 6,
        ES2020 = 7,
        ES2021 = 8,
        ES2022 = 9,
        ESNext = 99,
        JSON = 100,
        Latest = 99
    }
    enum LanguageVariant {
        Standard = 0,
        JSX = 1
    }
    /** Either a parsed command line or a parsed tsconfig.json */
    interface ParsedCommandLine {
        options: CompilerOptions;
        typeAcquisition?: TypeAcquisition;
        fileNames: string[];
        projectReferences?: readonly ProjectReference[];
        watchOptions?: WatchOptions;
        raw?: any;
        errors: Diagnostic[];
        wildcardDirectories?: MapLike<WatchDirectoryFlags>;
        compileOnSave?: boolean;
    }
    enum WatchDirectoryFlags {
        None = 0,
        Recursive = 1
    }
    interface CreateProgramOptions {
        rootNames: readonly string[];
        options: CompilerOptions;
        projectReferences?: readonly ProjectReference[];
        host?: CompilerHost;
        oldProgram?: Program;
        configFileParsingDiagnostics?: readonly Diagnostic[];
    }
    interface ModuleResolutionHost {
        fileExists(fileName: string): boolean;
        readFile(fileName: string): string | undefined;
        trace?(s: string): void;
        directoryExists?(directoryName: string): boolean;
        /**
         * Resolve a symbolic link.
         * @see https://nodejs.org/api/fs.html#fs_fs_realpathsync_path_options
         */
        realpath?(path: string): string;
        getCurrentDirectory?(): string;
        getDirectories?(path: string): string[];
        useCaseSensitiveFileNames?: boolean | (() => boolean) | undefined;
        getJsDocNodeCheckedConfig?(jsDocFileCheckInfo: FileCheckModuleInfo, symbolSourceFilePath: string): JsDocNodeCheckConfig;
        getJsDocNodeConditionCheckedResult?(jsDocFileCheckedInfo: FileCheckModuleInfo, jsDocTagInfos: JsDocTagInfo[], jsDocs?: JSDoc[]): ConditionCheckResult;
        getFileCheckedModuleInfo?(containFilePath: string): FileCheckModuleInfo;
    }
    /**
     * Used by services to specify the minimum host area required to set up source files under any compilation settings
     */
    interface MinimalResolutionCacheHost extends ModuleResolutionHost {
        getCompilationSettings(): CompilerOptions;
        getCompilerHost?(): CompilerHost | undefined;
    }
    /**
     * Represents the result of module resolution.
     * Module resolution will pick up tsx/jsx/js files even if '--jsx' and '--allowJs' are turned off.
     * The Program will then filter results based on these flags.
     *
     * Prefer to return a `ResolvedModuleFull` so that the file type does not have to be inferred.
     */
    interface ResolvedModule {
        /** Path of the file the module was resolved to. */
        resolvedFileName: string;
        /** True if `resolvedFileName` comes from `node_modules`. */
        isExternalLibraryImport?: boolean;
    }
    /**
     * ResolvedModule with an explicitly provided `extension` property.
     * Prefer this over `ResolvedModule`.
     * If changing this, remember to change `moduleResolutionIsEqualTo`.
     */
    interface ResolvedModuleFull extends ResolvedModule {
        /**
         * Extension of resolvedFileName. This must match what's at the end of resolvedFileName.
         * This is optional for backwards-compatibility, but will be added if not provided.
         */
        extension: Extension;
        packageId?: PackageId;
    }
    /**
     * Unique identifier with a package name and version.
     * If changing this, remember to change `packageIdIsEqual`.
     */
    interface PackageId {
        /**
         * Name of the package.
         * Should not include `@types`.
         * If accessing a non-index file, this should include its name e.g. "foo/bar".
         */
        name: string;
        /**
         * Name of a submodule within this package.
         * May be "".
         */
        subModuleName: string;
        /** Version of the package, e.g. "1.2.3" */
        version: string;
    }
    enum Extension {
        Ts = ".ts",
        Tsx = ".tsx",
        Dts = ".d.ts",
        Js = ".js",
        Jsx = ".jsx",
        Json = ".json",
        TsBuildInfo = ".tsbuildinfo",
        Mjs = ".mjs",
        Mts = ".mts",
        Dmts = ".d.mts",
        Cjs = ".cjs",
        Cts = ".cts",
        Dcts = ".d.cts",
        Ets = ".ets",
        Dets = ".d.ets"
    }
    interface ResolvedModuleWithFailedLookupLocations {
        readonly resolvedModule: ResolvedModuleFull | undefined;
    }
    interface ResolvedTypeReferenceDirective {
        primary: boolean;
        resolvedFileName: string | undefined;
        packageId?: PackageId;
        /** True if `resolvedFileName` comes from `node_modules` or `oh_modules`. */
        isExternalLibraryImport?: boolean;
    }
    interface ResolvedTypeReferenceDirectiveWithFailedLookupLocations {
        readonly resolvedTypeReferenceDirective: ResolvedTypeReferenceDirective | undefined;
        readonly failedLookupLocations: string[];
    }
    interface FileCheckModuleInfo {
        fileNeedCheck: boolean;
        checkPayload: any;
        currentFileName: string;
        tagName?: string[];
    }
    interface JsDocNodeCheckConfig {
        nodeNeedCheck: boolean;
        checkConfig: JsDocNodeCheckConfigItem[];
    }
    interface JsDocNodeCheckConfigItem {
        tagName: string[];
        message: string;
        needConditionCheck: boolean;
        type: DiagnosticCategory;
        specifyCheckConditionFuncName: string;
        tagNameShouldExisted: boolean;
        checkValidCallback?: (jsDocTag: JSDocTag, config: JsDocNodeCheckConfigItem) => boolean;
        checkJsDocSpecialValidCallback?: (jsDocTags: readonly JSDocTag[], config: JsDocNodeCheckConfigItem) => boolean;
        checkConditionValidCallback?: (node: CallExpression, specifyFuncName: string, importSymbol: string, jsDocs?: JSDoc[]) => boolean;
    }
    interface TagCheckParam {
        needCheck: boolean;
        checkConfig: TagCheckConfig[];
    }
    interface TagCheckConfig {
        tagName: string;
        message: string;
        needConditionCheck: boolean;
        specifyCheckConditionFuncName: string;
    }
    interface ConditionCheckResult {
        valid: boolean;
        type?: DiagnosticCategory;
        message?: string;
    }
    interface CompilerHost extends ModuleResolutionHost {
        getSourceFile(fileName: string, languageVersionOrOptions: ScriptTarget | CreateSourceFileOptions, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean, options?: CompilerOptions): SourceFile | undefined;
        getSourceFileByPath?(fileName: string, path: Path, languageVersionOrOptions: ScriptTarget | CreateSourceFileOptions, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): SourceFile | undefined;
        getCancellationToken?(): CancellationToken;
        getDefaultLibFileName(options: CompilerOptions): string;
        getDefaultLibLocation?(): string;
        writeFile: WriteFileCallback;
        getCurrentDirectory(): string;
        getCanonicalFileName(fileName: string): string;
        useCaseSensitiveFileNames(): boolean;
        getNewLine(): string;
        readDirectory?(rootDir: string, extensions: readonly string[], excludes: readonly string[] | undefined, includes: readonly string[], depth?: number): string[];
        resolveModuleNames?(moduleNames: string[], containingFile: string, reusedNames: string[] | undefined, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingSourceFile?: SourceFile): (ResolvedModule | undefined)[];
        /**
         * Returns the module resolution cache used by a provided `resolveModuleNames` implementation so that any non-name module resolution operations (eg, package.json lookup) can reuse it
         */
        getModuleResolutionCache?(): ModuleResolutionCache | undefined;
        /**
         * This method is a companion for 'resolveModuleNames' and is used to resolve 'types' references to actual type declaration files
         */
        resolveTypeReferenceDirectives?(typeReferenceDirectiveNames: string[] | readonly FileReference[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingFileMode?: SourceFile["impliedNodeFormat"] | undefined): (ResolvedTypeReferenceDirective | undefined)[];
        getEnvironmentVariable?(name: string): string | undefined;
        /** If provided along with custom resolveModuleNames or resolveTypeReferenceDirectives, used to determine if unchanged file path needs to re-resolve modules/type reference directives */
        hasInvalidatedResolutions?(filePath: Path): boolean;
        createHash?(data: string): string;
        getParsedCommandLine?(fileName: string): ParsedCommandLine | undefined;
        /**
         * get tagName where need to be determined based on the file path
         * @param jsDocFileCheckInfo filePath
         * @param symbolSourceFilePath filePath
         */
        getJsDocNodeCheckedConfig?(jsDocFileCheckInfo: FileCheckModuleInfo, symbolSourceFilePath: string): JsDocNodeCheckConfig;
        /**
         * get checked results based on the file path and jsDocs
         * @param jsDocFileCheckedInfo
         * @param jsDocs
         */
        getJsDocNodeConditionCheckedResult?(jsDocFileCheckedInfo: FileCheckModuleInfo, jsDocTagInfos: JsDocTagInfo[], jsDocs?: JSDoc[]): ConditionCheckResult;
        getFileCheckedModuleInfo?(containFilePath: string): FileCheckModuleInfo;
        getLastCompiledProgram?(): Program;
        isStaticSourceFile?(filePath: string): boolean;
    }
    interface SourceMapRange extends TextRange {
        source?: SourceMapSource;
    }
    interface SourceMapSource {
        fileName: string;
        text: string;
        skipTrivia?: (pos: number) => number;
    }
    interface SourceMapSource {
        getLineAndCharacterOfPosition(pos: number): LineAndCharacter;
    }
    enum EmitFlags {
        None = 0,
        SingleLine = 1,
        AdviseOnEmitNode = 2,
        NoSubstitution = 4,
        CapturesThis = 8,
        NoLeadingSourceMap = 16,
        NoTrailingSourceMap = 32,
        NoSourceMap = 48,
        NoNestedSourceMaps = 64,
        NoTokenLeadingSourceMaps = 128,
        NoTokenTrailingSourceMaps = 256,
        NoTokenSourceMaps = 384,
        NoLeadingComments = 512,
        NoTrailingComments = 1024,
        NoComments = 1536,
        NoNestedComments = 2048,
        HelperName = 4096,
        ExportName = 8192,
        LocalName = 16384,
        InternalName = 32768,
        Indented = 65536,
        NoIndentation = 131072,
        AsyncFunctionBody = 262144,
        ReuseTempVariableScope = 524288,
        CustomPrologue = 1048576,
        NoHoisting = 2097152,
        HasEndOfDeclarationMarker = 4194304,
        Iterator = 8388608,
        NoAsciiEscaping = 16777216
    }
    interface EmitHelperBase {
        readonly name: string;
        readonly scoped: boolean;
        readonly text: string | ((node: EmitHelperUniqueNameCallback) => string);
        readonly priority?: number;
        readonly dependencies?: EmitHelper[];
    }
    interface ScopedEmitHelper extends EmitHelperBase {
        readonly scoped: true;
    }
    interface UnscopedEmitHelper extends EmitHelperBase {
        readonly scoped: false;
        readonly text: string;
    }
    type EmitHelper = ScopedEmitHelper | UnscopedEmitHelper;
    type EmitHelperUniqueNameCallback = (name: string) => string;
    enum EmitHint {
        SourceFile = 0,
        Expression = 1,
        IdentifierName = 2,
        MappedTypeParameter = 3,
        Unspecified = 4,
        EmbeddedStatement = 5,
        JsxAttributeValue = 6
    }
    interface SourceFileMayBeEmittedHost {
        getCompilerOptions(): CompilerOptions;
        isSourceFileFromExternalLibrary(file: SourceFile): boolean;
        getResolvedProjectReferenceToRedirect(fileName: string): ResolvedProjectReference | undefined;
        isSourceOfProjectReferenceRedirect(fileName: string): boolean;
    }
    interface EmitHost extends ScriptReferenceHost, ModuleSpecifierResolutionHost, SourceFileMayBeEmittedHost {
        getSourceFiles(): readonly SourceFile[];
        useCaseSensitiveFileNames(): boolean;
        getCurrentDirectory(): string;
        getLibFileFromReference(ref: FileReference): SourceFile | undefined;
        getCommonSourceDirectory(): string;
        getCanonicalFileName(fileName: string): string;
        getNewLine(): string;
        isEmitBlocked(emitFileName: string): boolean;
        getPrependNodes(): readonly (InputFiles | UnparsedSource)[];
        writeFile: WriteFileCallback;
        getSourceFileFromReference: Program["getSourceFileFromReference"];
        readonly redirectTargetsMap: RedirectTargetsMap;
        createHash?(data: string): string;
    }
    enum OuterExpressionKinds {
        Parentheses = 1,
        TypeAssertions = 2,
        NonNullAssertions = 4,
        PartiallyEmittedExpressions = 8,
        Assertions = 6,
        All = 15,
        ExcludeJSDocTypeAssertion = 16
    }
    type TypeOfTag = "undefined" | "number" | "bigint" | "boolean" | "string" | "symbol" | "object" | "function";
    interface NodeFactory {
        createNodeArray<T extends Node>(elements?: readonly T[], hasTrailingComma?: boolean): NodeArray<T>;
        createNumericLiteral(value: string | number, numericLiteralFlags?: TokenFlags): NumericLiteral;
        createBigIntLiteral(value: string | PseudoBigInt): BigIntLiteral;
        createStringLiteral(text: string, isSingleQuote?: boolean): StringLiteral;
        createStringLiteralFromNode(sourceNode: PropertyNameLiteral | PrivateIdentifier, isSingleQuote?: boolean): StringLiteral;
        createRegularExpressionLiteral(text: string): RegularExpressionLiteral;
        createIdentifier(text: string): Identifier;
        /**
         * Create a unique temporary variable.
         * @param recordTempVariable An optional callback used to record the temporary variable name. This
         * should usually be a reference to `hoistVariableDeclaration` from a `TransformationContext`, but
         * can be `undefined` if you plan to record the temporary variable manually.
         * @param reservedInNestedScopes When `true`, reserves the temporary variable name in all nested scopes
         * during emit so that the variable can be referenced in a nested function body. This is an alternative to
         * setting `EmitFlags.ReuseTempVariableScope` on the nested function itself.
         */
        createTempVariable(recordTempVariable: ((node: Identifier) => void) | undefined, reservedInNestedScopes?: boolean): Identifier;
        /**
         * Create a unique temporary variable for use in a loop.
         * @param reservedInNestedScopes When `true`, reserves the temporary variable name in all nested scopes
         * during emit so that the variable can be referenced in a nested function body. This is an alternative to
         * setting `EmitFlags.ReuseTempVariableScope` on the nested function itself.
         */
        createLoopVariable(reservedInNestedScopes?: boolean): Identifier;
        /** Create a unique name based on the supplied text. */
        createUniqueName(text: string, flags?: GeneratedIdentifierFlags): Identifier;
        /** Create a unique name generated for a node. */
        getGeneratedNameForNode(node: Node | undefined, flags?: GeneratedIdentifierFlags): Identifier;
        createPrivateIdentifier(text: string): PrivateIdentifier;
        createUniquePrivateName(text?: string): PrivateIdentifier;
        getGeneratedPrivateNameForNode(node: Node): PrivateIdentifier;
        createToken(token: SyntaxKind.SuperKeyword): SuperExpression;
        createToken(token: SyntaxKind.ThisKeyword): ThisExpression;
        createToken(token: SyntaxKind.NullKeyword): NullLiteral;
        createToken(token: SyntaxKind.TrueKeyword): TrueLiteral;
        createToken(token: SyntaxKind.FalseKeyword): FalseLiteral;
        createToken<TKind extends PunctuationSyntaxKind>(token: TKind): PunctuationToken<TKind>;
        createToken<TKind extends KeywordTypeSyntaxKind>(token: TKind): KeywordTypeNode<TKind>;
        createToken<TKind extends ModifierSyntaxKind>(token: TKind): ModifierToken<TKind>;
        createToken<TKind extends KeywordSyntaxKind>(token: TKind): KeywordToken<TKind>;
        createToken<TKind extends SyntaxKind.Unknown | SyntaxKind.EndOfFileToken>(token: TKind): Token<TKind>;
        createSuper(): SuperExpression;
        createThis(): ThisExpression;
        createNull(): NullLiteral;
        createTrue(): TrueLiteral;
        createFalse(): FalseLiteral;
        createModifier<T extends ModifierSyntaxKind>(kind: T): ModifierToken<T>;
        createModifiersFromModifierFlags(flags: ModifierFlags): Modifier[] | undefined;
        createQualifiedName(left: EntityName, right: string | Identifier): QualifiedName;
        updateQualifiedName(node: QualifiedName, left: EntityName, right: Identifier): QualifiedName;
        createComputedPropertyName(expression: Expression): ComputedPropertyName;
        updateComputedPropertyName(node: ComputedPropertyName, expression: Expression): ComputedPropertyName;
        createTypeParameterDeclaration(modifiers: readonly Modifier[] | undefined, name: string | Identifier, constraint?: TypeNode, defaultType?: TypeNode): TypeParameterDeclaration;
        updateTypeParameterDeclaration(node: TypeParameterDeclaration, modifiers: readonly Modifier[] | undefined, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined): TypeParameterDeclaration;
        createParameterDeclaration(modifiers: readonly ModifierLike[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken?: QuestionToken, type?: TypeNode, initializer?: Expression): ParameterDeclaration;
        updateParameterDeclaration(node: ParameterDeclaration, modifiers: readonly ModifierLike[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): ParameterDeclaration;
        createDecorator(expression: Expression, annotationDeclaration?: AnnotationDeclaration): Decorator;
        updateDecorator(node: Decorator, expression: Expression, annotationDeclaration?: AnnotationDeclaration): Decorator;
        createPropertySignature(modifiers: readonly Modifier[] | undefined, name: PropertyName | string, questionToken: QuestionToken | undefined, type: TypeNode | undefined): PropertySignature;
        updatePropertySignature(node: PropertySignature, modifiers: readonly Modifier[] | undefined, name: PropertyName, questionToken: QuestionToken | undefined, type: TypeNode | undefined): PropertySignature;
        createPropertyDeclaration(modifiers: readonly ModifierLike[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration;
        updatePropertyDeclaration(node: PropertyDeclaration, modifiers: readonly ModifierLike[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration;
        createAnnotationPropertyDeclaration(name: string | PropertyName, type: TypeNode | undefined, initializer: Expression | undefined): AnnotationPropertyDeclaration;
        updateAnnotationPropertyDeclaration(node: AnnotationPropertyDeclaration, name: string | PropertyName, type: TypeNode | undefined, initializer: Expression | undefined): AnnotationPropertyDeclaration;
        createMethodSignature(modifiers: readonly Modifier[] | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): MethodSignature;
        updateMethodSignature(node: MethodSignature, modifiers: readonly Modifier[] | undefined, name: PropertyName, questionToken: QuestionToken | undefined, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined): MethodSignature;
        createMethodDeclaration(modifiers: readonly ModifierLike[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration;
        updateMethodDeclaration(node: MethodDeclaration, modifiers: readonly ModifierLike[] | undefined, asteriskToken: AsteriskToken | undefined, name: PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration;
        createConstructorDeclaration(modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration;
        updateConstructorDeclaration(node: ConstructorDeclaration, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration;
        createGetAccessorDeclaration(modifiers: readonly ModifierLike[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration;
        updateGetAccessorDeclaration(node: GetAccessorDeclaration, modifiers: readonly ModifierLike[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration;
        createSetAccessorDeclaration(modifiers: readonly ModifierLike[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration;
        updateSetAccessorDeclaration(node: SetAccessorDeclaration, modifiers: readonly ModifierLike[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration;
        createCallSignature(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): CallSignatureDeclaration;
        updateCallSignature(node: CallSignatureDeclaration, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined): CallSignatureDeclaration;
        createConstructSignature(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): ConstructSignatureDeclaration;
        updateConstructSignature(node: ConstructSignatureDeclaration, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined): ConstructSignatureDeclaration;
        createIndexSignature(modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration;
        updateIndexSignature(node: IndexSignatureDeclaration, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration;
        createTemplateLiteralTypeSpan(type: TypeNode, literal: TemplateMiddle | TemplateTail): TemplateLiteralTypeSpan;
        updateTemplateLiteralTypeSpan(node: TemplateLiteralTypeSpan, type: TypeNode, literal: TemplateMiddle | TemplateTail): TemplateLiteralTypeSpan;
        createClassStaticBlockDeclaration(body: Block): ClassStaticBlockDeclaration;
        updateClassStaticBlockDeclaration(node: ClassStaticBlockDeclaration, body: Block): ClassStaticBlockDeclaration;
        createKeywordTypeNode<TKind extends KeywordTypeSyntaxKind>(kind: TKind): KeywordTypeNode<TKind>;
        createTypePredicateNode(assertsModifier: AssertsKeyword | undefined, parameterName: Identifier | ThisTypeNode | string, type: TypeNode | undefined): TypePredicateNode;
        updateTypePredicateNode(node: TypePredicateNode, assertsModifier: AssertsKeyword | undefined, parameterName: Identifier | ThisTypeNode, type: TypeNode | undefined): TypePredicateNode;
        createTypeReferenceNode(typeName: string | EntityName, typeArguments?: readonly TypeNode[]): TypeReferenceNode;
        updateTypeReferenceNode(node: TypeReferenceNode, typeName: EntityName, typeArguments: NodeArray<TypeNode> | undefined): TypeReferenceNode;
        createFunctionTypeNode(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): FunctionTypeNode;
        updateFunctionTypeNode(node: FunctionTypeNode, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode): FunctionTypeNode;
        createConstructorTypeNode(modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): ConstructorTypeNode;
        updateConstructorTypeNode(node: ConstructorTypeNode, modifiers: readonly Modifier[] | undefined, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode): ConstructorTypeNode;
        createTypeQueryNode(exprName: EntityName, typeArguments?: readonly TypeNode[]): TypeQueryNode;
        updateTypeQueryNode(node: TypeQueryNode, exprName: EntityName, typeArguments?: readonly TypeNode[]): TypeQueryNode;
        createTypeLiteralNode(members: readonly TypeElement[] | undefined): TypeLiteralNode;
        updateTypeLiteralNode(node: TypeLiteralNode, members: NodeArray<TypeElement>): TypeLiteralNode;
        createArrayTypeNode(elementType: TypeNode): ArrayTypeNode;
        updateArrayTypeNode(node: ArrayTypeNode, elementType: TypeNode): ArrayTypeNode;
        createTupleTypeNode(elements: readonly (TypeNode | NamedTupleMember)[]): TupleTypeNode;
        updateTupleTypeNode(node: TupleTypeNode, elements: readonly (TypeNode | NamedTupleMember)[]): TupleTypeNode;
        createNamedTupleMember(dotDotDotToken: DotDotDotToken | undefined, name: Identifier, questionToken: QuestionToken | undefined, type: TypeNode): NamedTupleMember;
        updateNamedTupleMember(node: NamedTupleMember, dotDotDotToken: DotDotDotToken | undefined, name: Identifier, questionToken: QuestionToken | undefined, type: TypeNode): NamedTupleMember;
        createOptionalTypeNode(type: TypeNode): OptionalTypeNode;
        updateOptionalTypeNode(node: OptionalTypeNode, type: TypeNode): OptionalTypeNode;
        createRestTypeNode(type: TypeNode): RestTypeNode;
        updateRestTypeNode(node: RestTypeNode, type: TypeNode): RestTypeNode;
        createUnionTypeNode(types: readonly TypeNode[]): UnionTypeNode;
        updateUnionTypeNode(node: UnionTypeNode, types: NodeArray<TypeNode>): UnionTypeNode;
        createIntersectionTypeNode(types: readonly TypeNode[]): IntersectionTypeNode;
        updateIntersectionTypeNode(node: IntersectionTypeNode, types: NodeArray<TypeNode>): IntersectionTypeNode;
        createConditionalTypeNode(checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode): ConditionalTypeNode;
        updateConditionalTypeNode(node: ConditionalTypeNode, checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode): ConditionalTypeNode;
        createInferTypeNode(typeParameter: TypeParameterDeclaration): InferTypeNode;
        updateInferTypeNode(node: InferTypeNode, typeParameter: TypeParameterDeclaration): InferTypeNode;
        createImportTypeNode(argument: TypeNode, assertions?: ImportTypeAssertionContainer, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean): ImportTypeNode;
        updateImportTypeNode(node: ImportTypeNode, argument: TypeNode, assertions: ImportTypeAssertionContainer | undefined, qualifier: EntityName | undefined, typeArguments: readonly TypeNode[] | undefined, isTypeOf?: boolean): ImportTypeNode;
        createParenthesizedType(type: TypeNode): ParenthesizedTypeNode;
        updateParenthesizedType(node: ParenthesizedTypeNode, type: TypeNode): ParenthesizedTypeNode;
        createThisTypeNode(): ThisTypeNode;
        createTypeOperatorNode(operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword, type: TypeNode): TypeOperatorNode;
        updateTypeOperatorNode(node: TypeOperatorNode, type: TypeNode): TypeOperatorNode;
        createIndexedAccessTypeNode(objectType: TypeNode, indexType: TypeNode): IndexedAccessTypeNode;
        updateIndexedAccessTypeNode(node: IndexedAccessTypeNode, objectType: TypeNode, indexType: TypeNode): IndexedAccessTypeNode;
        createMappedTypeNode(readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, nameType: TypeNode | undefined, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined, members: NodeArray<TypeElement> | undefined): MappedTypeNode;
        updateMappedTypeNode(node: MappedTypeNode, readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, nameType: TypeNode | undefined, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined, members: NodeArray<TypeElement> | undefined): MappedTypeNode;
        createLiteralTypeNode(literal: LiteralTypeNode["literal"]): LiteralTypeNode;
        updateLiteralTypeNode(node: LiteralTypeNode, literal: LiteralTypeNode["literal"]): LiteralTypeNode;
        createTemplateLiteralType(head: TemplateHead, templateSpans: readonly TemplateLiteralTypeSpan[]): TemplateLiteralTypeNode;
        updateTemplateLiteralType(node: TemplateLiteralTypeNode, head: TemplateHead, templateSpans: readonly TemplateLiteralTypeSpan[]): TemplateLiteralTypeNode;
        createObjectBindingPattern(elements: readonly BindingElement[]): ObjectBindingPattern;
        updateObjectBindingPattern(node: ObjectBindingPattern, elements: readonly BindingElement[]): ObjectBindingPattern;
        createArrayBindingPattern(elements: readonly ArrayBindingElement[]): ArrayBindingPattern;
        updateArrayBindingPattern(node: ArrayBindingPattern, elements: readonly ArrayBindingElement[]): ArrayBindingPattern;
        createBindingElement(dotDotDotToken: DotDotDotToken | undefined, propertyName: string | PropertyName | undefined, name: string | BindingName, initializer?: Expression): BindingElement;
        updateBindingElement(node: BindingElement, dotDotDotToken: DotDotDotToken | undefined, propertyName: PropertyName | undefined, name: BindingName, initializer: Expression | undefined): BindingElement;
        createArrayLiteralExpression(elements?: readonly Expression[], multiLine?: boolean): ArrayLiteralExpression;
        updateArrayLiteralExpression(node: ArrayLiteralExpression, elements: readonly Expression[]): ArrayLiteralExpression;
        createObjectLiteralExpression(properties?: readonly ObjectLiteralElementLike[], multiLine?: boolean): ObjectLiteralExpression;
        updateObjectLiteralExpression(node: ObjectLiteralExpression, properties: readonly ObjectLiteralElementLike[]): ObjectLiteralExpression;
        createPropertyAccessExpression(expression: Expression, name: string | MemberName): PropertyAccessExpression;
        updatePropertyAccessExpression(node: PropertyAccessExpression, expression: Expression, name: MemberName): PropertyAccessExpression;
        createPropertyAccessChain(expression: Expression, questionDotToken: QuestionDotToken | undefined, name: string | MemberName): PropertyAccessChain;
        updatePropertyAccessChain(node: PropertyAccessChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, name: MemberName): PropertyAccessChain;
        createElementAccessExpression(expression: Expression, index: number | Expression): ElementAccessExpression;
        updateElementAccessExpression(node: ElementAccessExpression, expression: Expression, argumentExpression: Expression): ElementAccessExpression;
        createElementAccessChain(expression: Expression, questionDotToken: QuestionDotToken | undefined, index: number | Expression): ElementAccessChain;
        updateElementAccessChain(node: ElementAccessChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, argumentExpression: Expression): ElementAccessChain;
        createCallExpression(expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined): CallExpression;
        updateCallExpression(node: CallExpression, expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[]): CallExpression;
        createCallChain(expression: Expression, questionDotToken: QuestionDotToken | undefined, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined): CallChain;
        updateCallChain(node: CallChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[]): CallChain;
        createNewExpression(expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined): NewExpression;
        updateNewExpression(node: NewExpression, expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined): NewExpression;
        createTaggedTemplateExpression(tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression;
        updateTaggedTemplateExpression(node: TaggedTemplateExpression, tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression;
        createTypeAssertion(type: TypeNode, expression: Expression): TypeAssertion;
        updateTypeAssertion(node: TypeAssertion, type: TypeNode, expression: Expression): TypeAssertion;
        createParenthesizedExpression(expression: Expression): ParenthesizedExpression;
        updateParenthesizedExpression(node: ParenthesizedExpression, expression: Expression): ParenthesizedExpression;
        createFunctionExpression(modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[] | undefined, type: TypeNode | undefined, body: Block): FunctionExpression;
        updateFunctionExpression(node: FunctionExpression, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block): FunctionExpression;
        createArrowFunction(modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken | undefined, body: ConciseBody): ArrowFunction;
        updateArrowFunction(node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken, body: ConciseBody): ArrowFunction;
        createEtsComponentExpression(name: Expression, argumentExpression: Expression[] | NodeArray<Expression> | undefined, body: Block | undefined): EtsComponentExpression;
        updateEtsComponentExpression(node: EtsComponentExpression, name: Expression | undefined, argumentExpression: Expression[] | NodeArray<Expression> | undefined, body: Block | undefined): EtsComponentExpression;
        createDeleteExpression(expression: Expression): DeleteExpression;
        updateDeleteExpression(node: DeleteExpression, expression: Expression): DeleteExpression;
        createTypeOfExpression(expression: Expression): TypeOfExpression;
        updateTypeOfExpression(node: TypeOfExpression, expression: Expression): TypeOfExpression;
        createVoidExpression(expression: Expression): VoidExpression;
        updateVoidExpression(node: VoidExpression, expression: Expression): VoidExpression;
        createAwaitExpression(expression: Expression): AwaitExpression;
        updateAwaitExpression(node: AwaitExpression, expression: Expression): AwaitExpression;
        createPrefixUnaryExpression(operator: PrefixUnaryOperator, operand: Expression): PrefixUnaryExpression;
        updatePrefixUnaryExpression(node: PrefixUnaryExpression, operand: Expression): PrefixUnaryExpression;
        createPostfixUnaryExpression(operand: Expression, operator: PostfixUnaryOperator): PostfixUnaryExpression;
        updatePostfixUnaryExpression(node: PostfixUnaryExpression, operand: Expression): PostfixUnaryExpression;
        createBinaryExpression(left: Expression, operator: BinaryOperator | BinaryOperatorToken, right: Expression): BinaryExpression;
        updateBinaryExpression(node: BinaryExpression, left: Expression, operator: BinaryOperator | BinaryOperatorToken, right: Expression): BinaryExpression;
        createConditionalExpression(condition: Expression, questionToken: QuestionToken | undefined, whenTrue: Expression, colonToken: ColonToken | undefined, whenFalse: Expression): ConditionalExpression;
        updateConditionalExpression(node: ConditionalExpression, condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression): ConditionalExpression;
        createTemplateExpression(head: TemplateHead, templateSpans: readonly TemplateSpan[]): TemplateExpression;
        updateTemplateExpression(node: TemplateExpression, head: TemplateHead, templateSpans: readonly TemplateSpan[]): TemplateExpression;
        createTemplateHead(text: string, rawText?: string, templateFlags?: TokenFlags): TemplateHead;
        createTemplateHead(text: string | undefined, rawText: string, templateFlags?: TokenFlags): TemplateHead;
        createTemplateMiddle(text: string, rawText?: string, templateFlags?: TokenFlags): TemplateMiddle;
        createTemplateMiddle(text: string | undefined, rawText: string, templateFlags?: TokenFlags): TemplateMiddle;
        createTemplateTail(text: string, rawText?: string, templateFlags?: TokenFlags): TemplateTail;
        createTemplateTail(text: string | undefined, rawText: string, templateFlags?: TokenFlags): TemplateTail;
        createNoSubstitutionTemplateLiteral(text: string, rawText?: string): NoSubstitutionTemplateLiteral;
        createNoSubstitutionTemplateLiteral(text: string | undefined, rawText: string): NoSubstitutionTemplateLiteral;
        createYieldExpression(asteriskToken: AsteriskToken, expression: Expression): YieldExpression;
        createYieldExpression(asteriskToken: undefined, expression: Expression | undefined): YieldExpression;
        updateYieldExpression(node: YieldExpression, asteriskToken: AsteriskToken | undefined, expression: Expression | undefined): YieldExpression;
        createSpreadElement(expression: Expression): SpreadElement;
        updateSpreadElement(node: SpreadElement, expression: Expression): SpreadElement;
        createClassExpression(modifiers: readonly ModifierLike[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassExpression;
        updateClassExpression(node: ClassExpression, modifiers: readonly ModifierLike[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassExpression;
        createOmittedExpression(): OmittedExpression;
        createExpressionWithTypeArguments(expression: Expression, typeArguments: readonly TypeNode[] | undefined): ExpressionWithTypeArguments;
        updateExpressionWithTypeArguments(node: ExpressionWithTypeArguments, expression: Expression, typeArguments: readonly TypeNode[] | undefined): ExpressionWithTypeArguments;
        createAsExpression(expression: Expression, type: TypeNode): AsExpression;
        updateAsExpression(node: AsExpression, expression: Expression, type: TypeNode): AsExpression;
        createNonNullExpression(expression: Expression): NonNullExpression;
        updateNonNullExpression(node: NonNullExpression, expression: Expression): NonNullExpression;
        createNonNullChain(expression: Expression): NonNullChain;
        updateNonNullChain(node: NonNullChain, expression: Expression): NonNullChain;
        createMetaProperty(keywordToken: MetaProperty["keywordToken"], name: Identifier): MetaProperty;
        updateMetaProperty(node: MetaProperty, name: Identifier): MetaProperty;
        createSatisfiesExpression(expression: Expression, type: TypeNode): SatisfiesExpression;
        updateSatisfiesExpression(node: SatisfiesExpression, expression: Expression, type: TypeNode): SatisfiesExpression;
        createTemplateSpan(expression: Expression, literal: TemplateMiddle | TemplateTail): TemplateSpan;
        updateTemplateSpan(node: TemplateSpan, expression: Expression, literal: TemplateMiddle | TemplateTail): TemplateSpan;
        createSemicolonClassElement(): SemicolonClassElement;
        createBlock(statements: readonly Statement[], multiLine?: boolean): Block;
        updateBlock(node: Block, statements: readonly Statement[]): Block;
        createVariableStatement(modifiers: readonly Modifier[] | undefined, declarationList: VariableDeclarationList | readonly VariableDeclaration[]): VariableStatement;
        updateVariableStatement(node: VariableStatement, modifiers: readonly Modifier[] | undefined, declarationList: VariableDeclarationList): VariableStatement;
        createEmptyStatement(): EmptyStatement;
        createExpressionStatement(expression: Expression): ExpressionStatement;
        updateExpressionStatement(node: ExpressionStatement, expression: Expression): ExpressionStatement;
        createIfStatement(expression: Expression, thenStatement: Statement, elseStatement?: Statement): IfStatement;
        updateIfStatement(node: IfStatement, expression: Expression, thenStatement: Statement, elseStatement: Statement | undefined): IfStatement;
        createDoStatement(statement: Statement, expression: Expression): DoStatement;
        updateDoStatement(node: DoStatement, statement: Statement, expression: Expression): DoStatement;
        createWhileStatement(expression: Expression, statement: Statement): WhileStatement;
        updateWhileStatement(node: WhileStatement, expression: Expression, statement: Statement): WhileStatement;
        createForStatement(initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement): ForStatement;
        updateForStatement(node: ForStatement, initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement): ForStatement;
        createForInStatement(initializer: ForInitializer, expression: Expression, statement: Statement): ForInStatement;
        updateForInStatement(node: ForInStatement, initializer: ForInitializer, expression: Expression, statement: Statement): ForInStatement;
        createForOfStatement(awaitModifier: AwaitKeyword | undefined, initializer: ForInitializer, expression: Expression, statement: Statement): ForOfStatement;
        updateForOfStatement(node: ForOfStatement, awaitModifier: AwaitKeyword | undefined, initializer: ForInitializer, expression: Expression, statement: Statement): ForOfStatement;
        createContinueStatement(label?: string | Identifier): ContinueStatement;
        updateContinueStatement(node: ContinueStatement, label: Identifier | undefined): ContinueStatement;
        createBreakStatement(label?: string | Identifier): BreakStatement;
        updateBreakStatement(node: BreakStatement, label: Identifier | undefined): BreakStatement;
        createReturnStatement(expression?: Expression): ReturnStatement;
        updateReturnStatement(node: ReturnStatement, expression: Expression | undefined): ReturnStatement;
        createWithStatement(expression: Expression, statement: Statement): WithStatement;
        updateWithStatement(node: WithStatement, expression: Expression, statement: Statement): WithStatement;
        createSwitchStatement(expression: Expression, caseBlock: CaseBlock): SwitchStatement;
        updateSwitchStatement(node: SwitchStatement, expression: Expression, caseBlock: CaseBlock): SwitchStatement;
        createLabeledStatement(label: string | Identifier, statement: Statement): LabeledStatement;
        updateLabeledStatement(node: LabeledStatement, label: Identifier, statement: Statement): LabeledStatement;
        createThrowStatement(expression: Expression): ThrowStatement;
        updateThrowStatement(node: ThrowStatement, expression: Expression): ThrowStatement;
        createTryStatement(tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined): TryStatement;
        updateTryStatement(node: TryStatement, tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined): TryStatement;
        createDebuggerStatement(): DebuggerStatement;
        createVariableDeclaration(name: string | BindingName, exclamationToken?: ExclamationToken, type?: TypeNode, initializer?: Expression): VariableDeclaration;
        updateVariableDeclaration(node: VariableDeclaration, name: BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
        createVariableDeclarationList(declarations: readonly VariableDeclaration[], flags?: NodeFlags): VariableDeclarationList;
        updateVariableDeclarationList(node: VariableDeclarationList, declarations: readonly VariableDeclaration[]): VariableDeclarationList;
        createFunctionDeclaration(modifiers: readonly ModifierLike[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
        updateFunctionDeclaration(node: FunctionDeclaration, modifiers: readonly ModifierLike[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
        createClassDeclaration(modifiers: readonly ModifierLike[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration;
        updateClassDeclaration(node: ClassDeclaration, modifiers: readonly ModifierLike[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration;
        createStructDeclaration(modifiers: readonly ModifierLike[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): StructDeclaration;
        updateStructDeclaration(node: StructDeclaration, modifiers: readonly ModifierLike[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): StructDeclaration;
        createAnnotationDeclaration(modifiers: readonly ModifierLike[] | undefined, name: string | Identifier | undefined, members: readonly AnnotationElement[]): AnnotationDeclaration;
        updateAnnotationDeclaration(node: AnnotationDeclaration, modifiers: readonly ModifierLike[] | undefined, name: Identifier | undefined, members: readonly AnnotationElement[]): AnnotationDeclaration;
        createInterfaceDeclaration(modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration;
        updateInterfaceDeclaration(node: InterfaceDeclaration, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration;
        createTypeAliasDeclaration(modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration;
        updateTypeAliasDeclaration(node: TypeAliasDeclaration, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration;
        createEnumDeclaration(modifiers: readonly Modifier[] | undefined, name: string | Identifier, members: readonly EnumMember[]): EnumDeclaration;
        updateEnumDeclaration(node: EnumDeclaration, modifiers: readonly Modifier[] | undefined, name: Identifier, members: readonly EnumMember[]): EnumDeclaration;
        createModuleDeclaration(modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined, flags?: NodeFlags): ModuleDeclaration;
        updateModuleDeclaration(node: ModuleDeclaration, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined): ModuleDeclaration;
        createModuleBlock(statements: readonly Statement[]): ModuleBlock;
        updateModuleBlock(node: ModuleBlock, statements: readonly Statement[]): ModuleBlock;
        createCaseBlock(clauses: readonly CaseOrDefaultClause[]): CaseBlock;
        updateCaseBlock(node: CaseBlock, clauses: readonly CaseOrDefaultClause[]): CaseBlock;
        createNamespaceExportDeclaration(name: string | Identifier): NamespaceExportDeclaration;
        updateNamespaceExportDeclaration(node: NamespaceExportDeclaration, name: Identifier): NamespaceExportDeclaration;
        createImportEqualsDeclaration(modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: string | Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
        updateImportEqualsDeclaration(node: ImportEqualsDeclaration, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
        createImportDeclaration(modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause?: AssertClause): ImportDeclaration;
        updateImportDeclaration(node: ImportDeclaration, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause: AssertClause | undefined): ImportDeclaration;
        createImportClause(isTypeOnly: boolean, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined): ImportClause;
        updateImportClause(node: ImportClause, isTypeOnly: boolean, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined): ImportClause;
        createAssertClause(elements: NodeArray<AssertEntry>, multiLine?: boolean): AssertClause;
        updateAssertClause(node: AssertClause, elements: NodeArray<AssertEntry>, multiLine?: boolean): AssertClause;
        createAssertEntry(name: AssertionKey, value: Expression): AssertEntry;
        updateAssertEntry(node: AssertEntry, name: AssertionKey, value: Expression): AssertEntry;
        createImportTypeAssertionContainer(clause: AssertClause, multiLine?: boolean): ImportTypeAssertionContainer;
        updateImportTypeAssertionContainer(node: ImportTypeAssertionContainer, clause: AssertClause, multiLine?: boolean): ImportTypeAssertionContainer;
        createNamespaceImport(name: Identifier): NamespaceImport;
        updateNamespaceImport(node: NamespaceImport, name: Identifier): NamespaceImport;
        createNamespaceExport(name: Identifier): NamespaceExport;
        updateNamespaceExport(node: NamespaceExport, name: Identifier): NamespaceExport;
        createNamedImports(elements: readonly ImportSpecifier[]): NamedImports;
        updateNamedImports(node: NamedImports, elements: readonly ImportSpecifier[]): NamedImports;
        createImportSpecifier(isTypeOnly: boolean, propertyName: Identifier | undefined, name: Identifier): ImportSpecifier;
        updateImportSpecifier(node: ImportSpecifier, isTypeOnly: boolean, propertyName: Identifier | undefined, name: Identifier): ImportSpecifier;
        createExportAssignment(modifiers: readonly Modifier[] | undefined, isExportEquals: boolean | undefined, expression: Expression): ExportAssignment;
        updateExportAssignment(node: ExportAssignment, modifiers: readonly Modifier[] | undefined, expression: Expression): ExportAssignment;
        createExportDeclaration(modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, exportClause: NamedExportBindings | undefined, moduleSpecifier?: Expression, assertClause?: AssertClause): ExportDeclaration;
        updateExportDeclaration(node: ExportDeclaration, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, exportClause: NamedExportBindings | undefined, moduleSpecifier: Expression | undefined, assertClause: AssertClause | undefined): ExportDeclaration;
        createNamedExports(elements: readonly ExportSpecifier[]): NamedExports;
        updateNamedExports(node: NamedExports, elements: readonly ExportSpecifier[]): NamedExports;
        createExportSpecifier(isTypeOnly: boolean, propertyName: string | Identifier | undefined, name: string | Identifier): ExportSpecifier;
        updateExportSpecifier(node: ExportSpecifier, isTypeOnly: boolean, propertyName: Identifier | undefined, name: Identifier): ExportSpecifier;
        createExternalModuleReference(expression: Expression): ExternalModuleReference;
        updateExternalModuleReference(node: ExternalModuleReference, expression: Expression): ExternalModuleReference;
        createJSDocAllType(): JSDocAllType;
        createJSDocUnknownType(): JSDocUnknownType;
        createJSDocNonNullableType(type: TypeNode, postfix?: boolean): JSDocNonNullableType;
        updateJSDocNonNullableType(node: JSDocNonNullableType, type: TypeNode): JSDocNonNullableType;
        createJSDocNullableType(type: TypeNode, postfix?: boolean): JSDocNullableType;
        updateJSDocNullableType(node: JSDocNullableType, type: TypeNode): JSDocNullableType;
        createJSDocOptionalType(type: TypeNode): JSDocOptionalType;
        updateJSDocOptionalType(node: JSDocOptionalType, type: TypeNode): JSDocOptionalType;
        createJSDocFunctionType(parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): JSDocFunctionType;
        updateJSDocFunctionType(node: JSDocFunctionType, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): JSDocFunctionType;
        createJSDocVariadicType(type: TypeNode): JSDocVariadicType;
        updateJSDocVariadicType(node: JSDocVariadicType, type: TypeNode): JSDocVariadicType;
        createJSDocNamepathType(type: TypeNode): JSDocNamepathType;
        updateJSDocNamepathType(node: JSDocNamepathType, type: TypeNode): JSDocNamepathType;
        createJSDocTypeExpression(type: TypeNode): JSDocTypeExpression;
        updateJSDocTypeExpression(node: JSDocTypeExpression, type: TypeNode): JSDocTypeExpression;
        createJSDocNameReference(name: EntityName | JSDocMemberName): JSDocNameReference;
        updateJSDocNameReference(node: JSDocNameReference, name: EntityName | JSDocMemberName): JSDocNameReference;
        createJSDocMemberName(left: EntityName | JSDocMemberName, right: Identifier): JSDocMemberName;
        updateJSDocMemberName(node: JSDocMemberName, left: EntityName | JSDocMemberName, right: Identifier): JSDocMemberName;
        createJSDocLink(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLink;
        updateJSDocLink(node: JSDocLink, name: EntityName | JSDocMemberName | undefined, text: string): JSDocLink;
        createJSDocLinkCode(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkCode;
        updateJSDocLinkCode(node: JSDocLinkCode, name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkCode;
        createJSDocLinkPlain(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkPlain;
        updateJSDocLinkPlain(node: JSDocLinkPlain, name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkPlain;
        createJSDocTypeLiteral(jsDocPropertyTags?: readonly JSDocPropertyLikeTag[], isArrayType?: boolean): JSDocTypeLiteral;
        updateJSDocTypeLiteral(node: JSDocTypeLiteral, jsDocPropertyTags: readonly JSDocPropertyLikeTag[] | undefined, isArrayType: boolean | undefined): JSDocTypeLiteral;
        createJSDocSignature(typeParameters: readonly JSDocTemplateTag[] | undefined, parameters: readonly JSDocParameterTag[], type?: JSDocReturnTag): JSDocSignature;
        updateJSDocSignature(node: JSDocSignature, typeParameters: readonly JSDocTemplateTag[] | undefined, parameters: readonly JSDocParameterTag[], type: JSDocReturnTag | undefined): JSDocSignature;
        createJSDocTemplateTag(tagName: Identifier | undefined, constraint: JSDocTypeExpression | undefined, typeParameters: readonly TypeParameterDeclaration[], comment?: string | NodeArray<JSDocComment>): JSDocTemplateTag;
        updateJSDocTemplateTag(node: JSDocTemplateTag, tagName: Identifier | undefined, constraint: JSDocTypeExpression | undefined, typeParameters: readonly TypeParameterDeclaration[], comment: string | NodeArray<JSDocComment> | undefined): JSDocTemplateTag;
        createJSDocTypedefTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression | JSDocTypeLiteral, fullName?: Identifier | JSDocNamespaceDeclaration, comment?: string | NodeArray<JSDocComment>): JSDocTypedefTag;
        updateJSDocTypedefTag(node: JSDocTypedefTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression | JSDocTypeLiteral | undefined, fullName: Identifier | JSDocNamespaceDeclaration | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocTypedefTag;
        createJSDocParameterTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string | NodeArray<JSDocComment>): JSDocParameterTag;
        updateJSDocParameterTag(node: JSDocParameterTag, tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression: JSDocTypeExpression | undefined, isNameFirst: boolean, comment: string | NodeArray<JSDocComment> | undefined): JSDocParameterTag;
        createJSDocPropertyTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string | NodeArray<JSDocComment>): JSDocPropertyTag;
        updateJSDocPropertyTag(node: JSDocPropertyTag, tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression: JSDocTypeExpression | undefined, isNameFirst: boolean, comment: string | NodeArray<JSDocComment> | undefined): JSDocPropertyTag;
        createJSDocTypeTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocTypeTag;
        updateJSDocTypeTag(node: JSDocTypeTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment: string | NodeArray<JSDocComment> | undefined): JSDocTypeTag;
        createJSDocSeeTag(tagName: Identifier | undefined, nameExpression: JSDocNameReference | undefined, comment?: string | NodeArray<JSDocComment>): JSDocSeeTag;
        updateJSDocSeeTag(node: JSDocSeeTag, tagName: Identifier | undefined, nameExpression: JSDocNameReference | undefined, comment?: string | NodeArray<JSDocComment>): JSDocSeeTag;
        createJSDocReturnTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocReturnTag;
        updateJSDocReturnTag(node: JSDocReturnTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocReturnTag;
        createJSDocThisTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocThisTag;
        updateJSDocThisTag(node: JSDocThisTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocThisTag;
        createJSDocEnumTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocEnumTag;
        updateJSDocEnumTag(node: JSDocEnumTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment: string | NodeArray<JSDocComment> | undefined): JSDocEnumTag;
        createJSDocCallbackTag(tagName: Identifier | undefined, typeExpression: JSDocSignature, fullName?: Identifier | JSDocNamespaceDeclaration, comment?: string | NodeArray<JSDocComment>): JSDocCallbackTag;
        updateJSDocCallbackTag(node: JSDocCallbackTag, tagName: Identifier | undefined, typeExpression: JSDocSignature, fullName: Identifier | JSDocNamespaceDeclaration | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocCallbackTag;
        createJSDocAugmentsTag(tagName: Identifier | undefined, className: JSDocAugmentsTag["class"], comment?: string | NodeArray<JSDocComment>): JSDocAugmentsTag;
        updateJSDocAugmentsTag(node: JSDocAugmentsTag, tagName: Identifier | undefined, className: JSDocAugmentsTag["class"], comment: string | NodeArray<JSDocComment> | undefined): JSDocAugmentsTag;
        createJSDocImplementsTag(tagName: Identifier | undefined, className: JSDocImplementsTag["class"], comment?: string | NodeArray<JSDocComment>): JSDocImplementsTag;
        updateJSDocImplementsTag(node: JSDocImplementsTag, tagName: Identifier | undefined, className: JSDocImplementsTag["class"], comment: string | NodeArray<JSDocComment> | undefined): JSDocImplementsTag;
        createJSDocAuthorTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocAuthorTag;
        updateJSDocAuthorTag(node: JSDocAuthorTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocAuthorTag;
        createJSDocClassTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocClassTag;
        updateJSDocClassTag(node: JSDocClassTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocClassTag;
        createJSDocPublicTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocPublicTag;
        updateJSDocPublicTag(node: JSDocPublicTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocPublicTag;
        createJSDocPrivateTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocPrivateTag;
        updateJSDocPrivateTag(node: JSDocPrivateTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocPrivateTag;
        createJSDocProtectedTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocProtectedTag;
        updateJSDocProtectedTag(node: JSDocProtectedTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocProtectedTag;
        createJSDocReadonlyTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocReadonlyTag;
        updateJSDocReadonlyTag(node: JSDocReadonlyTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocReadonlyTag;
        createJSDocUnknownTag(tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocUnknownTag;
        updateJSDocUnknownTag(node: JSDocUnknownTag, tagName: Identifier, comment: string | NodeArray<JSDocComment> | undefined): JSDocUnknownTag;
        createJSDocDeprecatedTag(tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocDeprecatedTag;
        updateJSDocDeprecatedTag(node: JSDocDeprecatedTag, tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocDeprecatedTag;
        createJSDocOverrideTag(tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocOverrideTag;
        updateJSDocOverrideTag(node: JSDocOverrideTag, tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocOverrideTag;
        createJSDocText(text: string): JSDocText;
        updateJSDocText(node: JSDocText, text: string): JSDocText;
        createJSDocComment(comment?: string | NodeArray<JSDocComment> | undefined, tags?: readonly JSDocTag[] | undefined): JSDoc;
        updateJSDocComment(node: JSDoc, comment: string | NodeArray<JSDocComment> | undefined, tags: readonly JSDocTag[] | undefined): JSDoc;
        createJsxElement(openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement): JsxElement;
        updateJsxElement(node: JsxElement, openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement): JsxElement;
        createJsxSelfClosingElement(tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes): JsxSelfClosingElement;
        updateJsxSelfClosingElement(node: JsxSelfClosingElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes): JsxSelfClosingElement;
        createJsxOpeningElement(tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes): JsxOpeningElement;
        updateJsxOpeningElement(node: JsxOpeningElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes): JsxOpeningElement;
        createJsxClosingElement(tagName: JsxTagNameExpression): JsxClosingElement;
        updateJsxClosingElement(node: JsxClosingElement, tagName: JsxTagNameExpression): JsxClosingElement;
        createJsxFragment(openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment): JsxFragment;
        createJsxText(text: string, containsOnlyTriviaWhiteSpaces?: boolean): JsxText;
        updateJsxText(node: JsxText, text: string, containsOnlyTriviaWhiteSpaces?: boolean): JsxText;
        createJsxOpeningFragment(): JsxOpeningFragment;
        createJsxJsxClosingFragment(): JsxClosingFragment;
        updateJsxFragment(node: JsxFragment, openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment): JsxFragment;
        createJsxAttribute(name: Identifier, initializer: JsxAttributeValue | undefined): JsxAttribute;
        updateJsxAttribute(node: JsxAttribute, name: Identifier, initializer: JsxAttributeValue | undefined): JsxAttribute;
        createJsxAttributes(properties: readonly JsxAttributeLike[]): JsxAttributes;
        updateJsxAttributes(node: JsxAttributes, properties: readonly JsxAttributeLike[]): JsxAttributes;
        createJsxSpreadAttribute(expression: Expression): JsxSpreadAttribute;
        updateJsxSpreadAttribute(node: JsxSpreadAttribute, expression: Expression): JsxSpreadAttribute;
        createJsxExpression(dotDotDotToken: DotDotDotToken | undefined, expression: Expression | undefined): JsxExpression;
        updateJsxExpression(node: JsxExpression, expression: Expression | undefined): JsxExpression;
        createCaseClause(expression: Expression, statements: readonly Statement[]): CaseClause;
        updateCaseClause(node: CaseClause, expression: Expression, statements: readonly Statement[]): CaseClause;
        createDefaultClause(statements: readonly Statement[]): DefaultClause;
        updateDefaultClause(node: DefaultClause, statements: readonly Statement[]): DefaultClause;
        createHeritageClause(token: HeritageClause["token"], types: readonly ExpressionWithTypeArguments[]): HeritageClause;
        updateHeritageClause(node: HeritageClause, types: readonly ExpressionWithTypeArguments[]): HeritageClause;
        createCatchClause(variableDeclaration: string | BindingName | VariableDeclaration | undefined, block: Block): CatchClause;
        updateCatchClause(node: CatchClause, variableDeclaration: VariableDeclaration | undefined, block: Block): CatchClause;
        createPropertyAssignment(name: string | PropertyName, initializer: Expression): PropertyAssignment;
        updatePropertyAssignment(node: PropertyAssignment, name: PropertyName, initializer: Expression): PropertyAssignment;
        createShorthandPropertyAssignment(name: string | Identifier, objectAssignmentInitializer?: Expression): ShorthandPropertyAssignment;
        updateShorthandPropertyAssignment(node: ShorthandPropertyAssignment, name: Identifier, objectAssignmentInitializer: Expression | undefined): ShorthandPropertyAssignment;
        createSpreadAssignment(expression: Expression): SpreadAssignment;
        updateSpreadAssignment(node: SpreadAssignment, expression: Expression): SpreadAssignment;
        createEnumMember(name: string | PropertyName, initializer?: Expression): EnumMember;
        updateEnumMember(node: EnumMember, name: PropertyName, initializer: Expression | undefined): EnumMember;
        createSourceFile(statements: readonly Statement[], endOfFileToken: EndOfFileToken, flags: NodeFlags): SourceFile;
        updateSourceFile(node: SourceFile, statements: readonly Statement[], isDeclarationFile?: boolean, referencedFiles?: readonly FileReference[], typeReferences?: readonly FileReference[], hasNoDefaultLib?: boolean, libReferences?: readonly FileReference[]): SourceFile;
        createNotEmittedStatement(original: Node): NotEmittedStatement;
        createPartiallyEmittedExpression(expression: Expression, original?: Node): PartiallyEmittedExpression;
        updatePartiallyEmittedExpression(node: PartiallyEmittedExpression, expression: Expression): PartiallyEmittedExpression;
        createCommaListExpression(elements: readonly Expression[]): CommaListExpression;
        updateCommaListExpression(node: CommaListExpression, elements: readonly Expression[]): CommaListExpression;
        createBundle(sourceFiles: readonly SourceFile[], prepends?: readonly (UnparsedSource | InputFiles)[]): Bundle;
        updateBundle(node: Bundle, sourceFiles: readonly SourceFile[], prepends?: readonly (UnparsedSource | InputFiles)[]): Bundle;
        createComma(left: Expression, right: Expression): BinaryExpression;
        createAssignment(left: ObjectLiteralExpression | ArrayLiteralExpression, right: Expression): DestructuringAssignment;
        createAssignment(left: Expression, right: Expression): AssignmentExpression<EqualsToken>;
        createLogicalOr(left: Expression, right: Expression): BinaryExpression;
        createLogicalAnd(left: Expression, right: Expression): BinaryExpression;
        createBitwiseOr(left: Expression, right: Expression): BinaryExpression;
        createBitwiseXor(left: Expression, right: Expression): BinaryExpression;
        createBitwiseAnd(left: Expression, right: Expression): BinaryExpression;
        createStrictEquality(left: Expression, right: Expression): BinaryExpression;
        createStrictInequality(left: Expression, right: Expression): BinaryExpression;
        createEquality(left: Expression, right: Expression): BinaryExpression;
        createInequality(left: Expression, right: Expression): BinaryExpression;
        createLessThan(left: Expression, right: Expression): BinaryExpression;
        createLessThanEquals(left: Expression, right: Expression): BinaryExpression;
        createGreaterThan(left: Expression, right: Expression): BinaryExpression;
        createGreaterThanEquals(left: Expression, right: Expression): BinaryExpression;
        createLeftShift(left: Expression, right: Expression): BinaryExpression;
        createRightShift(left: Expression, right: Expression): BinaryExpression;
        createUnsignedRightShift(left: Expression, right: Expression): BinaryExpression;
        createAdd(left: Expression, right: Expression): BinaryExpression;
        createSubtract(left: Expression, right: Expression): BinaryExpression;
        createMultiply(left: Expression, right: Expression): BinaryExpression;
        createDivide(left: Expression, right: Expression): BinaryExpression;
        createModulo(left: Expression, right: Expression): BinaryExpression;
        createExponent(left: Expression, right: Expression): BinaryExpression;
        createPrefixPlus(operand: Expression): PrefixUnaryExpression;
        createPrefixMinus(operand: Expression): PrefixUnaryExpression;
        createPrefixIncrement(operand: Expression): PrefixUnaryExpression;
        createPrefixDecrement(operand: Expression): PrefixUnaryExpression;
        createBitwiseNot(operand: Expression): PrefixUnaryExpression;
        createLogicalNot(operand: Expression): PrefixUnaryExpression;
        createPostfixIncrement(operand: Expression): PostfixUnaryExpression;
        createPostfixDecrement(operand: Expression): PostfixUnaryExpression;
        createImmediatelyInvokedFunctionExpression(statements: readonly Statement[]): CallExpression;
        createImmediatelyInvokedFunctionExpression(statements: readonly Statement[], param: ParameterDeclaration, paramValue: Expression): CallExpression;
        createImmediatelyInvokedArrowFunction(statements: readonly Statement[]): CallExpression;
        createImmediatelyInvokedArrowFunction(statements: readonly Statement[], param: ParameterDeclaration, paramValue: Expression): CallExpression;
        createVoidZero(): VoidExpression;
        createExportDefault(expression: Expression): ExportAssignment;
        createExternalModuleExport(exportName: Identifier): ExportDeclaration;
        restoreOuterExpressions(outerExpression: Expression | undefined, innerExpression: Expression, kinds?: OuterExpressionKinds): Expression;
    }
    interface NodeFactory {
        /** @deprecated Use the overload that accepts 'modifiers' */
        createConstructorTypeNode(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): ConstructorTypeNode;
        /** @deprecated Use the overload that accepts 'modifiers' */
        updateConstructorTypeNode(node: ConstructorTypeNode, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode): ConstructorTypeNode;
    }
    interface NodeFactory {
        createImportTypeNode(argument: TypeNode, assertions?: ImportTypeAssertionContainer, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean): ImportTypeNode;
        /** @deprecated Use the overload that accepts 'assertions' */
        createImportTypeNode(argument: TypeNode, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean): ImportTypeNode;
        /** @deprecated Use the overload that accepts 'assertions' */
        updateImportTypeNode(node: ImportTypeNode, argument: TypeNode, qualifier: EntityName | undefined, typeArguments: readonly TypeNode[] | undefined, isTypeOf?: boolean): ImportTypeNode;
    }
    interface NodeFactory {
        /** @deprecated Use the overload that accepts 'modifiers' */
        createTypeParameterDeclaration(name: string | Identifier, constraint?: TypeNode, defaultType?: TypeNode): TypeParameterDeclaration;
        /** @deprecated Use the overload that accepts 'modifiers' */
        updateTypeParameterDeclaration(node: TypeParameterDeclaration, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined): TypeParameterDeclaration;
    }
    interface NodeFactory {
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createParameterDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken?: QuestionToken, type?: TypeNode, initializer?: Expression): ParameterDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateParameterDeclaration(node: ParameterDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): ParameterDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createPropertyDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updatePropertyDeclaration(node: PropertyDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createMethodDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateMethodDeclaration(node: MethodDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration;
        /**
         * @deprecated This node does not support Decorators. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createConstructorDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration;
        /**
         * @deprecated This node does not support Decorators. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateConstructorDeclaration(node: ConstructorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createGetAccessorDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateGetAccessorDeclaration(node: GetAccessorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createSetAccessorDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateSetAccessorDeclaration(node: SetAccessorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createIndexSignature(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration;
        /**
         * @deprecated Decorators and modifiers are no longer supported for this function. Callers should use an overload that does not accept the `decorators` and `modifiers` parameters.
         */
        updateIndexSignature(node: IndexSignatureDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration;
        /**
         * @deprecated Decorators and modifiers are no longer supported for this function. Callers should use an overload that does not accept the `decorators` and `modifiers` parameters.
         */
        createClassStaticBlockDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, body: Block): ClassStaticBlockDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateClassStaticBlockDeclaration(node: ClassStaticBlockDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, body: Block): ClassStaticBlockDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createClassExpression(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassExpression;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateClassExpression(node: ClassExpression, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassExpression;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createFunctionDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateFunctionDeclaration(node: FunctionDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createClassDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration;
        /**
         * @deprecated Decorators have been combined with modifiers. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateClassDeclaration(node: ClassDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createInterfaceDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateInterfaceDeclaration(node: InterfaceDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createTypeAliasDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateTypeAliasDeclaration(node: TypeAliasDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createEnumDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, members: readonly EnumMember[]): EnumDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateEnumDeclaration(node: EnumDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, members: readonly EnumMember[]): EnumDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createModuleDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined, flags?: NodeFlags): ModuleDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateModuleDeclaration(node: ModuleDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined): ModuleDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createImportEqualsDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: string | Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateImportEqualsDeclaration(node: ImportEqualsDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createImportDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause?: AssertClause): ImportDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateImportDeclaration(node: ImportDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause: AssertClause | undefined): ImportDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createExportAssignment(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isExportEquals: boolean | undefined, expression: Expression): ExportAssignment;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateExportAssignment(node: ExportAssignment, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, expression: Expression): ExportAssignment;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        createExportDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, exportClause: NamedExportBindings | undefined, moduleSpecifier?: Expression, assertClause?: AssertClause): ExportDeclaration;
        /**
         * @deprecated Decorators are no longer supported for this function. Callers should use an overload that does not accept a `decorators` parameter.
         */
        updateExportDeclaration(node: ExportDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, exportClause: NamedExportBindings | undefined, moduleSpecifier: Expression | undefined, assertClause: AssertClause | undefined): ExportDeclaration;
    }
    interface CoreTransformationContext {
        readonly factory: NodeFactory;
        /** Gets the compiler options supplied to the transformer. */
        getCompilerOptions(): CompilerOptions;
        /** Starts a new lexical environment. */
        startLexicalEnvironment(): void;
        /** Suspends the current lexical environment, usually after visiting a parameter list. */
        suspendLexicalEnvironment(): void;
        /** Resumes a suspended lexical environment, usually before visiting a function body. */
        resumeLexicalEnvironment(): void;
        /** Ends a lexical environment, returning any declarations. */
        endLexicalEnvironment(): Statement[] | undefined;
        /** Hoists a function declaration to the containing scope. */
        hoistFunctionDeclaration(node: FunctionDeclaration): void;
        /** Hoists a variable declaration to the containing scope. */
        hoistVariableDeclaration(node: Identifier): void;
    }
    interface TransformationContext extends CoreTransformationContext {
        /** Records a request for a non-scoped emit helper in the current context. */
        requestEmitHelper(helper: EmitHelper): void;
        /** Gets and resets the requested non-scoped emit helpers. */
        readEmitHelpers(): EmitHelper[] | undefined;
        /** Enables expression substitutions in the pretty printer for the provided SyntaxKind. */
        enableSubstitution(kind: SyntaxKind): void;
        /** Determines whether expression substitutions are enabled for the provided node. */
        isSubstitutionEnabled(node: Node): boolean;
        /**
         * Hook used by transformers to substitute expressions just before they
         * are emitted by the pretty printer.
         *
         * NOTE: Transformation hooks should only be modified during `Transformer` initialization,
         * before returning the `NodeTransformer` callback.
         */
        onSubstituteNode: (hint: EmitHint, node: Node) => Node;
        /**
         * Enables before/after emit notifications in the pretty printer for the provided
         * SyntaxKind.
         */
        enableEmitNotification(kind: SyntaxKind): void;
        /**
         * Determines whether before/after emit notifications should be raised in the pretty
         * printer when it emits a node.
         */
        isEmitNotificationEnabled(node: Node): boolean;
        /**
         * Hook used to allow transformers to capture state before or after
         * the printer emits a node.
         *
         * NOTE: Transformation hooks should only be modified during `Transformer` initialization,
         * before returning the `NodeTransformer` callback.
         */
        onEmitNode: (hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void) => void;
        /** Determines whether the lexical environment is suspended */
        isLexicalEnvironmentSuspended?(): boolean;
    }
    interface TransformationResult<T extends Node> {
        /** Gets the transformed source files. */
        transformed: T[];
        /** Gets diagnostics for the transformation. */
        diagnostics?: DiagnosticWithLocation[];
        /**
         * Gets a substitute for a node, if one is available; otherwise, returns the original node.
         *
         * @param hint A hint as to the intended usage of the node.
         * @param node The node to substitute.
         */
        substituteNode(hint: EmitHint, node: Node): Node;
        /**
         * Emits a node with possible notification.
         *
         * @param hint A hint as to the intended usage of the node.
         * @param node The node to emit.
         * @param emitCallback A callback used to emit the node.
         */
        emitNodeWithNotification(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void): void;
        /**
         * Indicates if a given node needs an emit notification
         *
         * @param node The node to emit.
         */
        isEmitNotificationEnabled?(node: Node): boolean;
        /**
         * Clean up EmitNode entries on any parse-tree nodes.
         */
        dispose(): void;
    }
    /**
     * A function that is used to initialize and return a `Transformer` callback, which in turn
     * will be used to transform one or more nodes.
     */
    type TransformerFactory<T extends Node> = (context: TransformationContext) => Transformer<T>;
    /**
     * A function that transforms a node.
     */
    type Transformer<T extends Node> = (node: T) => T;
    /**
     * A function that accepts and possibly transforms a node.
     */
    type Visitor = (node: Node) => VisitResult<Node>;
    interface NodeVisitor {
        <T extends Node>(nodes: T, visitor: Visitor | undefined, test?: (node: Node) => boolean, lift?: (node: readonly Node[]) => T): T;
        <T extends Node>(nodes: T | undefined, visitor: Visitor | undefined, test?: (node: Node) => boolean, lift?: (node: readonly Node[]) => T): T | undefined;
    }
    interface NodesVisitor {
        <T extends Node>(nodes: NodeArray<T>, visitor: Visitor | undefined, test?: (node: Node) => boolean, start?: number, count?: number): NodeArray<T>;
        <T extends Node>(nodes: NodeArray<T> | undefined, visitor: Visitor | undefined, test?: (node: Node) => boolean, start?: number, count?: number): NodeArray<T> | undefined;
    }
    type VisitResult<T extends Node> = T | readonly T[] | undefined;
    interface Printer {
        /**
         * Print a node and its subtree as-is, without any emit transformations.
         * @param hint A value indicating the purpose of a node. This is primarily used to
         * distinguish between an `Identifier` used in an expression position, versus an
         * `Identifier` used as an `IdentifierName` as part of a declaration. For most nodes you
         * should just pass `Unspecified`.
         * @param node The node to print. The node and its subtree are printed as-is, without any
         * emit transformations.
         * @param sourceFile A source file that provides context for the node. The source text of
         * the file is used to emit the original source content for literals and identifiers, while
         * the identifiers of the source file are used when generating unique names to avoid
         * collisions.
         */
        printNode(hint: EmitHint, node: Node, sourceFile: SourceFile): string;
        /**
         * Prints a list of nodes using the given format flags
         */
        printList<T extends Node>(format: ListFormat, list: NodeArray<T>, sourceFile: SourceFile): string;
        /**
         * Prints a source file as-is, without any emit transformations.
         */
        printFile(sourceFile: SourceFile): string;
        /**
         * Prints a bundle of source files as-is, without any emit transformations.
         */
        printBundle(bundle: Bundle): string;
        writeFile(sourceFile: SourceFile, writer: EmitTextWriter, sourceMapGenerator: SourceMapGenerator | undefined): void;
    }
    interface PrintHandlers {
        /**
         * A hook used by the Printer when generating unique names to avoid collisions with
         * globally defined names that exist outside of the current source file.
         */
        hasGlobalName?(name: string): boolean;
        /**
         * A hook used by the Printer to provide notifications prior to emitting a node. A
         * compatible implementation **must** invoke `emitCallback` with the provided `hint` and
         * `node` values.
         * @param hint A hint indicating the intended purpose of the node.
         * @param node The node to emit.
         * @param emitCallback A callback that, when invoked, will emit the node.
         * @example
         * ```ts
         * var printer = createPrinter(printerOptions, {
         *   onEmitNode(hint, node, emitCallback) {
         *     // set up or track state prior to emitting the node...
         *     emitCallback(hint, node);
         *     // restore state after emitting the node...
         *   }
         * });
         * ```
         */
        onEmitNode?(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void): void;
        /**
         * A hook used to check if an emit notification is required for a node.
         * @param node The node to emit.
         */
        isEmitNotificationEnabled?(node: Node): boolean;
        /**
         * A hook used by the Printer to perform just-in-time substitution of a node. This is
         * primarily used by node transformations that need to substitute one node for another,
         * such as replacing `myExportedVar` with `exports.myExportedVar`.
         * @param hint A hint indicating the intended purpose of the node.
         * @param node The node to emit.
         * @example
         * ```ts
         * var printer = createPrinter(printerOptions, {
         *   substituteNode(hint, node) {
         *     // perform substitution if necessary...
         *     return node;
         *   }
         * });
         * ```
         */
        substituteNode?(hint: EmitHint, node: Node): Node;
    }
    interface PrinterOptions {
        removeComments?: boolean;
        newLine?: NewLineKind;
        omitTrailingSemicolon?: boolean;
        noEmitHelpers?: boolean;
        sourceMap?: boolean;
        inlineSourceMap?: boolean;
        inlineSources?: boolean;
    }
    interface RawSourceMap {
        version: 3;
        file: string;
        sourceRoot?: string | null;
        sources: string[];
        sourcesContent?: (string | null)[] | null;
        mappings: string;
        names?: string[] | null;
    }
    /**
     * Generates a source map.
     */
    interface SourceMapGenerator {
        getSources(): readonly string[];
        /**
         * Adds a source to the source map.
         */
        addSource(fileName: string): number;
        /**
         * Set the content for a source.
         */
        setSourceContent(sourceIndex: number, content: string | null): void;
        /**
         * Adds a name.
         */
        addName(name: string): number;
        /**
         * Adds a mapping without source information.
         */
        addMapping(generatedLine: number, generatedCharacter: number): void;
        /**
         * Adds a mapping with source information.
         */
        addMapping(generatedLine: number, generatedCharacter: number, sourceIndex: number, sourceLine: number, sourceCharacter: number, nameIndex?: number): void;
        /**
         * Appends a source map.
         */
        appendSourceMap(generatedLine: number, generatedCharacter: number, sourceMap: RawSourceMap, sourceMapPath: string, start?: LineAndCharacter, end?: LineAndCharacter): void;
        /**
         * Gets the source map as a `RawSourceMap` object.
         */
        toJSON(): RawSourceMap;
        /**
         * Gets the string representation of the source map.
         */
        toString(): string;
    }
    interface EmitTextWriter extends SymbolWriter {
        write(s: string): void;
        writeTrailingSemicolon(text: string): void;
        writeComment(text: string): void;
        getText(): string;
        rawWrite(s: string): void;
        writeLiteral(s: string): void;
        getTextPos(): number;
        getLine(): number;
        getColumn(): number;
        getIndent(): number;
        isAtStartOfLine(): boolean;
        hasTrailingComment(): boolean;
        hasTrailingWhitespace(): boolean;
        getTextPosWithWriteLine?(): number;
        nonEscapingWrite?(text: string): void;
    }
    interface GetEffectiveTypeRootsHost {
        directoryExists?(directoryName: string): boolean;
        getCurrentDirectory?(): string;
    }
    interface ModuleSpecifierResolutionHost {
        useCaseSensitiveFileNames?(): boolean;
        fileExists(path: string): boolean;
        getCurrentDirectory(): string;
        directoryExists?(path: string): boolean;
        readFile?(path: string): string | undefined;
        realpath?(path: string): string;
        getModuleSpecifierCache?(): ModuleSpecifierCache;
        getPackageJsonInfoCache?(): PackageJsonInfoCache | undefined;
        getGlobalTypingsCacheLocation?(): string | undefined;
        getNearestAncestorDirectoryWithPackageJson?(fileName: string, rootDir?: string): string | undefined;
        readonly redirectTargetsMap: RedirectTargetsMap;
        getProjectReferenceRedirect(fileName: string): string | undefined;
        isSourceOfProjectReferenceRedirect(fileName: string): boolean;
    }
    interface ModulePath {
        path: string;
        isInNodeModules: boolean;
        isRedirect: boolean;
    }
    interface ResolvedModuleSpecifierInfo {
        modulePaths: readonly ModulePath[] | undefined;
        moduleSpecifiers: readonly string[] | undefined;
        isBlockedByPackageJsonDependencies: boolean | undefined;
    }
    interface ModuleSpecifierOptions {
        overrideImportMode?: SourceFile["impliedNodeFormat"];
    }
    interface ModuleSpecifierCache {
        get(fromFileName: Path, toFileName: Path, preferences: UserPreferences, options: ModuleSpecifierOptions): Readonly<ResolvedModuleSpecifierInfo> | undefined;
        set(fromFileName: Path, toFileName: Path, preferences: UserPreferences, options: ModuleSpecifierOptions, modulePaths: readonly ModulePath[], moduleSpecifiers: readonly string[]): void;
        setBlockedByPackageJsonDependencies(fromFileName: Path, toFileName: Path, preferences: UserPreferences, options: ModuleSpecifierOptions, isBlockedByPackageJsonDependencies: boolean): void;
        setModulePaths(fromFileName: Path, toFileName: Path, preferences: UserPreferences, options: ModuleSpecifierOptions, modulePaths: readonly ModulePath[]): void;
        clear(): void;
        count(): number;
    }
    interface SymbolTracker {
        trackSymbol?(symbol: Symbol, enclosingDeclaration: Node | undefined, meaning: SymbolFlags): boolean;
        reportInaccessibleThisError?(): void;
        reportPrivateInBaseOfClassExpression?(propertyName: string): void;
        reportInaccessibleUniqueSymbolError?(): void;
        reportCyclicStructureError?(): void;
        reportLikelyUnsafeImportRequiredError?(specifier: string): void;
        reportTruncationError?(): void;
        moduleResolverHost?: ModuleSpecifierResolutionHost & {
            getCommonSourceDirectory(): string;
        };
        trackReferencedAmbientModule?(decl: ModuleDeclaration, symbol: Symbol): void;
        trackExternalModuleSymbolOfImportTypeNode?(symbol: Symbol): void;
        reportNonlocalAugmentation?(containingFile: SourceFile, parentSymbol: Symbol, augmentingSymbol: Symbol): void;
        reportNonSerializableProperty?(propertyName: string): void;
        reportImportTypeNodeResolutionModeOverride?(): void;
    }
    interface TextSpan {
        start: number;
        length: number;
    }
    interface TextChangeRange {
        span: TextSpan;
        newLength: number;
    }
    interface SyntaxList extends Node {
        kind: SyntaxKind.SyntaxList;
        _children: Node[];
    }
    enum ListFormat {
        None = 0,
        SingleLine = 0,
        MultiLine = 1,
        PreserveLines = 2,
        LinesMask = 3,
        NotDelimited = 0,
        BarDelimited = 4,
        AmpersandDelimited = 8,
        CommaDelimited = 16,
        AsteriskDelimited = 32,
        DelimitersMask = 60,
        AllowTrailingComma = 64,
        Indented = 128,
        SpaceBetweenBraces = 256,
        SpaceBetweenSiblings = 512,
        Braces = 1024,
        Parenthesis = 2048,
        AngleBrackets = 4096,
        SquareBrackets = 8192,
        BracketsMask = 15360,
        OptionalIfUndefined = 16384,
        OptionalIfEmpty = 32768,
        Optional = 49152,
        PreferNewLine = 65536,
        NoTrailingNewLine = 131072,
        NoInterveningComments = 262144,
        NoSpaceIfEmpty = 524288,
        SingleElement = 1048576,
        SpaceAfterList = 2097152,
        Modifiers = 2359808,
        HeritageClauses = 512,
        SingleLineTypeLiteralMembers = 768,
        MultiLineTypeLiteralMembers = 32897,
        SingleLineTupleTypeElements = 528,
        MultiLineTupleTypeElements = 657,
        UnionTypeConstituents = 516,
        IntersectionTypeConstituents = 520,
        ObjectBindingPatternElements = 525136,
        ArrayBindingPatternElements = 524880,
        ObjectLiteralExpressionProperties = 526226,
        ImportClauseEntries = 526226,
        ArrayLiteralExpressionElements = 8914,
        CommaListElements = 528,
        CallExpressionArguments = 2576,
        NewExpressionArguments = 18960,
        TemplateExpressionSpans = 262144,
        SingleLineBlockStatements = 768,
        MultiLineBlockStatements = 129,
        VariableDeclarationList = 528,
        SingleLineFunctionBodyStatements = 768,
        MultiLineFunctionBodyStatements = 1,
        ClassHeritageClauses = 0,
        ClassMembers = 129,
        InterfaceMembers = 129,
        EnumMembers = 145,
        CaseBlockClauses = 129,
        NamedImportsOrExportsElements = 525136,
        JsxElementOrFragmentChildren = 262144,
        JsxElementAttributes = 262656,
        CaseOrDefaultClauseStatements = 163969,
        HeritageClauseTypes = 528,
        SourceFileStatements = 131073,
        Decorators = 2146305,
        TypeArguments = 53776,
        TypeParameters = 53776,
        Parameters = 2576,
        IndexSignatureParameters = 8848,
        JSDocComment = 33
    }
    interface UserPreferences {
        readonly disableSuggestions?: boolean;
        readonly quotePreference?: "auto" | "double" | "single";
        readonly includeCompletionsForModuleExports?: boolean;
        readonly includeCompletionsForImportStatements?: boolean;
        readonly includeCompletionsWithSnippetText?: boolean;
        readonly includeAutomaticOptionalChainCompletions?: boolean;
        readonly includeCompletionsWithInsertText?: boolean;
        readonly includeCompletionsWithClassMemberSnippets?: boolean;
        readonly includeCompletionsWithObjectLiteralMethodSnippets?: boolean;
        readonly useLabelDetailsInCompletionEntries?: boolean;
        readonly allowIncompleteCompletions?: boolean;
        readonly importModuleSpecifierPreference?: "shortest" | "project-relative" | "relative" | "non-relative";
        /** Determines whether we import `foo/index.ts` as "foo", "foo/index", or "foo/index.js" */
        readonly importModuleSpecifierEnding?: "auto" | "minimal" | "index" | "js";
        readonly allowTextChangesInNewFiles?: boolean;
        readonly providePrefixAndSuffixTextForRename?: boolean;
        readonly includePackageJsonAutoImports?: "auto" | "on" | "off";
        readonly provideRefactorNotApplicableReason?: boolean;
        readonly jsxAttributeCompletionStyle?: "auto" | "braces" | "none";
        readonly includeInlayParameterNameHints?: "none" | "literals" | "all";
        readonly includeInlayParameterNameHintsWhenArgumentMatchesName?: boolean;
        readonly includeInlayFunctionParameterTypeHints?: boolean;
        readonly includeInlayVariableTypeHints?: boolean;
        readonly includeInlayVariableTypeHintsWhenTypeMatchesName?: boolean;
        readonly includeInlayPropertyDeclarationTypeHints?: boolean;
        readonly includeInlayFunctionLikeReturnTypeHints?: boolean;
        readonly includeInlayEnumMemberValueHints?: boolean;
        readonly allowRenameOfImportPath?: boolean;
        readonly autoImportFileExcludePatterns?: string[];
    }
    /** Represents a bigint literal value without requiring bigint support */
    interface PseudoBigInt {
        negative: boolean;
        base10Value: string;
    }
    function getNodeMajorVersion(): number | undefined;
    enum FileWatcherEventKind {
        Created = 0,
        Changed = 1,
        Deleted = 2
    }
    type FileWatcherCallback = (fileName: string, eventKind: FileWatcherEventKind, modifiedTime?: Date) => void;
    type DirectoryWatcherCallback = (fileName: string) => void;
    interface System {
        args: string[];
        newLine: string;
        useCaseSensitiveFileNames: boolean;
        write(s: string): void;
        writeOutputIsTTY?(): boolean;
        getWidthOfTerminal?(): number;
        readFile(path: string, encoding?: string): string | undefined;
        getFileSize?(path: string): number;
        writeFile(path: string, data: string, writeByteOrderMark?: boolean): void;
        /**
         * @pollingInterval - this parameter is used in polling-based watchers and ignored in watchers that
         * use native OS file watching
         */
        watchFile?(path: string, callback: FileWatcherCallback, pollingInterval?: number, options?: WatchOptions): FileWatcher;
        watchDirectory?(path: string, callback: DirectoryWatcherCallback, recursive?: boolean, options?: WatchOptions): FileWatcher;
        resolvePath(path: string): string;
        fileExists(path: string): boolean;
        directoryExists(path: string): boolean;
        createDirectory(path: string): void;
        getExecutingFilePath(): string;
        getCurrentDirectory(): string;
        getDirectories(path: string): string[];
        readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
        getModifiedTime?(path: string): Date | undefined;
        setModifiedTime?(path: string, time: Date): void;
        deleteFile?(path: string): void;
        /**
         * A good implementation is node.js' `crypto.createHash`. (https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm)
         */
        createHash?(data: string): string;
        /** This must be cryptographically secure. Only implement this method using `crypto.createHash("sha256")`. */
        createSHA256Hash?(data: string): string;
        getMemoryUsage?(): number;
        exit(exitCode?: number): void;
        realpath?(path: string): string;
        setTimeout?(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
        clearTimeout?(timeoutId: any): void;
        clearScreen?(): void;
        base64decode?(input: string): string;
        base64encode?(input: string): string;
    }
    interface FileWatcher {
        close(): void;
    }
    let sys: System;
    namespace MemoryDotting {
        interface RecordInfo {
            recordStage: string;
            recordIndex: number;
        }
        const BINDE_SOURCE_FILE = "binder(bindSourceFile: Bind)";
        const CHECK_SOURCE_FILE = "checker(checkSourceFile: Check)";
        const EMIT_FILES = "emitter(emitFiles: EmitEachOutputFile)";
        const CREATE_SORUCE_FILE_PARSE = "parser(createSourceFile: Parse)";
        const BEFORE_PROGRAM = "program(createProgram: beforeProgram)";
        const TRANSFORM = "transformer(transformNodes: Transform)";
        function recordStage(stage: string): RecordInfo | null;
        function stopRecordStage(recordInfo: RecordInfo | null): void;
        function setMemoryDottingCallBack(recordCallback: (stage: string) => RecordInfo, stopCallback: (recordInfo: RecordInfo) => void): void;
        function clearCallBack(): void;
    }
    function tokenToString(t: SyntaxKind): string | undefined;
    function getPositionOfLineAndCharacter(sourceFile: SourceFileLike, line: number, character: number): number;
    function getLineAndCharacterOfPosition(sourceFile: SourceFileLike, position: number): LineAndCharacter;
    function isWhiteSpaceLike(ch: number): boolean;
    /** Does not include line breaks. For that, see isWhiteSpaceLike. */
    function isWhiteSpaceSingleLine(ch: number): boolean;
    function isLineBreak(ch: number): boolean;
    function couldStartTrivia(text: string, pos: number): boolean;
    function forEachLeadingCommentRange<U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean) => U): U | undefined;
    function forEachLeadingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T) => U, state: T): U | undefined;
    function forEachTrailingCommentRange<U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean) => U): U | undefined;
    function forEachTrailingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T) => U, state: T): U | undefined;
    function reduceEachLeadingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T, memo: U) => U, state: T, initial: U): U | undefined;
    function reduceEachTrailingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T, memo: U) => U, state: T, initial: U): U | undefined;
    function getLeadingCommentRanges(text: string, pos: number): CommentRange[] | undefined;
    function getTrailingCommentRanges(text: string, pos: number): CommentRange[] | undefined;
    /** Optionally, get the shebang */
    function getShebang(text: string): string | undefined;
    function isIdentifierStart(ch: number, languageVersion: ScriptTarget | undefined): boolean;
    function isIdentifierPart(ch: number, languageVersion: ScriptTarget | undefined, identifierVariant?: LanguageVariant): boolean;
    function createScanner(languageVersion: ScriptTarget, skipTrivia: boolean, languageVariant?: LanguageVariant, textInitial?: string, onError?: ErrorCallback, start?: number, length?: number): Scanner;
    type ErrorCallback = (message: DiagnosticMessage, length: number) => void;
    interface Scanner {
        getStartPos(): number;
        getToken(): SyntaxKind;
        getTextPos(): number;
        getTokenPos(): number;
        getTokenText(): string;
        getTokenValue(): string;
        hasUnicodeEscape(): boolean;
        hasExtendedUnicodeEscape(): boolean;
        hasPrecedingLineBreak(): boolean;
        isIdentifier(): boolean;
        isReservedWord(): boolean;
        isUnterminated(): boolean;
        reScanGreaterToken(): SyntaxKind;
        reScanSlashToken(): SyntaxKind;
        reScanAsteriskEqualsToken(): SyntaxKind;
        reScanTemplateToken(isTaggedTemplate: boolean): SyntaxKind;
        reScanTemplateHeadOrNoSubstitutionTemplate(): SyntaxKind;
        scanJsxIdentifier(): SyntaxKind;
        scanJsxAttributeValue(): SyntaxKind;
        reScanJsxAttributeValue(): SyntaxKind;
        reScanJsxToken(allowMultilineJsxText?: boolean): JsxTokenSyntaxKind;
        reScanLessThanToken(): SyntaxKind;
        reScanHashToken(): SyntaxKind;
        reScanQuestionToken(): SyntaxKind;
        reScanInvalidIdentifier(): SyntaxKind;
        scanJsxToken(): JsxTokenSyntaxKind;
        scanJsDocToken(): JSDocSyntaxKind;
        scan(): SyntaxKind;
        getText(): string;
        setText(text: string | undefined, start?: number, length?: number): void;
        setOnError(onError: ErrorCallback | undefined): void;
        setScriptTarget(scriptTarget: ScriptTarget): void;
        setLanguageVariant(variant: LanguageVariant): void;
        setTextPos(textPos: number): void;
        lookAhead<T>(callback: () => T): T;
        scanRange<T>(start: number, length: number, callback: () => T): T;
        tryScan<T>(callback: () => T): T;
        setEtsContext(isEtsContext: boolean): void;
    }
    function isExternalModuleNameRelative(moduleName: string): boolean;
    function sortAndDeduplicateDiagnostics<T extends Diagnostic>(diagnostics: readonly T[]): SortedReadonlyArray<T>;
    function getDefaultLibFileName(options: CompilerOptions): string;
    function textSpanEnd(span: TextSpan): number;
    function textSpanIsEmpty(span: TextSpan): boolean;
    function textSpanContainsPosition(span: TextSpan, position: number): boolean;
    function textSpanContainsTextSpan(span: TextSpan, other: TextSpan): boolean;
    function textSpanOverlapsWith(span: TextSpan, other: TextSpan): boolean;
    function textSpanOverlap(span1: TextSpan, span2: TextSpan): TextSpan | undefined;
    function textSpanIntersectsWithTextSpan(span: TextSpan, other: TextSpan): boolean;
    function textSpanIntersectsWith(span: TextSpan, start: number, length: number): boolean;
    function decodedTextSpanIntersectsWith(start1: number, length1: number, start2: number, length2: number): boolean;
    function textSpanIntersectsWithPosition(span: TextSpan, position: number): boolean;
    function textSpanIntersection(span1: TextSpan, span2: TextSpan): TextSpan | undefined;
    function createTextSpan(start: number, length: number): TextSpan;
    function createTextSpanFromBounds(start: number, end: number): TextSpan;
    function textChangeRangeNewSpan(range: TextChangeRange): TextSpan;
    function textChangeRangeIsUnchanged(range: TextChangeRange): boolean;
    function createTextChangeRange(span: TextSpan, newLength: number): TextChangeRange;
    /**
     * Called to merge all the changes that occurred across several versions of a script snapshot
     * into a single change.  i.e. if a user keeps making successive edits to a script we will
     * have a text change from V1 to V2, V2 to V3, ..., Vn.
     *
     * This function will then merge those changes into a single change range valid between V1 and
     * Vn.
     */
    function collapseTextChangeRangesAcrossMultipleVersions(changes: readonly TextChangeRange[]): TextChangeRange;
    function getTypeParameterOwner(d: Declaration): Declaration | undefined;
    function isParameterPropertyDeclaration(node: Node, parent: Node): node is ParameterPropertyDeclaration;
    function isEmptyBindingPattern(node: BindingName): node is BindingPattern;
    function isEmptyBindingElement(node: BindingElement): boolean;
    function walkUpBindingElementsAndPatterns(binding: BindingElement): VariableDeclaration | ParameterDeclaration;
    function getCombinedModifierFlags(node: Declaration): ModifierFlags;
    function getCombinedNodeFlags(node: Node): NodeFlags;
    /**
     * Checks to see if the locale is in the appropriate format,
     * and if it is, attempts to set the appropriate language.
     */
    function validateLocaleAndSetLanguage(locale: string, sys: {
        getExecutingFilePath(): string;
        resolvePath(path: string): string;
        fileExists(fileName: string): boolean;
        readFile(fileName: string): string | undefined;
    }, errors?: Push<Diagnostic>): void;
    function getOriginalNode(node: Node): Node;
    function getOriginalNode<T extends Node>(node: Node, nodeTest: (node: Node) => node is T): T;
    function getOriginalNode(node: Node | undefined): Node | undefined;
    function getOriginalNode<T extends Node>(node: Node | undefined, nodeTest: (node: Node | undefined) => node is T): T | undefined;
    /**
     * Iterates through the parent chain of a node and performs the callback on each parent until the callback
     * returns a truthy value, then returns that value.
     * If no such value is found, it applies the callback until the parent pointer is undefined or the callback returns "quit"
     * At that point findAncestor returns undefined.
     */
    function findAncestor<T extends Node>(node: Node | undefined, callback: (element: Node) => element is T): T | undefined;
    function findAncestor(node: Node | undefined, callback: (element: Node) => boolean | "quit"): Node | undefined;
    /**
     * Gets a value indicating whether a node originated in the parse tree.
     *
     * @param node The node to test.
     */
    function isParseTreeNode(node: Node): boolean;
    /**
     * Gets the original parse tree node for a node.
     *
     * @param node The original node.
     * @returns The original parse tree node if found; otherwise, undefined.
     */
    function getParseTreeNode(node: Node | undefined): Node | undefined;
    /**
     * Gets the original parse tree node for a node.
     *
     * @param node The original node.
     * @param nodeTest A callback used to ensure the correct type of parse tree node is returned.
     * @returns The original parse tree node if found; otherwise, undefined.
     */
    function getParseTreeNode<T extends Node>(node: T | undefined, nodeTest?: (node: Node) => node is T): T | undefined;
    /** Add an extra underscore to identifiers that start with two underscores to avoid issues with magic names like '__proto__' */
    function escapeLeadingUnderscores(identifier: string): __String;
    /**
     * Remove extra underscore from escaped identifier text content.
     *
     * @param identifier The escaped identifier text.
     * @returns The unescaped identifier text.
     */
    function unescapeLeadingUnderscores(identifier: __String): string;
    function idText(identifierOrPrivateName: Identifier | PrivateIdentifier): string;
    function symbolName(symbol: Symbol): string;
    function getNameOfJSDocTypedef(declaration: JSDocTypedefTag): Identifier | PrivateIdentifier | undefined;
    function getNameOfDeclaration(declaration: Declaration | Expression | undefined): DeclarationName | undefined;
    function getDecorators(node: HasDecorators): readonly Decorator[] | undefined;
    function getAnnotations(node: HasDecorators): readonly Decorator[] | undefined;
    function getModifiers(node: HasModifiers): readonly Modifier[] | undefined;
    function getAllDecorators(node: Node | undefined): readonly Decorator[];
    function getIllegalDecorators(node: HasIllegalDecorators): readonly Decorator[] | undefined;
    /**
     * Gets the JSDoc parameter tags for the node if present.
     *
     * @remarks Returns any JSDoc param tag whose name matches the provided
     * parameter, whether a param tag on a containing function
     * expression, or a param tag on a variable declaration whose
     * initializer is the containing function. The tags closest to the
     * node are returned first, so in the previous example, the param
     * tag on the containing function expression would be first.
     *
     * For binding patterns, parameter tags are matched by position.
     */
    function getJSDocParameterTags(param: ParameterDeclaration): readonly JSDocParameterTag[];
    /**
     * Gets the JSDoc type parameter tags for the node if present.
     *
     * @remarks Returns any JSDoc template tag whose names match the provided
     * parameter, whether a template tag on a containing function
     * expression, or a template tag on a variable declaration whose
     * initializer is the containing function. The tags closest to the
     * node are returned first, so in the previous example, the template
     * tag on the containing function expression would be first.
     */
    function getJSDocTypeParameterTags(param: TypeParameterDeclaration): readonly JSDocTemplateTag[];
    /**
     * Return true if the node has JSDoc parameter tags.
     *
     * @remarks Includes parameter tags that are not directly on the node,
     * for example on a variable declaration whose initializer is a function expression.
     */
    function hasJSDocParameterTags(node: FunctionLikeDeclaration | SignatureDeclaration): boolean;
    /** Gets the JSDoc augments tag for the node if present */
    function getJSDocAugmentsTag(node: Node): JSDocAugmentsTag | undefined;
    /** Gets the JSDoc implements tags for the node if present */
    function getJSDocImplementsTags(node: Node): readonly JSDocImplementsTag[];
    /** Gets the JSDoc class tag for the node if present */
    function getJSDocClassTag(node: Node): JSDocClassTag | undefined;
    /** Gets the JSDoc public tag for the node if present */
    function getJSDocPublicTag(node: Node): JSDocPublicTag | undefined;
    /** Gets the JSDoc private tag for the node if present */
    function getJSDocPrivateTag(node: Node): JSDocPrivateTag | undefined;
    /** Gets the JSDoc protected tag for the node if present */
    function getJSDocProtectedTag(node: Node): JSDocProtectedTag | undefined;
    /** Gets the JSDoc protected tag for the node if present */
    function getJSDocReadonlyTag(node: Node): JSDocReadonlyTag | undefined;
    function getJSDocOverrideTagNoCache(node: Node): JSDocOverrideTag | undefined;
    /** Gets the JSDoc deprecated tag for the node if present */
    function getJSDocDeprecatedTag(node: Node): JSDocDeprecatedTag | undefined;
    /** Gets the JSDoc enum tag for the node if present */
    function getJSDocEnumTag(node: Node): JSDocEnumTag | undefined;
    /** Gets the JSDoc this tag for the node if present */
    function getJSDocThisTag(node: Node): JSDocThisTag | undefined;
    /** Gets the JSDoc return tag for the node if present */
    function getJSDocReturnTag(node: Node): JSDocReturnTag | undefined;
    /** Gets the JSDoc template tag for the node if present */
    function getJSDocTemplateTag(node: Node): JSDocTemplateTag | undefined;
    /** Gets the JSDoc type tag for the node if present and valid */
    function getJSDocTypeTag(node: Node): JSDocTypeTag | undefined;
    /**
     * Gets the type node for the node if provided via JSDoc.
     *
     * @remarks The search includes any JSDoc param tag that relates
     * to the provided parameter, for example a type tag on the
     * parameter itself, or a param tag on a containing function
     * expression, or a param tag on a variable declaration whose
     * initializer is the containing function. The tags closest to the
     * node are examined first, so in the previous example, the type
     * tag directly on the node would be returned.
     */
    function getJSDocType(node: Node): TypeNode | undefined;
    /**
     * Gets the return type node for the node if provided via JSDoc return tag or type tag.
     *
     * @remarks `getJSDocReturnTag` just gets the whole JSDoc tag. This function
     * gets the type from inside the braces, after the fat arrow, etc.
     */
    function getJSDocReturnType(node: Node): TypeNode | undefined;
    /** Get all JSDoc tags related to a node, including those on parent nodes. */
    function getJSDocTags(node: Node): readonly JSDocTag[];
    /** Gets all JSDoc tags that match a specified predicate */
    function getAllJSDocTags<T extends JSDocTag>(node: Node, predicate: (tag: JSDocTag) => tag is T): readonly T[];
    /** Gets all JSDoc tags of a specified kind */
    function getAllJSDocTagsOfKind(node: Node, kind: SyntaxKind): readonly JSDocTag[];
    /** Gets the text of a jsdoc comment, flattening links to their text. */
    function getTextOfJSDocComment(comment?: string | NodeArray<JSDocComment>): string | undefined;
    /**
     * Gets the effective type parameters. If the node was parsed in a
     * JavaScript file, gets the type parameters from the `@template` tag from JSDoc.
     *
     * This does *not* return type parameters from a jsdoc reference to a generic type, eg
     *
     * type Id = <T>(x: T) => T
     * /** @type {Id} /
     * function id(x) { return x }
     */
    function getEffectiveTypeParameterDeclarations(node: DeclarationWithTypeParameters): readonly TypeParameterDeclaration[];
    function getEffectiveConstraintOfTypeParameter(node: TypeParameterDeclaration): TypeNode | undefined;
    function isMemberName(node: Node): node is MemberName;
    function isPropertyAccessChain(node: Node): node is PropertyAccessChain;
    function isElementAccessChain(node: Node): node is ElementAccessChain;
    function isCallChain(node: Node): node is CallChain;
    function isOptionalChain(node: Node): node is PropertyAccessChain | ElementAccessChain | CallChain | NonNullChain;
    function isNullishCoalesce(node: Node): boolean;
    function isConstTypeReference(node: Node): boolean;
    function skipPartiallyEmittedExpressions(node: Expression): Expression;
    function skipPartiallyEmittedExpressions(node: Node): Node;
    function isNonNullChain(node: Node): node is NonNullChain;
    function isBreakOrContinueStatement(node: Node): node is BreakOrContinueStatement;
    function isNamedExportBindings(node: Node): node is NamedExportBindings;
    function isUnparsedTextLike(node: Node): node is UnparsedTextLike;
    function isUnparsedNode(node: Node): node is UnparsedNode;
    function isJSDocPropertyLikeTag(node: Node): node is JSDocPropertyLikeTag;
    /**
     * True if kind is of some token syntax kind.
     * For example, this is true for an IfKeyword but not for an IfStatement.
     * Literals are considered tokens, except TemplateLiteral, but does include TemplateHead/Middle/Tail.
     */
    function isTokenKind(kind: SyntaxKind): boolean;
    /**
     * True if node is of some token syntax kind.
     * For example, this is true for an IfKeyword but not for an IfStatement.
     * Literals are considered tokens, except TemplateLiteral, but does include TemplateHead/Middle/Tail.
     */
    function isToken(n: Node): boolean;
    function isLiteralExpression(node: Node): node is LiteralExpression;
    function isTemplateLiteralToken(node: Node): node is TemplateLiteralToken;
    function isTemplateMiddleOrTemplateTail(node: Node): node is TemplateMiddle | TemplateTail;
    function isImportOrExportSpecifier(node: Node): node is ImportSpecifier | ExportSpecifier;
    function isTypeOnlyImportOrExportDeclaration(node: Node): node is TypeOnlyAliasDeclaration;
    function isAssertionKey(node: Node): node is AssertionKey;
    function isStringTextContainingNode(node: Node): node is StringLiteral | TemplateLiteralToken;
    function isModifier(node: Node): node is Modifier;
    function isEntityName(node: Node): node is EntityName;
    function isPropertyName(node: Node): node is PropertyName;
    function isBindingName(node: Node): node is BindingName;
    function isFunctionLike(node: Node | undefined): node is SignatureDeclaration;
    function isAnnotationElement(node: Node): node is AnnotationElement;
    function isClassElement(node: Node): node is ClassElement;
    function isClassLike(node: Node): node is ClassLikeDeclaration;
    function isStruct(node: Node): node is StructDeclaration;
    function isAccessor(node: Node): node is AccessorDeclaration;
    function isAutoAccessorPropertyDeclaration(node: Node): node is AutoAccessorPropertyDeclaration;
    function isModifierLike(node: Node): node is ModifierLike;
    function isTypeElement(node: Node): node is TypeElement;
    function isClassOrTypeElement(node: Node): node is ClassElement | TypeElement;
    function isObjectLiteralElementLike(node: Node): node is ObjectLiteralElementLike;
    /**
     * Node test that determines whether a node is a valid type node.
     * This differs from the `isPartOfTypeNode` function which determines whether a node is *part*
     * of a TypeNode.
     */
    function isTypeNode(node: Node): node is TypeNode;
    function isFunctionOrConstructorTypeNode(node: Node): node is FunctionTypeNode | ConstructorTypeNode;
    function isPropertyAccessOrQualifiedName(node: Node): node is PropertyAccessExpression | QualifiedName;
    function isCallLikeExpression(node: Node): node is CallLikeExpression;
    function isCallOrNewExpression(node: Node): node is CallExpression | NewExpression;
    function isTemplateLiteral(node: Node): node is TemplateLiteral;
    function isAssertionExpression(node: Node): node is AssertionExpression;
    function isIterationStatement(node: Node, lookInLabeledStatements: false): node is IterationStatement;
    function isIterationStatement(node: Node, lookInLabeledStatements: boolean): node is IterationStatement | LabeledStatement;
    function isDeclarationStatement(node: Node): node is DeclarationStatement;
    function isJsxOpeningLikeElement(node: Node): node is JsxOpeningLikeElement;
    function isCaseOrDefaultClause(node: Node): node is CaseOrDefaultClause;
    /** True if node is of a kind that may contain comment text. */
    function isJSDocCommentContainingNode(node: Node): boolean;
    function isSetAccessor(node: Node): node is SetAccessorDeclaration;
    function isGetAccessor(node: Node): node is GetAccessorDeclaration;
    /** True if has initializer node attached to it. */
    function hasOnlyExpressionInitializer(node: Node): node is HasExpressionInitializer;
    function isObjectLiteralElement(node: Node): node is ObjectLiteralElement;
    function isStringLiteralLike(node: Node): node is StringLiteralLike;
    function isJSDocLinkLike(node: Node): node is JSDocLink | JSDocLinkCode | JSDocLinkPlain;
    function hasRestParameter(s: SignatureDeclaration | JSDocSignature): boolean;
    function isRestParameter(node: ParameterDeclaration | JSDocParameterTag): boolean;
    let unchangedTextChangeRange: TextChangeRange;
    type ParameterPropertyDeclaration = ParameterDeclaration & {
        parent: ConstructorDeclaration;
        name: Identifier;
    };
    class MemoryUtils {
        private static MemoryAfterGC;
        private static baseMemorySize;
        private static MIN_GC_THRESHOLD;
        private static memoryGCThreshold;
        static GC_THRESHOLD_RATIO: number;
        /**
         * Try garbage collection if the memory usage exceeds MEMORY_BASELINE.
         */
        static tryGC(): void;
        static initializeBaseMemory(baseMemorySize?: number): void;
        static updateBaseMemory(MemoryBeforeGC: number): void;
    }
    function isPartOfTypeNode(node: Node): boolean;
    function getJSDocCommentsAndTags(hostNode: Node, noCache?: boolean): readonly (JSDoc | JSDocTag)[];
    function getLeadingCommentRangesOfNode(node: Node, sourceFileOfNode: SourceFile): ts.CommentRange[] | undefined;
    function createTextWriter(newLine: string): EmitTextWriter;
    /**
     * Bypasses immutability and directly sets the `parent` property of each `Node` recursively.
     * @param rootNode The root node from which to start the recursion.
     * @param incremental When `true`, only recursively descends through nodes whose `parent` pointers are incorrect.
     * This allows us to quickly bail out of setting `parent` for subtrees during incremental parsing.
     */
    function setParentRecursive<T extends Node>(rootNode: T, incremental: boolean): T;
    function setParentRecursive<T extends Node>(rootNode: T | undefined, incremental: boolean): T | undefined;
    function createUnparsedSourceFile(text: string): UnparsedSource;
    function createUnparsedSourceFile(inputFile: InputFiles, type: "js" | "dts", stripInternal?: boolean): UnparsedSource;
    function createUnparsedSourceFile(text: string, mapPath: string | undefined, map: string | undefined): UnparsedSource;
    function createInputFiles(javascriptText: string, declarationText: string): InputFiles;
    function createInputFiles(readFileText: (path: string) => string | undefined, javascriptPath: string, javascriptMapPath: string | undefined, declarationPath: string, declarationMapPath: string | undefined, buildInfoPath: string | undefined): InputFiles;
    function createInputFiles(javascriptText: string, declarationText: string, javascriptMapPath: string | undefined, javascriptMapText: string | undefined, declarationMapPath: string | undefined, declarationMapText: string | undefined): InputFiles;
    /**
     * Create an external source map source file reference
     */
    function createSourceMapSource(fileName: string, text: string, skipTrivia?: (pos: number) => number): SourceMapSource;
    function setOriginalNode<T extends Node>(node: T, original: Node | undefined): T;
    const factory: NodeFactory;
    /**
     * Clears any `EmitNode` entries from parse-tree nodes.
     * @param sourceFile A source file.
     */
    function disposeEmitNodes(sourceFile: SourceFile | undefined): void;
    /**
     * Sets flags that control emit behavior of a node.
     */
    function setEmitFlags<T extends Node>(node: T, emitFlags: EmitFlags): T;
    /**
     * Gets a custom text range to use when emitting source maps.
     */
    function getSourceMapRange(node: Node): SourceMapRange;
    /**
     * Sets a custom text range to use when emitting source maps.
     */
    function setSourceMapRange<T extends Node>(node: T, range: SourceMapRange | undefined): T;
    /**
     * Gets the TextRange to use for source maps for a token of a node.
     */
    function getTokenSourceMapRange(node: Node, token: SyntaxKind): SourceMapRange | undefined;
    /**
     * Sets the TextRange to use for source maps for a token of a node.
     */
    function setTokenSourceMapRange<T extends Node>(node: T, token: SyntaxKind, range: SourceMapRange | undefined): T;
    /**
     * Gets a custom text range to use when emitting comments.
     */
    function getCommentRange(node: Node): TextRange;
    /**
     * Sets a custom text range to use when emitting comments.
     */
    function setCommentRange<T extends Node>(node: T, range: TextRange): T;
    function getSyntheticLeadingComments(node: Node): SynthesizedComment[] | undefined;
    function setSyntheticLeadingComments<T extends Node>(node: T, comments: SynthesizedComment[] | undefined): T;
    function addSyntheticLeadingComment<T extends Node>(node: T, kind: SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia, text: string, hasTrailingNewLine?: boolean): T;
    function getSyntheticTrailingComments(node: Node): SynthesizedComment[] | undefined;
    function setSyntheticTrailingComments<T extends Node>(node: T, comments: SynthesizedComment[] | undefined): T;
    function addSyntheticTrailingComment<T extends Node>(node: T, kind: SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia, text: string, hasTrailingNewLine?: boolean): T;
    function moveSyntheticComments<T extends Node>(node: T, original: Node): T;
    /**
     * Gets the constant value to emit for an expression representing an enum.
     */
    function getConstantValue(node: AccessExpression): string | number | undefined;
    /**
     * Sets the constant value to emit for an expression.
     */
    function setConstantValue(node: AccessExpression, value: string | number): AccessExpression;
    /**
     * Adds an EmitHelper to a node.
     */
    function addEmitHelper<T extends Node>(node: T, helper: EmitHelper): T;
    /**
     * Add EmitHelpers to a node.
     */
    function addEmitHelpers<T extends Node>(node: T, helpers: EmitHelper[] | undefined): T;
    /**
     * Removes an EmitHelper from a node.
     */
    function removeEmitHelper(node: Node, helper: EmitHelper): boolean;
    /**
     * Gets the EmitHelpers of a node.
     */
    function getEmitHelpers(node: Node): EmitHelper[] | undefined;
    /**
     * Moves matching emit helpers from a source node to a target node.
     */
    function moveEmitHelpers(source: Node, target: Node, predicate: (helper: EmitHelper) => boolean): void;
    function isNumericLiteral(node: Node): node is NumericLiteral;
    function isBigIntLiteral(node: Node): node is BigIntLiteral;
    function isStringLiteral(node: Node): node is StringLiteral;
    function isJsxText(node: Node): node is JsxText;
    function isRegularExpressionLiteral(node: Node): node is RegularExpressionLiteral;
    function isNoSubstitutionTemplateLiteral(node: Node): node is NoSubstitutionTemplateLiteral;
    function isTemplateHead(node: Node): node is TemplateHead;
    function isTemplateMiddle(node: Node): node is TemplateMiddle;
    function isTemplateTail(node: Node): node is TemplateTail;
    function isDotDotDotToken(node: Node): node is DotDotDotToken;
    function isPlusToken(node: Node): node is PlusToken;
    function isMinusToken(node: Node): node is MinusToken;
    function isAsteriskToken(node: Node): node is AsteriskToken;
    function isIdentifier(node: Node): node is Identifier;
    function isPrivateIdentifier(node: Node): node is PrivateIdentifier;
    function isQualifiedName(node: Node): node is QualifiedName;
    function isComputedPropertyName(node: Node): node is ComputedPropertyName;
    function isTypeParameterDeclaration(node: Node): node is TypeParameterDeclaration;
    function isParameter(node: Node): node is ParameterDeclaration;
    function isDecoratorOrAnnotation(node: Node): node is Decorator;
    function isDecorator(node: Node): node is Decorator;
    function isAnnotation(node: Node): node is Annotation;
    function isPropertySignature(node: Node): node is PropertySignature;
    function isPropertyDeclaration(node: Node): node is PropertyDeclaration;
    function isAnnotationPropertyDeclaration(node: Node): node is AnnotationPropertyDeclaration;
    function isMethodSignature(node: Node): node is MethodSignature;
    function isMethodDeclaration(node: Node): node is MethodDeclaration;
    function isClassStaticBlockDeclaration(node: Node): node is ClassStaticBlockDeclaration;
    function isConstructorDeclaration(node: Node): node is ConstructorDeclaration;
    function isGetAccessorDeclaration(node: Node): node is GetAccessorDeclaration;
    function isSetAccessorDeclaration(node: Node): node is SetAccessorDeclaration;
    function isCallSignatureDeclaration(node: Node): node is CallSignatureDeclaration;
    function isConstructSignatureDeclaration(node: Node): node is ConstructSignatureDeclaration;
    function isIndexSignatureDeclaration(node: Node): node is IndexSignatureDeclaration;
    function isTypePredicateNode(node: Node): node is TypePredicateNode;
    function isTypeReferenceNode(node: Node): node is TypeReferenceNode;
    function isFunctionTypeNode(node: Node): node is FunctionTypeNode;
    function isConstructorTypeNode(node: Node): node is ConstructorTypeNode;
    function isTypeQueryNode(node: Node): node is TypeQueryNode;
    function isTypeLiteralNode(node: Node): node is TypeLiteralNode;
    function isArrayTypeNode(node: Node): node is ArrayTypeNode;
    function isTupleTypeNode(node: Node): node is TupleTypeNode;
    function isNamedTupleMember(node: Node): node is NamedTupleMember;
    function isOptionalTypeNode(node: Node): node is OptionalTypeNode;
    function isRestTypeNode(node: Node): node is RestTypeNode;
    function isUnionTypeNode(node: Node): node is UnionTypeNode;
    function isIntersectionTypeNode(node: Node): node is IntersectionTypeNode;
    function isConditionalTypeNode(node: Node): node is ConditionalTypeNode;
    function isInferTypeNode(node: Node): node is InferTypeNode;
    function isParenthesizedTypeNode(node: Node): node is ParenthesizedTypeNode;
    function isThisTypeNode(node: Node): node is ThisTypeNode;
    function isTypeOperatorNode(node: Node): node is TypeOperatorNode;
    function isIndexedAccessTypeNode(node: Node): node is IndexedAccessTypeNode;
    function isMappedTypeNode(node: Node): node is MappedTypeNode;
    function isLiteralTypeNode(node: Node): node is LiteralTypeNode;
    function isImportTypeNode(node: Node): node is ImportTypeNode;
    function isTemplateLiteralTypeSpan(node: Node): node is TemplateLiteralTypeSpan;
    function isTemplateLiteralTypeNode(node: Node): node is TemplateLiteralTypeNode;
    function isObjectBindingPattern(node: Node): node is ObjectBindingPattern;
    function isArrayBindingPattern(node: Node): node is ArrayBindingPattern;
    function isBindingElement(node: Node): node is BindingElement;
    function isArrayLiteralExpression(node: Node): node is ArrayLiteralExpression;
    function isObjectLiteralExpression(node: Node): node is ObjectLiteralExpression;
    function isPropertyAccessExpression(node: Node): node is PropertyAccessExpression;
    function isElementAccessExpression(node: Node): node is ElementAccessExpression;
    function isCallExpression(node: Node): node is CallExpression;
    function isNewExpression(node: Node): node is NewExpression;
    function isTaggedTemplateExpression(node: Node): node is TaggedTemplateExpression;
    function isTypeAssertionExpression(node: Node): node is TypeAssertion;
    function isParenthesizedExpression(node: Node): node is ParenthesizedExpression;
    function isFunctionExpression(node: Node): node is FunctionExpression;
    function isEtsComponentExpression(node: Node): node is EtsComponentExpression;
    function isArrowFunction(node: Node): node is ArrowFunction;
    function isDeleteExpression(node: Node): node is DeleteExpression;
    function isTypeOfExpression(node: Node): node is TypeOfExpression;
    function isVoidExpression(node: Node): node is VoidExpression;
    function isAwaitExpression(node: Node): node is AwaitExpression;
    function isPrefixUnaryExpression(node: Node): node is PrefixUnaryExpression;
    function isPostfixUnaryExpression(node: Node): node is PostfixUnaryExpression;
    function isBinaryExpression(node: Node): node is BinaryExpression;
    function isConditionalExpression(node: Node): node is ConditionalExpression;
    function isTemplateExpression(node: Node): node is TemplateExpression;
    function isYieldExpression(node: Node): node is YieldExpression;
    function isSpreadElement(node: Node): node is SpreadElement;
    function isClassExpression(node: Node): node is ClassExpression;
    function isOmittedExpression(node: Node): node is OmittedExpression;
    function isExpressionWithTypeArguments(node: Node): node is ExpressionWithTypeArguments;
    function isAsExpression(node: Node): node is AsExpression;
    function isSatisfiesExpression(node: Node): node is SatisfiesExpression;
    function isNonNullExpression(node: Node): node is NonNullExpression;
    function isMetaProperty(node: Node): node is MetaProperty;
    function isSyntheticExpression(node: Node): node is SyntheticExpression;
    function isPartiallyEmittedExpression(node: Node): node is PartiallyEmittedExpression;
    function isCommaListExpression(node: Node): node is CommaListExpression;
    function isTemplateSpan(node: Node): node is TemplateSpan;
    function isSemicolonClassElement(node: Node): node is SemicolonClassElement;
    function isBlock(node: Node): node is Block;
    function isVariableStatement(node: Node): node is VariableStatement;
    function isEmptyStatement(node: Node): node is EmptyStatement;
    function isExpressionStatement(node: Node): node is ExpressionStatement;
    function isIfStatement(node: Node): node is IfStatement;
    function isDoStatement(node: Node): node is DoStatement;
    function isWhileStatement(node: Node): node is WhileStatement;
    function isForStatement(node: Node): node is ForStatement;
    function isForInStatement(node: Node): node is ForInStatement;
    function isForOfStatement(node: Node): node is ForOfStatement;
    function isContinueStatement(node: Node): node is ContinueStatement;
    function isBreakStatement(node: Node): node is BreakStatement;
    function isReturnStatement(node: Node): node is ReturnStatement;
    function isWithStatement(node: Node): node is WithStatement;
    function isSwitchStatement(node: Node): node is SwitchStatement;
    function isLabeledStatement(node: Node): node is LabeledStatement;
    function isThrowStatement(node: Node): node is ThrowStatement;
    function isTryStatement(node: Node): node is TryStatement;
    function isDebuggerStatement(node: Node): node is DebuggerStatement;
    function isVariableDeclaration(node: Node): node is VariableDeclaration;
    function isVariableDeclarationList(node: Node): node is VariableDeclarationList;
    function isFunctionDeclaration(node: Node): node is FunctionDeclaration;
    function isClassDeclaration(node: Node): node is ClassDeclaration;
    function isStructDeclaration(node: Node): node is StructDeclaration;
    function isAnnotationDeclaration(node: Node): node is AnnotationDeclaration;
    function isInterfaceDeclaration(node: Node): node is InterfaceDeclaration;
    function isTypeAliasDeclaration(node: Node): node is TypeAliasDeclaration;
    function isEnumDeclaration(node: Node): node is EnumDeclaration;
    function isModuleDeclaration(node: Node): node is ModuleDeclaration;
    function isModuleBlock(node: Node): node is ModuleBlock;
    function isCaseBlock(node: Node): node is CaseBlock;
    function isNamespaceExportDeclaration(node: Node): node is NamespaceExportDeclaration;
    function isImportEqualsDeclaration(node: Node): node is ImportEqualsDeclaration;
    function isImportDeclaration(node: Node): node is ImportDeclaration;
    function isImportClause(node: Node): node is ImportClause;
    function isImportTypeAssertionContainer(node: Node): node is ImportTypeAssertionContainer;
    function isAssertClause(node: Node): node is AssertClause;
    function isAssertEntry(node: Node): node is AssertEntry;
    function isNamespaceImport(node: Node): node is NamespaceImport;
    function isNamespaceExport(node: Node): node is NamespaceExport;
    function isNamedImports(node: Node): node is NamedImports;
    function isImportSpecifier(node: Node): node is ImportSpecifier;
    function isExportAssignment(node: Node): node is ExportAssignment;
    function isExportDeclaration(node: Node): node is ExportDeclaration;
    function isNamedExports(node: Node): node is NamedExports;
    function isExportSpecifier(node: Node): node is ExportSpecifier;
    function isMissingDeclaration(node: Node): node is MissingDeclaration;
    function isNotEmittedStatement(node: Node): node is NotEmittedStatement;
    function isExternalModuleReference(node: Node): node is ExternalModuleReference;
    function isJsxElement(node: Node): node is JsxElement;
    function isJsxSelfClosingElement(node: Node): node is JsxSelfClosingElement;
    function isJsxOpeningElement(node: Node): node is JsxOpeningElement;
    function isJsxClosingElement(node: Node): node is JsxClosingElement;
    function isJsxFragment(node: Node): node is JsxFragment;
    function isJsxOpeningFragment(node: Node): node is JsxOpeningFragment;
    function isJsxClosingFragment(node: Node): node is JsxClosingFragment;
    function isJsxAttribute(node: Node): node is JsxAttribute;
    function isJsxAttributes(node: Node): node is JsxAttributes;
    function isJsxSpreadAttribute(node: Node): node is JsxSpreadAttribute;
    function isJsxExpression(node: Node): node is JsxExpression;
    function isCaseClause(node: Node): node is CaseClause;
    function isDefaultClause(node: Node): node is DefaultClause;
    function isHeritageClause(node: Node): node is HeritageClause;
    function isCatchClause(node: Node): node is CatchClause;
    function isPropertyAssignment(node: Node): node is PropertyAssignment;
    function isShorthandPropertyAssignment(node: Node): node is ShorthandPropertyAssignment;
    function isSpreadAssignment(node: Node): node is SpreadAssignment;
    function isEnumMember(node: Node): node is EnumMember;
    function isUnparsedPrepend(node: Node): node is UnparsedPrepend;
    function isSourceFile(node: Node): node is SourceFile;
    function isBundle(node: Node): node is Bundle;
    function isUnparsedSource(node: Node): node is UnparsedSource;
    function isJSDocTypeExpression(node: Node): node is JSDocTypeExpression;
    function isJSDocNameReference(node: Node): node is JSDocNameReference;
    function isJSDocMemberName(node: Node): node is JSDocMemberName;
    function isJSDocLink(node: Node): node is JSDocLink;
    function isJSDocLinkCode(node: Node): node is JSDocLinkCode;
    function isJSDocLinkPlain(node: Node): node is JSDocLinkPlain;
    function isJSDocAllType(node: Node): node is JSDocAllType;
    function isJSDocUnknownType(node: Node): node is JSDocUnknownType;
    function isJSDocNullableType(node: Node): node is JSDocNullableType;
    function isJSDocNonNullableType(node: Node): node is JSDocNonNullableType;
    function isJSDocOptionalType(node: Node): node is JSDocOptionalType;
    function isJSDocFunctionType(node: Node): node is JSDocFunctionType;
    function isJSDocVariadicType(node: Node): node is JSDocVariadicType;
    function isJSDocNamepathType(node: Node): node is JSDocNamepathType;
    function isJSDoc(node: Node): node is JSDoc;
    function isJSDocTypeLiteral(node: Node): node is JSDocTypeLiteral;
    function isJSDocSignature(node: Node): node is JSDocSignature;
    function isJSDocAugmentsTag(node: Node): node is JSDocAugmentsTag;
    function isJSDocAuthorTag(node: Node): node is JSDocAuthorTag;
    function isJSDocClassTag(node: Node): node is JSDocClassTag;
    function isJSDocCallbackTag(node: Node): node is JSDocCallbackTag;
    function isJSDocPublicTag(node: Node): node is JSDocPublicTag;
    function isJSDocPrivateTag(node: Node): node is JSDocPrivateTag;
    function isJSDocProtectedTag(node: Node): node is JSDocProtectedTag;
    function isJSDocReadonlyTag(node: Node): node is JSDocReadonlyTag;
    function isJSDocOverrideTag(node: Node): node is JSDocOverrideTag;
    function isJSDocDeprecatedTag(node: Node): node is JSDocDeprecatedTag;
    function isJSDocSeeTag(node: Node): node is JSDocSeeTag;
    function isJSDocEnumTag(node: Node): node is JSDocEnumTag;
    function isJSDocParameterTag(node: Node): node is JSDocParameterTag;
    function isJSDocReturnTag(node: Node): node is JSDocReturnTag;
    function isJSDocThisTag(node: Node): node is JSDocThisTag;
    function isJSDocTypeTag(node: Node): node is JSDocTypeTag;
    function isJSDocTemplateTag(node: Node): node is JSDocTemplateTag;
    function isJSDocTypedefTag(node: Node): node is JSDocTypedefTag;
    function isJSDocUnknownTag(node: Node): node is JSDocUnknownTag;
    function isJSDocPropertyTag(node: Node): node is JSDocPropertyTag;
    function isJSDocImplementsTag(node: Node): node is JSDocImplementsTag;
    function setTextRange<T extends TextRange>(range: T, location: TextRange | undefined): T;
    function canHaveModifiers(node: Node): node is HasModifiers;
    function canHaveDecorators(node: Node): node is HasDecorators;
    /**
     * Invokes a callback for each child of the given node. The 'cbNode' callback is invoked for all child nodes
     * stored in properties. If a 'cbNodes' callback is specified, it is invoked for embedded arrays; otherwise,
     * embedded arrays are flattened and the 'cbNode' callback is invoked for each element. If a callback returns
     * a truthy value, iteration stops and that value is returned. Otherwise, undefined is returned.
     *
     * @param node a given node to visit its children
     * @param cbNode a callback to be invoked for all child nodes
     * @param cbNodes a callback to be invoked for embedded array
     *
     * @remarks `forEachChild` must visit the children of a node in the order
     * that they appear in the source code. The language service depends on this property to locate nodes by position.
     */
    function forEachChild<T>(node: Node, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined;
    function createSourceFile(fileName: string, sourceText: string, languageVersionOrOptions: ScriptTarget | CreateSourceFileOptions, setParentNodes?: boolean, scriptKind?: ScriptKind, options?: CompilerOptions, isArkguardInput?: boolean): SourceFile;
    function parseIsolatedEntityName(text: string, languageVersion: ScriptTarget): EntityName | undefined;
    /**
     * Parse json text into SyntaxTree and return node and parse errors if any
     * @param fileName
     * @param sourceText
     */
    function parseJsonText(fileName: string, sourceText: string): JsonSourceFile;
    function isExternalModule(file: SourceFile): boolean;
    function updateSourceFile(sourceFile: SourceFile, newText: string, textChangeRange: TextChangeRange, aggressiveChecks?: boolean, option?: CompilerOptions): SourceFile;
    interface CreateSourceFileOptions {
        languageVersion: ScriptTarget;
        /**
         * Controls the format the file is detected as - this can be derived from only the path
         * and files on disk, but needs to be done with a module resolution cache in scope to be performant.
         * This is usually `undefined` for compilations that do not have `moduleResolution` values of `node16` or `nodenext`.
         */
        impliedNodeFormat?: ModuleKind.ESNext | ModuleKind.CommonJS;
        /**
         * Controls how module-y-ness is set for the given file. Usually the result of calling
         * `getSetExternalModuleIndicator` on a valid `CompilerOptions` object. If not present, the default
         * check specified by `isFileProbablyExternalModule` will be used to set the field.
         */
        setExternalModuleIndicator?: (file: SourceFile) => void;
    }
    function parseCommandLine(commandLine: readonly string[], readFile?: (path: string) => string | undefined): ParsedCommandLine;
    /**
     * Reads the config file, reports errors if any and exits if the config file cannot be found
     */
    function getParsedCommandLineOfConfigFile(configFileName: string, optionsToExtend: CompilerOptions | undefined, host: ParseConfigFileHost, extendedConfigCache?: Map<ExtendedConfigCacheEntry>, watchOptionsToExtend?: WatchOptions, extraFileExtensions?: readonly FileExtensionInfo[]): ParsedCommandLine | undefined;
    /**
     * Read tsconfig.json file
     * @param fileName The path to the config file
     */
    function readConfigFile(fileName: string, readFile: (path: string) => string | undefined): {
        config?: any;
        error?: Diagnostic;
    };
    /**
     * Parse the text of the tsconfig.json file
     * @param fileName The path to the config file
     * @param jsonText The text of the config file
     */
    function parseConfigFileTextToJson(fileName: string, jsonText: string): {
        config?: any;
        error?: Diagnostic;
    };
    /**
     * Read tsconfig.json file
     * @param fileName The path to the config file
     */
    function readJsonConfigFile(fileName: string, readFile: (path: string) => string | undefined): TsConfigSourceFile;
    /**
     * Convert the json syntax tree into the json value
     */
    function convertToObject(sourceFile: JsonSourceFile, errors: Push<Diagnostic>): any;
    /**
     * Parse the contents of a config file (tsconfig.json).
     * @param json The contents of the config file to parse
     * @param host Instance of ParseConfigHost used to enumerate files in folder.
     * @param basePath A root directory to resolve relative path entries in the config
     *    file to. e.g. outDir
     */
    function parseJsonConfigFileContent(json: any, host: ParseConfigHost, basePath: string, existingOptions?: CompilerOptions, configFileName?: string, resolutionStack?: Path[], extraFileExtensions?: readonly FileExtensionInfo[], extendedConfigCache?: Map<ExtendedConfigCacheEntry>, existingWatchOptions?: WatchOptions): ParsedCommandLine;
    /**
     * Parse the contents of a config file (tsconfig.json).
     * @param jsonNode The contents of the config file to parse
     * @param host Instance of ParseConfigHost used to enumerate files in folder.
     * @param basePath A root directory to resolve relative path entries in the config
     *    file to. e.g. outDir
     */
    function parseJsonSourceFileConfigFileContent(sourceFile: TsConfigSourceFile, host: ParseConfigHost, basePath: string, existingOptions?: CompilerOptions, configFileName?: string, resolutionStack?: Path[], extraFileExtensions?: readonly FileExtensionInfo[], extendedConfigCache?: Map<ExtendedConfigCacheEntry>, existingWatchOptions?: WatchOptions): ParsedCommandLine;
    function convertCompilerOptionsFromJson(jsonOptions: any, basePath: string, configFileName?: string): {
        options: CompilerOptions;
        errors: Diagnostic[];
    };
    function convertTypeAcquisitionFromJson(jsonOptions: any, basePath: string, configFileName?: string): {
        options: TypeAcquisition;
        errors: Diagnostic[];
    };
    type DiagnosticReporter = (diagnostic: Diagnostic) => void;
    /**
     * Reports config file diagnostics
     */
    interface ConfigFileDiagnosticsReporter {
        /**
         * Reports unrecoverable error when parsing config file
         */
        onUnRecoverableConfigFileDiagnostic: DiagnosticReporter;
    }
    /**
     * Interface extending ParseConfigHost to support ParseConfigFile that reads config file and reports errors
     */
    interface ParseConfigFileHost extends ParseConfigHost, ConfigFileDiagnosticsReporter {
        getCurrentDirectory(): string;
    }
    interface ParsedTsconfig {
        raw: any;
        options?: CompilerOptions;
        watchOptions?: WatchOptions;
        typeAcquisition?: TypeAcquisition;
        /**
         * Note that the case of the config path has not yet been normalized, as no files have been imported into the project yet
         */
        extendedConfigPath?: string;
    }
    interface ExtendedConfigCacheEntry {
        extendedResult: TsConfigSourceFile;
        extendedConfig: ParsedTsconfig | undefined;
    }
    function getEffectiveTypeRoots(options: CompilerOptions, host: GetEffectiveTypeRootsHost): string[] | undefined;
    /**
     * @param {string | undefined} containingFile - file that contains type reference directive, can be undefined if containing file is unknown.
     * This is possible in case if resolution is performed for directives specified via 'types' parameter. In this case initial path for secondary lookups
     * is assumed to be the same as root directory of the project.
     */
    function resolveTypeReferenceDirective(typeReferenceDirectiveName: string, containingFile: string | undefined, options: CompilerOptions, host: ModuleResolutionHost, redirectedReference?: ResolvedProjectReference, cache?: TypeReferenceDirectiveResolutionCache, resolutionMode?: SourceFile["impliedNodeFormat"]): ResolvedTypeReferenceDirectiveWithFailedLookupLocations;
    /**
     * Given a set of options, returns the set of type directive names
     *   that should be included for this program automatically.
     * This list could either come from the config file,
     *   or from enumerating the types root + initial secondary types lookup location.
     * More type directives might appear in the program later as a result of loading actual source files;
     *   this list is only the set of defaults that are implicitly included.
     */
    function getAutomaticTypeDirectiveNames(options: CompilerOptions, host: ModuleResolutionHost): string[];
    function createModuleResolutionCache(currentDirectory: string, getCanonicalFileName: (s: string) => string, options?: CompilerOptions): ModuleResolutionCache;
    function createTypeReferenceDirectiveResolutionCache(currentDirectory: string, getCanonicalFileName: (s: string) => string, options?: CompilerOptions, packageJsonInfoCache?: PackageJsonInfoCache): TypeReferenceDirectiveResolutionCache;
    function resolveModuleNameFromCache(moduleName: string, containingFile: string, cache: ModuleResolutionCache, mode?: ModuleKind.CommonJS | ModuleKind.ESNext): ResolvedModuleWithFailedLookupLocations | undefined;
    function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: ModuleResolutionCache, redirectedReference?: ResolvedProjectReference, resolutionMode?: ModuleKind.CommonJS | ModuleKind.ESNext): ResolvedModuleWithFailedLookupLocations;
    function nodeModuleNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: ModuleResolutionCache, redirectedReference?: ResolvedProjectReference): ResolvedModuleWithFailedLookupLocations;
    /**
     * This will be called on the successfully resolved path from `loadModuleFromFile`.
     * (Not needed for `loadModuleFromNodeModules` as that looks up the `package.json` or `oh-package.json5` as part of resolution.)
     *
     * packageDirectory is the directory of the package itself.
     *   For `blah/node_modules/foo/index.d.ts` this is packageDirectory: "foo"
     *   For `/node_modules/foo/bar.d.ts` this is packageDirectory: "foo"
     *   For `/node_modules/@types/foo/bar/index.d.ts` this is packageDirectory: "@types/foo"
     *   For `/node_modules/foo/bar/index.d.ts` this is packageDirectory: "foo"
     */
    function parseModuleFromPath(resolved: string, packageManagerType?: string): string | undefined;
    function classicNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: NonRelativeModuleNameResolutionCache, redirectedReference?: ResolvedProjectReference): ResolvedModuleWithFailedLookupLocations;
    interface TypeReferenceDirectiveResolutionCache extends PerDirectoryResolutionCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>, PackageJsonInfoCache {
    }
    interface ModeAwareCache<T> {
        get(key: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined): T | undefined;
        set(key: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined, value: T): this;
        delete(key: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined): this;
        has(key: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined): boolean;
        forEach(cb: (elem: T, key: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined) => void): void;
        size(): number;
    }
    /**
     * Cached resolutions per containing directory.
     * This assumes that any module id will have the same resolution for sibling files located in the same folder.
     */
    interface PerDirectoryResolutionCache<T> {
        getOrCreateCacheForDirectory(directoryName: string, redirectedReference?: ResolvedProjectReference): ModeAwareCache<T>;
        clear(): void;
        /**
         *  Updates with the current compilerOptions the cache will operate with.
         *  This updates the redirects map as well if needed so module resolutions are cached if they can across the projects
         */
        update(options: CompilerOptions): void;
    }
    interface ModuleResolutionCache extends PerDirectoryResolutionCache<ResolvedModuleWithFailedLookupLocations>, NonRelativeModuleNameResolutionCache, PackageJsonInfoCache {
        getPackageJsonInfoCache(): PackageJsonInfoCache;
    }
    /**
     * Stored map from non-relative module name to a table: directory -> result of module lookup in this directory
     * We support only non-relative module names because resolution of relative module names is usually more deterministic and thus less expensive.
     */
    interface NonRelativeModuleNameResolutionCache extends PackageJsonInfoCache {
        getOrCreateCacheForModuleName(nonRelativeModuleName: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined, redirectedReference?: ResolvedProjectReference): PerModuleNameCache;
    }
    interface PackageJsonInfoCache {
        clear(): void;
    }
    interface PerModuleNameCache {
        get(directory: string): ResolvedModuleWithFailedLookupLocations | undefined;
        set(directory: string, result: ResolvedModuleWithFailedLookupLocations): void;
    }
    function concatenateDecoratorsAndModifiers(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined): readonly ModifierLike[] | undefined;
    function isEtsFunctionDecorators(name: string | undefined, options: CompilerOptions): boolean;
    function isOhpm(packageManagerType: string | undefined): boolean;
    function isOHModules(modulePath: string): boolean;
    function isOhpmAndOhModules(packageManagerType: string | undefined, modulePath: string): boolean;
    function getModulePathPartByPMType(packageManagerType: string | undefined): string;
    function getModuleByPMType(packageManagerType: string | undefined): string;
    function getPackageJsonByPMType(packageManagerType: string | undefined): string;
    function isOHModulesDirectory(dirPath: Path): boolean;
    function isTargetModulesDerectory(dirPath: Path): boolean;
    function pathContainsOHModules(path: string): boolean;
    function choosePathContainsModules(packageManagerType: string | undefined, fileName: string): boolean;
    function getTypeExportImportAndConstEnumTransformer(context: TransformationContext): (node: SourceFile) => SourceFile;
    function getAnnotationTransformer(): TransformerFactory<SourceFile>;
    function transformAnnotation(context: TransformationContext): (node: SourceFile) => SourceFile;
    /**
     * Add 'type' flag to import/export when import/export an type member.
     * Replace const enum with number and string literal.
     */
    function transformTypeExportImportAndConstEnumInTypeScript(context: TransformationContext): (node: SourceFile) => SourceFile;
    function hasTsNoCheckOrTsIgnoreFlag(node: SourceFile): boolean;
    function createObfTextSingleLineWriter(): EmitTextWriter;
    function cleanKitJsonCache(): void;
    function getMaxFlowDepth(compilerOptions: CompilerOptions): number;
    function getErrorCode(diagnostic: Diagnostic): ErrorInfo;
    function getErrorCodeArea(code: number): ErrorCodeArea;
    const ohModulesPathPart: string;
    const REQUIRE_DECORATOR = "Require";
    const THROWS_TAG = "throws";
    const THROWS_CATCH = "catch";
    const THROWS_ASYNC_CALLBACK = "AsyncCallback";
    const THROWS_ERROR_CALLBACK = "ErrorCallback";
    interface MoreInfo {
        cn: string;
        en: string;
    }
    class ErrorInfo {
        code: string;
        description: string;
        cause: string;
        position: string;
        solutions: string[];
        moreInfo?: MoreInfo;
        getCode(): string;
        getDescription(): string;
        getCause(): string;
        getPosition(): string;
        getSolutions(): string[];
        getMoreInfo(): MoreInfo | undefined;
    }
    enum ErrorCodeArea {
        TSC = 0,
        LINTER = 1,
        UI = 2
    }
    enum CheckMode {
        Normal = 0,
        Contextual = 1,
        Inferential = 2,
        SkipContextSensitive = 4,
        SkipGenericFunctions = 8,
        IsForSignatureHelp = 16,
        IsForStringLiteralArgumentCompletions = 32,
        RestBindingElement = 64,
        SkipEtsComponentBody = 128
    }
    /**
     * Visits a Node using the supplied visitor, possibly returning a new Node in its place.
     *
     * @param node The Node to visit.
     * @param visitor The callback used to visit the Node.
     * @param test A callback to execute to verify the Node is valid.
     * @param lift An optional callback to execute to lift a NodeArray into a valid Node.
     */
    function visitNode<T extends Node>(node: T, visitor: Visitor | undefined, test?: (node: Node) => boolean, lift?: (node: readonly Node[]) => T): T;
    /**
     * Visits a Node using the supplied visitor, possibly returning a new Node in its place.
     *
     * @param node The Node to visit.
     * @param visitor The callback used to visit the Node.
     * @param test A callback to execute to verify the Node is valid.
     * @param lift An optional callback to execute to lift a NodeArray into a valid Node.
     */
    function visitNode<T extends Node>(node: T | undefined, visitor: Visitor | undefined, test?: (node: Node) => boolean, lift?: (node: readonly Node[]) => T): T | undefined;
    /**
     * Visits a NodeArray using the supplied visitor, possibly returning a new NodeArray in its place.
     *
     * @param nodes The NodeArray to visit.
     * @param visitor The callback used to visit a Node.
     * @param test A node test to execute for each node.
     * @param start An optional value indicating the starting offset at which to start visiting.
     * @param count An optional value indicating the maximum number of nodes to visit.
     */
    function visitNodes<T extends Node>(nodes: NodeArray<T>, visitor: Visitor | undefined, test?: (node: Node) => boolean, start?: number, count?: number): NodeArray<T>;
    /**
     * Visits a NodeArray using the supplied visitor, possibly returning a new NodeArray in its place.
     *
     * @param nodes The NodeArray to visit.
     * @param visitor The callback used to visit a Node.
     * @param test A node test to execute for each node.
     * @param start An optional value indicating the starting offset at which to start visiting.
     * @param count An optional value indicating the maximum number of nodes to visit.
     */
    function visitNodes<T extends Node>(nodes: NodeArray<T> | undefined, visitor: Visitor | undefined, test?: (node: Node) => boolean, start?: number, count?: number): NodeArray<T> | undefined;
    /**
     * Starts a new lexical environment and visits a statement list, ending the lexical environment
     * and merging hoisted declarations upon completion.
     */
    function visitLexicalEnvironment(statements: NodeArray<Statement>, visitor: Visitor, context: TransformationContext, start?: number, ensureUseStrict?: boolean, nodesVisitor?: NodesVisitor): NodeArray<Statement>;
    /**
     * Starts a new lexical environment and visits a parameter list, suspending the lexical
     * environment upon completion.
     */
    function visitParameterList(nodes: NodeArray<ParameterDeclaration>, visitor: Visitor, context: TransformationContext, nodesVisitor?: NodesVisitor): NodeArray<ParameterDeclaration>;
    function visitParameterList(nodes: NodeArray<ParameterDeclaration> | undefined, visitor: Visitor, context: TransformationContext, nodesVisitor?: NodesVisitor): NodeArray<ParameterDeclaration> | undefined;
    /**
     * Resumes a suspended lexical environment and visits a function body, ending the lexical
     * environment and merging hoisted declarations upon completion.
     */
    function visitFunctionBody(node: FunctionBody, visitor: Visitor, context: TransformationContext): FunctionBody;
    /**
     * Resumes a suspended lexical environment and visits a function body, ending the lexical
     * environment and merging hoisted declarations upon completion.
     */
    function visitFunctionBody(node: FunctionBody | undefined, visitor: Visitor, context: TransformationContext): FunctionBody | undefined;
    /**
     * Resumes a suspended lexical environment and visits a concise body, ending the lexical
     * environment and merging hoisted declarations upon completion.
     */
    function visitFunctionBody(node: ConciseBody, visitor: Visitor, context: TransformationContext): ConciseBody;
    /**
     * Visits an iteration body, adding any block-scoped variables required by the transformation.
     */
    function visitIterationBody(body: Statement, visitor: Visitor, context: TransformationContext): Statement;
    /**
     * Visits each child of a Node using the supplied visitor, possibly returning a new Node of the same kind in its place.
     *
     * @param node The Node whose children will be visited.
     * @param visitor The callback used to visit each child.
     * @param context A lexical environment context for the visitor.
     */
    function visitEachChild<T extends Node>(node: T, visitor: Visitor, context: TransformationContext): T;
    /**
     * Visits each child of a Node using the supplied visitor, possibly returning a new Node of the same kind in its place.
     *
     * @param node The Node whose children will be visited.
     * @param visitor The callback used to visit each child.
     * @param context A lexical environment context for the visitor.
     */
    function visitEachChild<T extends Node>(node: T | undefined, visitor: Visitor, context: TransformationContext, nodesVisitor?: typeof visitNodes, tokenVisitor?: Visitor): T | undefined;
    function createSourceMapGenerator(host: EmitHost, file: string, sourceRoot: string, sourcesDirectoryPath: string, generatorOptions: SourceMapGeneratorOptions): SourceMapGenerator;
    interface SourceMapGeneratorOptions {
        extendedDiagnostics?: boolean;
    }
    function isInternalDeclaration(node: Node, currentSourceFile: SourceFile): boolean | 0 | undefined;
    const nullTransformationContext: TransformationContext;
    function getTsBuildInfoEmitOutputFilePath(options: CompilerOptions): string | undefined;
    function getTsBuildInfoEmitOutputFilePathForLinter(tsBuildInfoPath: string): string;
    function getOutputFileNames(commandLine: ParsedCommandLine, inputFileName: string, ignoreCase: boolean): readonly string[];
    function createPrinter(printerOptions?: PrinterOptions, handlers?: PrintHandlers): Printer;
    function findConfigFile(searchPath: string, fileExists: (fileName: string) => boolean, configName?: string): string | undefined;
    function resolveTripleslashReference(moduleName: string, containingFile: string): string;
    function createCompilerHost(options: CompilerOptions, setParentNodes?: boolean): CompilerHost;
    function getPreEmitDiagnostics(program: Program, sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
    function formatDiagnostics(diagnostics: readonly Diagnostic[], host: FormatDiagnosticsHost): string;
    function formatDiagnostic(diagnostic: Diagnostic, host: FormatDiagnosticsHost): string;
    function formatDiagnosticsWithColorAndContext(diagnostics: readonly Diagnostic[], host: FormatDiagnosticsHost): string;
    function flattenDiagnosticMessageText(diag: string | DiagnosticMessageChain | undefined, newLine: string, indent?: number): string;
    /**
     * Calculates the resulting resolution mode for some reference in some file - this is generally the explicitly
     * provided resolution mode in the reference, unless one is not present, in which case it is the mode of the containing file.
     */
    function getModeForFileReference(ref: FileReference | string, containingFileMode: SourceFile["impliedNodeFormat"]): ts.ModuleKind.CommonJS | ts.ModuleKind.ESNext | undefined;
    /**
     * Calculates the final resolution mode for an import at some index within a file's imports list. This is generally the explicitly
     * defined mode of the import if provided, or, if not, the mode of the containing file (with some exceptions: import=require is always commonjs, dynamic import is always esm).
     * If you have an actual import node, prefer using getModeForUsageLocation on the reference string node.
     * @param file File to fetch the resolution mode within
     * @param index Index into the file's complete resolution list to get the resolution of - this is a concatenation of the file's imports and module augmentations
     */
    function getModeForResolutionAtIndex(file: SourceFile, index: number): ModuleKind.CommonJS | ModuleKind.ESNext | undefined;
    /**
     * Calculates the final resolution mode for a given module reference node. This is generally the explicitly provided resolution mode, if
     * one exists, or the mode of the containing source file. (Excepting import=require, which is always commonjs, and dynamic import, which is always esm).
     * Notably, this function always returns `undefined` if the containing file has an `undefined` `impliedNodeFormat` - this field is only set when
     * `moduleResolution` is `node16`+.
     * @param file The file the import or import-like reference is contained within
     * @param usage The module reference string
     * @returns The final resolution mode of the import
     */
    function getModeForUsageLocation(file: {
        impliedNodeFormat?: SourceFile["impliedNodeFormat"];
    }, usage: StringLiteralLike): ts.ModuleKind.CommonJS | ts.ModuleKind.ESNext | undefined;
    function getConfigFileParsingDiagnostics(configFileParseResult: ParsedCommandLine): readonly Diagnostic[];
    /**
     * A function for determining if a given file is esm or cjs format, assuming modern node module resolution rules, as configured by the
     * `options` parameter.
     *
     * @param fileName The normalized absolute path to check the format of (it need not exist on disk)
     * @param [packageJsonInfoCache] A cache for package file lookups - it's best to have a cache when this function is called often
     * @param host The ModuleResolutionHost which can perform the filesystem lookups for package json data
     * @param options The compiler options to perform the analysis under - relevant options are `moduleResolution` and `traceResolution`
     * @returns `undefined` if the path has no relevant implied format, `ModuleKind.ESNext` for esm format, and `ModuleKind.CommonJS` for cjs format
     */
    function getImpliedNodeFormatForFile(fileName: Path, packageJsonInfoCache: PackageJsonInfoCache | undefined, host: ModuleResolutionHost, options: CompilerOptions): ModuleKind.ESNext | ModuleKind.CommonJS | undefined;
    /**
     * Create a new 'Program' instance. A Program is an immutable collection of 'SourceFile's and a 'CompilerOptions'
     * that represent a compilation unit.
     *
     * Creating a program proceeds from a set of root files, expanding the set of inputs by following imports and
     * triple-slash-reference-path directives transitively. '@types' and triple-slash-reference-types are also pulled in.
     *
     * @param createProgramOptions - The options for creating a program.
     * @returns A 'Program' object.
     */
    function createProgram(createProgramOptions: CreateProgramOptions): Program;
    /**
     * Create a new 'Program' instance. A Program is an immutable collection of 'SourceFile's and a 'CompilerOptions'
     * that represent a compilation unit.
     *
     * Creating a program proceeds from a set of root files, expanding the set of inputs by following imports and
     * triple-slash-reference-path directives transitively. '@types' and triple-slash-reference-types are also pulled in.
     *
     * @param rootNames - A set of root files.
     * @param options - The compiler options which should be used.
     * @param host - The host interacts with the underlying file system.
     * @param oldProgram - Reuses an old program structure.
     * @param configFileParsingDiagnostics - error during config file parsing
     * @returns A 'Program' object.
     */
    function createProgram(rootNames: readonly string[], options: CompilerOptions, host?: CompilerHost, oldProgram?: Program, configFileParsingDiagnostics?: readonly Diagnostic[]): Program;
    /**
     * Returns the target config filename of a project reference.
     * Note: The file might not exist.
     */
    function resolveProjectReferencePath(ref: ProjectReference): ResolvedConfigFileName;
    /** @deprecated */ function resolveProjectReferencePath(host: ResolveProjectReferencePathHost, ref: ProjectReference): ResolvedConfigFileName;
    interface FormatDiagnosticsHost {
        getCurrentDirectory(): string;
        getCanonicalFileName(fileName: string): string;
        getNewLine(): string;
    }
    /** @deprecated */ interface ResolveProjectReferencePathHost {
        fileExists(fileName: string): boolean;
    }
    interface EmitOutput {
        outputFiles: OutputFile[];
        emitSkipped: boolean;
    }
    interface OutputFile {
        name: string;
        writeByteOrderMark: boolean;
        text: string;
    }
    /**
     * Create the builder to manage semantic diagnostics and cache them
     */
    function createSemanticDiagnosticsBuilderProgram(newProgram: Program, host: BuilderProgramHost, oldProgram?: SemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[]): SemanticDiagnosticsBuilderProgram;
    function createSemanticDiagnosticsBuilderProgram(rootNames: readonly string[] | undefined, options: CompilerOptions | undefined, host?: CompilerHost, oldProgram?: SemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[], projectReferences?: readonly ProjectReference[]): SemanticDiagnosticsBuilderProgram;
    /**
     * Create the builder that can handle the changes in program and iterate through changed files
     * to emit the those files and manage semantic diagnostics cache as well
     */
    function createEmitAndSemanticDiagnosticsBuilderProgram(newProgram: Program, host: BuilderProgramHost, oldProgram?: EmitAndSemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[]): EmitAndSemanticDiagnosticsBuilderProgram;
    function createEmitAndSemanticDiagnosticsBuilderProgram(rootNames: readonly string[] | undefined, options: CompilerOptions | undefined, host?: CompilerHost, oldProgram?: EmitAndSemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[], projectReferences?: readonly ProjectReference[]): EmitAndSemanticDiagnosticsBuilderProgram;
    function createEmitAndSemanticDiagnosticsBuilderProgramForArkTs(newProgramOrRootNames: Program | readonly string[] | undefined, hostOrOptions: BuilderProgramHost | CompilerOptions | undefined, oldProgramOrHost?: CompilerHost | EmitAndSemanticDiagnosticsBuilderProgram, configFileParsingDiagnosticsOrOldProgram?: readonly Diagnostic[] | EmitAndSemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[], projectReferences?: readonly ProjectReference[]): EmitAndSemanticDiagnosticsBuilderProgram;
    /**
     * Creates a builder thats just abstraction over program and can be used with watch
     */
    function createAbstractBuilder(newProgram: Program, host: BuilderProgramHost, oldProgram?: BuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[]): BuilderProgram;
    function createAbstractBuilder(rootNames: readonly string[] | undefined, options: CompilerOptions | undefined, host?: CompilerHost, oldProgram?: BuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[], projectReferences?: readonly ProjectReference[]): BuilderProgram;
    type AffectedFileResult<T> = {
        result: T;
        affected: SourceFile | Program;
    } | undefined;
    interface BuilderProgramHost {
        /**
         * return true if file names are treated with case sensitivity
         */
        useCaseSensitiveFileNames(): boolean;
        /**
         * If provided this would be used this hash instead of actual file shape text for detecting changes
         */
        createHash?: (data: string) => string;
        /**
         * When emit or emitNextAffectedFile are called without writeFile,
         * this callback if present would be used to write files
         */
        writeFile?: WriteFileCallback;
    }
    /**
     * Builder to manage the program state changes
     */
    interface BuilderProgram {
        /**
         * Returns current program
         */
        getProgram(): Program;
        /**
         * Get compiler options of the program
         */
        getCompilerOptions(): CompilerOptions;
        /**
         * Get the source file in the program with file name
         */
        getSourceFile(fileName: string): SourceFile | undefined;
        /**
         * Get a list of files in the program
         */
        getSourceFiles(): readonly SourceFile[];
        /**
         * Get the diagnostics for compiler options
         */
        getOptionsDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
        /**
         * Get the diagnostics that dont belong to any file
         */
        getGlobalDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
        /**
         * Get the diagnostics from config file parsing
         */
        getConfigFileParsingDiagnostics(): readonly Diagnostic[];
        /**
         * Get the syntax diagnostics, for all source files if source file is not supplied
         */
        getSyntacticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
        /**
         * Get the declaration diagnostics, for all source files if source file is not supplied
         */
        getDeclarationDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[];
        /**
         * Get all the dependencies of the file
         */
        getAllDependencies(sourceFile: SourceFile): readonly string[];
        /**
         * Gets the semantic diagnostics from the program corresponding to this state of file (if provided) or whole program
         * The semantic diagnostics are cached and managed here
         * Note that it is assumed that when asked about semantic diagnostics through this API,
         * the file has been taken out of affected files so it is safe to use cache or get from program and cache the diagnostics
         * In case of SemanticDiagnosticsBuilderProgram if the source file is not provided,
         * it will iterate through all the affected files, to ensure that cache stays valid and yet provide a way to get all semantic diagnostics
         */
        getSemanticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
        /**
         * Emits the JavaScript and declaration files.
         * When targetSource file is specified, emits the files corresponding to that source file,
         * otherwise for the whole program.
         * In case of EmitAndSemanticDiagnosticsBuilderProgram, when targetSourceFile is specified,
         * it is assumed that that file is handled from affected file list. If targetSourceFile is not specified,
         * it will only emit all the affected files instead of whole program
         *
         * The first of writeFile if provided, writeFile of BuilderProgramHost if provided, writeFile of compiler host
         * in that order would be used to write the files
         */
        emit(targetSourceFile?: SourceFile, writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: CustomTransformers): EmitResult;
        /**
         * Get the current directory of the program
         */
        getCurrentDirectory(): string;
        isFileUpdateInConstEnumCache?(sourceFile: SourceFile): boolean;
        builderProgramForLinter?: EmitAndSemanticDiagnosticsBuilderProgram;
    }
    /**
     * The builder that caches the semantic diagnostics for the program and handles the changed files and affected files
     */
    interface SemanticDiagnosticsBuilderProgram extends BuilderProgram {
        /**
         * Gets the semantic diagnostics from the program for the next affected file and caches it
         * Returns undefined if the iteration is complete
         */
        getSemanticDiagnosticsOfNextAffectedFile(cancellationToken?: CancellationToken, ignoreSourceFile?: (sourceFile: SourceFile) => boolean): AffectedFileResult<readonly Diagnostic[]>;
    }
    /**
     * The builder that can handle the changes in program and iterate through changed file to emit the files
     * The semantic diagnostics are cached per file and managed by clearing for the changed/affected files
     */
    interface EmitAndSemanticDiagnosticsBuilderProgram extends SemanticDiagnosticsBuilderProgram {
        /**
         * Emits the next affected file's emit result (EmitResult and sourceFiles emitted) or returns undefined if iteration is complete
         * The first of writeFile if provided, writeFile of BuilderProgramHost if provided, writeFile of compiler host
         * in that order would be used to write the files
         */
        emitNextAffectedFile(writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: CustomTransformers): AffectedFileResult<EmitResult>;
    }
    function readBuilderProgram(compilerOptions: CompilerOptions, host: ReadBuildProgramHost, isForLinter?: boolean): ts.EmitAndSemanticDiagnosticsBuilderProgram | undefined;
    function createIncrementalCompilerHost(options: CompilerOptions, system?: ts.System): CompilerHost;
    function createIncrementalProgram<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>({ rootNames, options, configFileParsingDiagnostics, projectReferences, host, createProgram }: IncrementalProgramOptions<T>): T;
    function createIncrementalProgramForArkTs({ rootNames, options, configFileParsingDiagnostics, projectReferences, host }: IncrementalProgramOptions<EmitAndSemanticDiagnosticsBuilderProgram>): EmitAndSemanticDiagnosticsBuilderProgram;
    /**
     * Create the watch compiler host for either configFile or fileNames and its options
     */
    function createWatchCompilerHost<T extends BuilderProgram>(configFileName: string, optionsToExtend: CompilerOptions | undefined, system: System, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportWatchStatus?: WatchStatusReporter, watchOptionsToExtend?: WatchOptions, extraFileExtensions?: readonly FileExtensionInfo[]): WatchCompilerHostOfConfigFile<T>;
    function createWatchCompilerHost<T extends BuilderProgram>(rootFiles: string[], options: CompilerOptions, system: System, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportWatchStatus?: WatchStatusReporter, projectReferences?: readonly ProjectReference[], watchOptions?: WatchOptions): WatchCompilerHostOfFilesAndCompilerOptions<T>;
    /**
     * Creates the watch from the host for root files and compiler options
     */
    function createWatchProgram<T extends BuilderProgram>(host: WatchCompilerHostOfFilesAndCompilerOptions<T>): WatchOfFilesAndCompilerOptions<T>;
    /**
     * Creates the watch from the host for config file
     */
    function createWatchProgram<T extends BuilderProgram>(host: WatchCompilerHostOfConfigFile<T>): WatchOfConfigFile<T>;
    interface ReadBuildProgramHost {
        useCaseSensitiveFileNames(): boolean;
        getCurrentDirectory(): string;
        readFile(fileName: string): string | undefined;
        getLastCompiledProgram?(): Program;
    }
    interface IncrementalProgramOptions<T extends BuilderProgram> {
        rootNames: readonly string[];
        options: CompilerOptions;
        configFileParsingDiagnostics?: readonly Diagnostic[];
        projectReferences?: readonly ProjectReference[];
        host?: CompilerHost;
        createProgram?: CreateProgram<T>;
    }
    type WatchStatusReporter = (diagnostic: Diagnostic, newLine: string, options: CompilerOptions, errorCount?: number) => void;
    /** Create the program with rootNames and options, if they are undefined, oldProgram and new configFile diagnostics create new program */
    type CreateProgram<T extends BuilderProgram> = (rootNames: readonly string[] | undefined, options: CompilerOptions | undefined, host?: CompilerHost, oldProgram?: T, configFileParsingDiagnostics?: readonly Diagnostic[], projectReferences?: readonly ProjectReference[] | undefined) => T;
    /** Host that has watch functionality used in --watch mode */
    interface WatchHost {
        /** If provided, called with Diagnostic message that informs about change in watch status */
        onWatchStatusChange?(diagnostic: Diagnostic, newLine: string, options: CompilerOptions, errorCount?: number): void;
        /** Used to watch changes in source files, missing files needed to update the program or config file */
        watchFile(path: string, callback: FileWatcherCallback, pollingInterval?: number, options?: WatchOptions): FileWatcher;
        /** Used to watch resolved module's failed lookup locations, config file specs, type roots where auto type reference directives are added */
        watchDirectory(path: string, callback: DirectoryWatcherCallback, recursive?: boolean, options?: WatchOptions): FileWatcher;
        /** If provided, will be used to set delayed compilation, so that multiple changes in short span are compiled together */
        setTimeout?(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
        /** If provided, will be used to reset existing delayed compilation */
        clearTimeout?(timeoutId: any): void;
    }
    interface ProgramHost<T extends BuilderProgram> {
        /**
         * Used to create the program when need for program creation or recreation detected
         */
        createProgram: CreateProgram<T>;
        useCaseSensitiveFileNames(): boolean;
        getNewLine(): string;
        getCurrentDirectory(): string;
        getDefaultLibFileName(options: CompilerOptions): string;
        getDefaultLibLocation?(): string;
        createHash?(data: string): string;
        /**
         * Use to check file presence for source files and
         * if resolveModuleNames is not provided (complier is in charge of module resolution) then module files as well
         */
        fileExists(path: string): boolean;
        /**
         * Use to read file text for source files and
         * if resolveModuleNames is not provided (complier is in charge of module resolution) then module files as well
         */
        readFile(path: string, encoding?: string): string | undefined;
        /** If provided, used for module resolution as well as to handle directory structure */
        directoryExists?(path: string): boolean;
        /** If provided, used in resolutions as well as handling directory structure */
        getDirectories?(path: string): string[];
        /** If provided, used to cache and handle directory structure modifications */
        readDirectory?(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
        /** Symbol links resolution */
        realpath?(path: string): string;
        /** If provided would be used to write log about compilation */
        trace?(s: string): void;
        /** If provided is used to get the environment variable */
        getEnvironmentVariable?(name: string): string | undefined;
        /** If provided, used to resolve the module names, otherwise typescript's default module resolution */
        resolveModuleNames?(moduleNames: string[], containingFile: string, reusedNames: string[] | undefined, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingSourceFile?: SourceFile): (ResolvedModule | undefined)[];
        /** If provided, used to resolve type reference directives, otherwise typescript's default resolution */
        resolveTypeReferenceDirectives?(typeReferenceDirectiveNames: string[] | readonly FileReference[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingFileMode?: SourceFile["impliedNodeFormat"] | undefined): (ResolvedTypeReferenceDirective | undefined)[];
        /** If provided along with custom resolveModuleNames or resolveTypeReferenceDirectives, used to determine if unchanged file path needs to re-resolve modules/type reference directives */
        hasInvalidatedResolutions?(filePath: Path): boolean;
        /**
         * Returns the module resolution cache used by a provided `resolveModuleNames` implementation so that any non-name module resolution operations (eg, package.json lookup) can reuse it
         */
        getModuleResolutionCache?(): ModuleResolutionCache | undefined;
    }
    interface WatchCompilerHost<T extends BuilderProgram> extends ProgramHost<T>, WatchHost {
        /** Instead of using output d.ts file from project reference, use its source file */
        useSourceOfProjectReferenceRedirect?(): boolean;
        /** If provided, use this method to get parsed command lines for referenced projects */
        getParsedCommandLine?(fileName: string): ParsedCommandLine | undefined;
        /** If provided, callback to invoke after every new program creation */
        afterProgramCreate?(program: T): void;
    }
    /**
     * Host to create watch with root files and options
     */
    interface WatchCompilerHostOfFilesAndCompilerOptions<T extends BuilderProgram> extends WatchCompilerHost<T> {
        /** root files to use to generate program */
        rootFiles: string[];
        /** Compiler options */
        options: CompilerOptions;
        watchOptions?: WatchOptions;
        /** Project References */
        projectReferences?: readonly ProjectReference[];
    }
    /**
     * Host to create watch with config file
     */
    interface WatchCompilerHostOfConfigFile<T extends BuilderProgram> extends WatchCompilerHost<T>, ConfigFileDiagnosticsReporter {
        /** Name of the config file to compile */
        configFileName: string;
        /** Options to extend */
        optionsToExtend?: CompilerOptions;
        watchOptionsToExtend?: WatchOptions;
        extraFileExtensions?: readonly FileExtensionInfo[];
        /**
         * Used to generate source file names from the config file and its include, exclude, files rules
         * and also to cache the directory stucture
         */
        readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
    }
    interface Watch<T> {
        /** Synchronize with host and get updated program */
        getProgram(): T;
        /** Closes the watch */
        close(): void;
    }
    /**
     * Creates the watch what generates program using the config file
     */
    interface WatchOfConfigFile<T> extends Watch<T> {
    }
    /**
     * Creates the watch that generates program using the root files and compiler options
     */
    interface WatchOfFilesAndCompilerOptions<T> extends Watch<T> {
        /** Updates the root files in the program, only if this is not config file compilation */
        updateRootFileNames(fileNames: string[]): void;
    }
    /**
     * Create a function that reports watch status by writing to the system and handles the formating of the diagnostic
     */
    function createBuilderStatusReporter(system: System, pretty?: boolean): DiagnosticReporter;
    function createSolutionBuilderHost<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>(system?: ts.System, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportSolutionBuilderStatus?: DiagnosticReporter, reportErrorSummary?: ReportEmitErrorSummary): ts.SolutionBuilderHost<T>;
    function createSolutionBuilderWithWatchHost<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>(system?: ts.System, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportSolutionBuilderStatus?: DiagnosticReporter, reportWatchStatus?: WatchStatusReporter): ts.SolutionBuilderWithWatchHost<T>;
    function createSolutionBuilder<T extends BuilderProgram>(host: SolutionBuilderHost<T>, rootNames: readonly string[], defaultOptions: BuildOptions): SolutionBuilder<T>;
    function createSolutionBuilderWithWatch<T extends BuilderProgram>(host: SolutionBuilderWithWatchHost<T>, rootNames: readonly string[], defaultOptions: BuildOptions, baseWatchOptions?: WatchOptions): SolutionBuilder<T>;
    interface BuildOptions {
        dry?: boolean;
        force?: boolean;
        verbose?: boolean;
        incremental?: boolean;
        assumeChangesOnlyAffectDirectDependencies?: boolean;
        traceResolution?: boolean;
        [option: string]: CompilerOptionsValue | undefined;
    }
    type ReportEmitErrorSummary = (errorCount: number, filesInError: (ReportFileInError | undefined)[]) => void;
    interface ReportFileInError {
        fileName: string;
        line: number;
    }
    interface SolutionBuilderHostBase<T extends BuilderProgram> extends ProgramHost<T> {
        createDirectory?(path: string): void;
        /**
         * Should provide create directory and writeFile if done of invalidatedProjects is not invoked with
         * writeFileCallback
         */
        writeFile?(path: string, data: string, writeByteOrderMark?: boolean): void;
        getCustomTransformers?: (project: string) => CustomTransformers | undefined;
        getModifiedTime(fileName: string): Date | undefined;
        setModifiedTime(fileName: string, date: Date): void;
        deleteFile(fileName: string): void;
        getParsedCommandLine?(fileName: string): ParsedCommandLine | undefined;
        reportDiagnostic: DiagnosticReporter;
        reportSolutionBuilderStatus: DiagnosticReporter;
        afterProgramEmitAndDiagnostics?(program: T): void;
    }
    interface SolutionBuilderHost<T extends BuilderProgram> extends SolutionBuilderHostBase<T> {
        reportErrorSummary?: ReportEmitErrorSummary;
    }
    interface SolutionBuilderWithWatchHost<T extends BuilderProgram> extends SolutionBuilderHostBase<T>, WatchHost {
    }
    interface SolutionBuilder<T extends BuilderProgram> {
        build(project?: string, cancellationToken?: CancellationToken, writeFile?: WriteFileCallback, getCustomTransformers?: (project: string) => CustomTransformers): ExitStatus;
        clean(project?: string): ExitStatus;
        buildReferences(project: string, cancellationToken?: CancellationToken, writeFile?: WriteFileCallback, getCustomTransformers?: (project: string) => CustomTransformers): ExitStatus;
        cleanReferences(project?: string): ExitStatus;
        getNextInvalidatedProject(cancellationToken?: CancellationToken): InvalidatedProject<T> | undefined;
    }
    enum InvalidatedProjectKind {
        Build = 0,
        UpdateBundle = 1,
        UpdateOutputFileStamps = 2
    }
    interface InvalidatedProjectBase {
        readonly kind: InvalidatedProjectKind;
        readonly project: ResolvedConfigFileName;
        /**
         *  To dispose this project and ensure that all the necessary actions are taken and state is updated accordingly
         */
        done(cancellationToken?: CancellationToken, writeFile?: WriteFileCallback, customTransformers?: CustomTransformers): ExitStatus;
        getCompilerOptions(): CompilerOptions;
        getCurrentDirectory(): string;
    }
    interface UpdateOutputFileStampsProject extends InvalidatedProjectBase {
        readonly kind: InvalidatedProjectKind.UpdateOutputFileStamps;
        updateOutputFileStatmps(): void;
    }
    interface BuildInvalidedProject<T extends BuilderProgram> extends InvalidatedProjectBase {
        readonly kind: InvalidatedProjectKind.Build;
        getBuilderProgram(): T | undefined;
        getProgram(): Program | undefined;
        getSourceFile(fileName: string): SourceFile | undefined;
        getSourceFiles(): readonly SourceFile[];
        getOptionsDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
        getGlobalDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
        getConfigFileParsingDiagnostics(): readonly Diagnostic[];
        getSyntacticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
        getAllDependencies(sourceFile: SourceFile): readonly string[];
        getSemanticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
        getSemanticDiagnosticsOfNextAffectedFile(cancellationToken?: CancellationToken, ignoreSourceFile?: (sourceFile: SourceFile) => boolean): AffectedFileResult<readonly Diagnostic[]>;
        emit(targetSourceFile?: SourceFile, writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: CustomTransformers): EmitResult | undefined;
    }
    interface UpdateBundleProject<T extends BuilderProgram> extends InvalidatedProjectBase {
        readonly kind: InvalidatedProjectKind.UpdateBundle;
        emit(writeFile?: WriteFileCallback, customTransformers?: CustomTransformers): EmitResult | BuildInvalidedProject<T> | undefined;
    }
    type InvalidatedProject<T extends BuilderProgram> = UpdateOutputFileStampsProject | BuildInvalidedProject<T> | UpdateBundleProject<T>;
    function getDefaultFormatCodeSettings(newLineCharacter?: string): FormatCodeSettings;
    /**
     * Represents an immutable snapshot of a script at a specified time.Once acquired, the
     * snapshot is observably immutable. i.e. the same calls with the same parameters will return
     * the same values.
     */
    interface IScriptSnapshot {
        /** Gets a portion of the script snapshot specified by [start, end). */
        getText(start: number, end: number): string;
        /** Gets the length of this script snapshot. */
        getLength(): number;
        /**
         * Gets the TextChangeRange that describe how the text changed between this text and
         * an older version.  This information is used by the incremental parser to determine
         * what sections of the script need to be re-parsed.  'undefined' can be returned if the
         * change range cannot be determined.  However, in that case, incremental parsing will
         * not happen and the entire document will be re - parsed.
         */
        getChangeRange(oldSnapshot: IScriptSnapshot): TextChangeRange | undefined;
        /** Releases all resources held by this script snapshot */
        dispose?(): void;
    }
    namespace ScriptSnapshot {
        function fromString(text: string): IScriptSnapshot;
    }
    interface PreProcessedFileInfo {
        referencedFiles: FileReference[];
        typeReferenceDirectives: FileReference[];
        libReferenceDirectives: FileReference[];
        importedFiles: FileReference[];
        ambientExternalModules?: string[];
        isLibFile: boolean;
    }
    interface HostCancellationToken {
        isCancellationRequested(): boolean;
    }
    interface InstallPackageOptions {
        fileName: Path;
        packageName: string;
    }
    interface PerformanceEvent {
        kind: "UpdateGraph" | "CreatePackageJsonAutoImportProvider";
        durationMs: number;
    }
    enum LanguageServiceMode {
        Semantic = 0,
        PartialSemantic = 1,
        Syntactic = 2
    }
    interface IncompleteCompletionsCache {
        get(): CompletionInfo | undefined;
        set(response: CompletionInfo): void;
        clear(): void;
    }
    interface LanguageServiceHost extends GetEffectiveTypeRootsHost, MinimalResolutionCacheHost {
        getCompilationSettings(): CompilerOptions;
        getNewLine?(): string;
        getProjectVersion?(): string;
        getScriptFileNames(): string[];
        getScriptKind?(fileName: string): ScriptKind;
        getScriptVersion(fileName: string): string;
        getScriptSnapshot(fileName: string): IScriptSnapshot | undefined;
        getProjectReferences?(): readonly ProjectReference[] | undefined;
        getLocalizedDiagnosticMessages?(): any;
        getCancellationToken?(): HostCancellationToken;
        getCurrentDirectory(): string;
        getDefaultLibFileName(options: CompilerOptions): string;
        log?(s: string): void;
        trace?(s: string): void;
        error?(s: string): void;
        useCaseSensitiveFileNames?(): boolean;
        readDirectory?(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
        realpath?(path: string): string;
        readFile(path: string, encoding?: string): string | undefined;
        fileExists(path: string): boolean;
        getTypeRootsVersion?(): number;
        resolveModuleNames?(moduleNames: string[], containingFile: string, reusedNames: string[] | undefined, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingSourceFile?: SourceFile): (ResolvedModule | undefined)[];
        getResolvedModuleWithFailedLookupLocationsFromCache?(modulename: string, containingFile: string, resolutionMode?: ModuleKind.CommonJS | ModuleKind.ESNext): ResolvedModuleWithFailedLookupLocations | undefined;
        resolveTypeReferenceDirectives?(typeDirectiveNames: string[] | FileReference[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingFileMode?: SourceFile["impliedNodeFormat"] | undefined): (ResolvedTypeReferenceDirective | undefined)[];
        getDirectories?(directoryName: string): string[];
        /**
         * Gets a set of custom transformers to use during emit.
         */
        getCustomTransformers?(): CustomTransformers | undefined;
        isKnownTypesPackageName?(name: string): boolean;
        installPackage?(options: InstallPackageOptions): Promise<ApplyCodeActionCommandResult>;
        writeFile?(fileName: string, content: string): void;
        getParsedCommandLine?(fileName: string): ParsedCommandLine | undefined;
        getJsDocNodeCheckedConfig?(jsDocFileCheckInfo: FileCheckModuleInfo, symbolSourceFilePath: string): JsDocNodeCheckConfig;
        getJsDocNodeConditionCheckedResult?(jsDocFileCheckedInfo: FileCheckModuleInfo, jsDocs: JsDocTagInfo[]): ConditionCheckResult;
        getFileCheckedModuleInfo?(containFilePath: string): FileCheckModuleInfo;
        shouldCompletionSortCustom?: boolean;
        uiProps?: Set<string>;
        clearProps?(): void;
        clearFileCache?(): void;
        isStaticSourceFile?(fileName: string): boolean;
    }
    type WithMetadata<T> = T & {
        metadata?: unknown;
    };
    enum SemanticClassificationFormat {
        Original = "original",
        TwentyTwenty = "2020"
    }
    interface LanguageService {
        /** This is used as a part of restarting the language service. */
        cleanupSemanticCache(): void;
        /**
         * Gets errors indicating invalid syntax in a file.
         *
         * In English, "this cdeo have, erorrs" is syntactically invalid because it has typos,
         * grammatical errors, and misplaced punctuation. Likewise, examples of syntax
         * errors in TypeScript are missing parentheses in an `if` statement, mismatched
         * curly braces, and using a reserved keyword as a variable name.
         *
         * These diagnostics are inexpensive to compute and don't require knowledge of
         * other files. Note that a non-empty result increases the likelihood of false positives
         * from `getSemanticDiagnostics`.
         *
         * While these represent the majority of syntax-related diagnostics, there are some
         * that require the type system, which will be present in `getSemanticDiagnostics`.
         *
         * @param fileName A path to the file you want syntactic diagnostics for
         */
        getSyntacticDiagnostics(fileName: string): DiagnosticWithLocation[];
        /**
         * Gets warnings or errors indicating type system issues in a given file.
         * Requesting semantic diagnostics may start up the type system and
         * run deferred work, so the first call may take longer than subsequent calls.
         *
         * Unlike the other get*Diagnostics functions, these diagnostics can potentially not
         * include a reference to a source file. Specifically, the first time this is called,
         * it will return global diagnostics with no associated location.
         *
         * To contrast the differences between semantic and syntactic diagnostics, consider the
         * sentence: "The sun is green." is syntactically correct; those are real English words with
         * correct sentence structure. However, it is semantically invalid, because it is not true.
         *
         * @param fileName A path to the file you want semantic diagnostics for
         */
        getSemanticDiagnostics(fileName: string): Diagnostic[];
        /**
         * Gets suggestion diagnostics for a specific file. These diagnostics tend to
         * proactively suggest refactors, as opposed to diagnostics that indicate
         * potentially incorrect runtime behavior.
         *
         * @param fileName A path to the file you want semantic diagnostics for
         */
        getSuggestionDiagnostics(fileName: string): DiagnosticWithLocation[];
        /**
         * Gets global diagnostics related to the program configuration and compiler options.
         */
        getCompilerOptionsDiagnostics(): Diagnostic[];
        /** @deprecated Use getEncodedSyntacticClassifications instead. */
        getSyntacticClassifications(fileName: string, span: TextSpan): ClassifiedSpan[];
        getSyntacticClassifications(fileName: string, span: TextSpan, format: SemanticClassificationFormat): ClassifiedSpan[] | ClassifiedSpan2020[];
        /** @deprecated Use getEncodedSemanticClassifications instead. */
        getSemanticClassifications(fileName: string, span: TextSpan): ClassifiedSpan[];
        getSemanticClassifications(fileName: string, span: TextSpan, format: SemanticClassificationFormat): ClassifiedSpan[] | ClassifiedSpan2020[];
        /** Encoded as triples of [start, length, ClassificationType]. */
        getEncodedSyntacticClassifications(fileName: string, span: TextSpan): Classifications;
        /**
         * Gets semantic highlights information for a particular file. Has two formats, an older
         * version used by VS and a format used by VS Code.
         *
         * @param fileName The path to the file
         * @param position A text span to return results within
         * @param format Which format to use, defaults to "original"
         * @returns a number array encoded as triples of [start, length, ClassificationType, ...].
         */
        getEncodedSemanticClassifications(fileName: string, span: TextSpan, format?: SemanticClassificationFormat): Classifications;
        /**
         * Gets completion entries at a particular position in a file.
         *
         * @param fileName The path to the file
         * @param position A zero-based index of the character where you want the entries
         * @param options An object describing how the request was triggered and what kinds
         * of code actions can be returned with the completions.
         * @param formattingSettings settings needed for calling formatting functions.
         */
        getCompletionsAtPosition(fileName: string, position: number, options: GetCompletionsAtPositionOptions | undefined, formattingSettings?: FormatCodeSettings): WithMetadata<CompletionInfo> | undefined;
        /**
         * Gets the extended details for a completion entry retrieved from `getCompletionsAtPosition`.
         *
         * @param fileName The path to the file
         * @param position A zero based index of the character where you want the entries
         * @param entryName The `name` from an existing completion which came from `getCompletionsAtPosition`
         * @param formatOptions How should code samples in the completions be formatted, can be undefined for backwards compatibility
         * @param source `source` property from the completion entry
         * @param preferences User settings, can be undefined for backwards compatibility
         * @param data `data` property from the completion entry
         */
        getCompletionEntryDetails(fileName: string, position: number, entryName: string, formatOptions: FormatCodeOptions | FormatCodeSettings | undefined, source: string | undefined, preferences: UserPreferences | undefined, data: CompletionEntryData | undefined): CompletionEntryDetails | undefined;
        getCompletionEntrySymbol(fileName: string, position: number, name: string, source: string | undefined): Symbol | undefined;
        /**
         * Gets semantic information about the identifier at a particular position in a
         * file. Quick info is what you typically see when you hover in an editor.
         *
         * @param fileName The path to the file
         * @param position A zero-based index of the character where you want the quick info
         */
        getQuickInfoAtPosition(fileName: string, position: number): QuickInfo | undefined;
        getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): TextSpan | undefined;
        getBreakpointStatementAtPosition(fileName: string, position: number): TextSpan | undefined;
        getSignatureHelpItems(fileName: string, position: number, options: SignatureHelpItemsOptions | undefined): SignatureHelpItems | undefined;
        getRenameInfo(fileName: string, position: number, preferences: UserPreferences): RenameInfo;
        /** @deprecated Use the signature with `UserPreferences` instead. */
        getRenameInfo(fileName: string, position: number, options?: RenameInfoOptions): RenameInfo;
        findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean, providePrefixAndSuffixTextForRename?: boolean): readonly RenameLocation[] | undefined;
        getSmartSelectionRange(fileName: string, position: number): SelectionRange;
        getDefinitionAtPosition(fileName: string, position: number): readonly DefinitionInfo[] | undefined;
        getDefinitionAndBoundSpan(fileName: string, position: number): DefinitionInfoAndBoundSpan | undefined;
        getTypeDefinitionAtPosition(fileName: string, position: number): readonly DefinitionInfo[] | undefined;
        getImplementationAtPosition(fileName: string, position: number): readonly ImplementationLocation[] | undefined;
        getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[] | undefined;
        findReferences(fileName: string, position: number): ReferencedSymbol[] | undefined;
        getDocumentHighlights(fileName: string, position: number, filesToSearch: string[]): DocumentHighlights[] | undefined;
        getFileReferences(fileName: string): ReferenceEntry[];
        /** @deprecated */
        getOccurrencesAtPosition(fileName: string, position: number): readonly ReferenceEntry[] | undefined;
        getNavigateToItems(searchValue: string, maxResultCount?: number, fileName?: string, excludeDtsFiles?: boolean): NavigateToItem[];
        getNavigationBarItems(fileName: string): NavigationBarItem[];
        getNavigationTree(fileName: string): NavigationTree;
        prepareCallHierarchy(fileName: string, position: number): CallHierarchyItem | CallHierarchyItem[] | undefined;
        provideCallHierarchyIncomingCalls(fileName: string, position: number): CallHierarchyIncomingCall[];
        provideCallHierarchyOutgoingCalls(fileName: string, position: number): CallHierarchyOutgoingCall[];
        provideInlayHints(fileName: string, span: TextSpan, preferences: UserPreferences | undefined): InlayHint[];
        getOutliningSpans(fileName: string): OutliningSpan[];
        getTodoComments(fileName: string, descriptors: TodoCommentDescriptor[]): TodoComment[];
        getBraceMatchingAtPosition(fileName: string, position: number): TextSpan[];
        getIndentationAtPosition(fileName: string, position: number, options: EditorOptions | EditorSettings): number;
        getFormattingEditsForRange(fileName: string, start: number, end: number, options: FormatCodeOptions | FormatCodeSettings): TextChange[];
        getFormattingEditsForDocument(fileName: string, options: FormatCodeOptions | FormatCodeSettings): TextChange[];
        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions | FormatCodeSettings): TextChange[];
        getDocCommentTemplateAtPosition(fileName: string, position: number, options?: DocCommentTemplateOptions): TextInsertion | undefined;
        isValidBraceCompletionAtPosition(fileName: string, position: number, openingBrace: number): boolean;
        /**
         * This will return a defined result if the position is after the `>` of the opening tag, or somewhere in the text, of a JSXElement with no closing tag.
         * Editors should call this after `>` is typed.
         */
        getJsxClosingTagAtPosition(fileName: string, position: number): JsxClosingTagInfo | undefined;
        getSpanOfEnclosingComment(fileName: string, position: number, onlyMultiLine: boolean): TextSpan | undefined;
        toLineColumnOffset?(fileName: string, position: number): LineAndCharacter;
        getCodeFixesAtPosition(fileName: string, start: number, end: number, errorCodes: readonly number[], formatOptions: FormatCodeSettings, preferences: UserPreferences): readonly CodeFixAction[];
        getCombinedCodeFix(scope: CombinedCodeFixScope, fixId: {}, formatOptions: FormatCodeSettings, preferences: UserPreferences): CombinedCodeActions;
        applyCodeActionCommand(action: CodeActionCommand, formatSettings?: FormatCodeSettings): Promise<ApplyCodeActionCommandResult>;
        applyCodeActionCommand(action: CodeActionCommand[], formatSettings?: FormatCodeSettings): Promise<ApplyCodeActionCommandResult[]>;
        applyCodeActionCommand(action: CodeActionCommand | CodeActionCommand[], formatSettings?: FormatCodeSettings): Promise<ApplyCodeActionCommandResult | ApplyCodeActionCommandResult[]>;
        /** @deprecated `fileName` will be ignored */
        applyCodeActionCommand(fileName: string, action: CodeActionCommand): Promise<ApplyCodeActionCommandResult>;
        /** @deprecated `fileName` will be ignored */
        applyCodeActionCommand(fileName: string, action: CodeActionCommand[]): Promise<ApplyCodeActionCommandResult[]>;
        /** @deprecated `fileName` will be ignored */
        applyCodeActionCommand(fileName: string, action: CodeActionCommand | CodeActionCommand[]): Promise<ApplyCodeActionCommandResult | ApplyCodeActionCommandResult[]>;
        getApplicableRefactors(fileName: string, positionOrRange: number | TextRange, preferences: UserPreferences | undefined, triggerReason?: RefactorTriggerReason, kind?: string): ApplicableRefactorInfo[];
        getEditsForRefactor(fileName: string, formatOptions: FormatCodeSettings, positionOrRange: number | TextRange, refactorName: string, actionName: string, preferences: UserPreferences | undefined): RefactorEditInfo | undefined;
        organizeImports(args: OrganizeImportsArgs, formatOptions: FormatCodeSettings, preferences: UserPreferences | undefined): readonly FileTextChanges[];
        getEditsForFileRename(oldFilePath: string, newFilePath: string, formatOptions: FormatCodeSettings, preferences: UserPreferences | undefined): readonly FileTextChanges[];
        getEmitOutput(fileName: string, emitOnlyDtsFiles?: boolean, forceDtsEmit?: boolean): EmitOutput;
        getProgram(): Program | undefined;
        getBuilderProgram(): BuilderProgram | undefined;
        toggleLineComment(fileName: string, textRange: TextRange): TextChange[];
        toggleMultilineComment(fileName: string, textRange: TextRange): TextChange[];
        commentSelection(fileName: string, textRange: TextRange): TextChange[];
        uncommentSelection(fileName: string, textRange: TextRange): TextChange[];
        dispose(): void;
        updateRootFiles?(rootFiles: string[]): void;
        getProps?(propsSwitch: boolean): string[] | Set<string>;
    }
    interface JsxClosingTagInfo {
        readonly newText: string;
    }
    interface CombinedCodeFixScope {
        type: "file";
        fileName: string;
    }
    enum OrganizeImportsMode {
        All = "All",
        SortAndCombine = "SortAndCombine",
        RemoveUnused = "RemoveUnused"
    }
    interface OrganizeImportsArgs extends CombinedCodeFixScope {
        /** @deprecated Use `mode` instead */
        skipDestructiveCodeActions?: boolean;
        mode?: OrganizeImportsMode;
    }
    type CompletionsTriggerCharacter = "." | '"' | "'" | "`" | "/" | "@" | "<" | "#" | " ";
    enum CompletionTriggerKind {
        /** Completion was triggered by typing an identifier, manual invocation (e.g Ctrl+Space) or via API. */
        Invoked = 1,
        /** Completion was triggered by a trigger character. */
        TriggerCharacter = 2,
        /** Completion was re-triggered as the current completion list is incomplete. */
        TriggerForIncompleteCompletions = 3
    }
    interface GetCompletionsAtPositionOptions extends UserPreferences {
        /**
         * If the editor is asking for completions because a certain character was typed
         * (as opposed to when the user explicitly requested them) this should be set.
         */
        triggerCharacter?: CompletionsTriggerCharacter;
        triggerKind?: CompletionTriggerKind;
        /** @deprecated Use includeCompletionsForModuleExports */
        includeExternalModuleExports?: boolean;
        /** @deprecated Use includeCompletionsWithInsertText */
        includeInsertTextCompletions?: boolean;
    }
    type SignatureHelpTriggerCharacter = "," | "(" | "<";
    type SignatureHelpRetriggerCharacter = SignatureHelpTriggerCharacter | ")";
    interface SignatureHelpItemsOptions {
        triggerReason?: SignatureHelpTriggerReason;
    }
    type SignatureHelpTriggerReason = SignatureHelpInvokedReason | SignatureHelpCharacterTypedReason | SignatureHelpRetriggeredReason;
    /**
     * Signals that the user manually requested signature help.
     * The language service will unconditionally attempt to provide a result.
     */
    interface SignatureHelpInvokedReason {
        kind: "invoked";
        triggerCharacter?: undefined;
    }
    /**
     * Signals that the signature help request came from a user typing a character.
     * Depending on the character and the syntactic context, the request may or may not be served a result.
     */
    interface SignatureHelpCharacterTypedReason {
        kind: "characterTyped";
        /**
         * Character that was responsible for triggering signature help.
         */
        triggerCharacter: SignatureHelpTriggerCharacter;
    }
    /**
     * Signals that this signature help request came from typing a character or moving the cursor.
     * This should only occur if a signature help session was already active and the editor needs to see if it should adjust.
     * The language service will unconditionally attempt to provide a result.
     * `triggerCharacter` can be `undefined` for a retrigger caused by a cursor move.
     */
    interface SignatureHelpRetriggeredReason {
        kind: "retrigger";
        /**
         * Character that was responsible for triggering signature help.
         */
        triggerCharacter?: SignatureHelpRetriggerCharacter;
    }
    interface ApplyCodeActionCommandResult {
        successMessage: string;
    }
    interface Classifications {
        spans: number[];
        endOfLineState: EndOfLineState;
    }
    interface ClassifiedSpan {
        textSpan: TextSpan;
        classificationType: ClassificationTypeNames;
    }
    interface ClassifiedSpan2020 {
        textSpan: TextSpan;
        classificationType: number;
    }
    /**
     * Navigation bar interface designed for visual studio's dual-column layout.
     * This does not form a proper tree.
     * The navbar is returned as a list of top-level items, each of which has a list of child items.
     * Child items always have an empty array for their `childItems`.
     */
    interface NavigationBarItem {
        text: string;
        kind: ScriptElementKind;
        kindModifiers: string;
        spans: TextSpan[];
        childItems: NavigationBarItem[];
        indent: number;
        bolded: boolean;
        grayed: boolean;
    }
    /**
     * Node in a tree of nested declarations in a file.
     * The top node is always a script or module node.
     */
    interface NavigationTree {
        /** Name of the declaration, or a short description, e.g. "<class>". */
        text: string;
        kind: ScriptElementKind;
        /** ScriptElementKindModifier separated by commas, e.g. "public,abstract" */
        kindModifiers: string;
        /**
         * Spans of the nodes that generated this declaration.
         * There will be more than one if this is the result of merging.
         */
        spans: TextSpan[];
        nameSpan: TextSpan | undefined;
        /** Present if non-empty */
        childItems?: NavigationTree[];
    }
    interface CallHierarchyItem {
        name: string;
        kind: ScriptElementKind;
        kindModifiers?: string;
        file: string;
        span: TextSpan;
        selectionSpan: TextSpan;
        containerName?: string;
    }
    interface CallHierarchyIncomingCall {
        from: CallHierarchyItem;
        fromSpans: TextSpan[];
    }
    interface CallHierarchyOutgoingCall {
        to: CallHierarchyItem;
        fromSpans: TextSpan[];
    }
    enum InlayHintKind {
        Type = "Type",
        Parameter = "Parameter",
        Enum = "Enum"
    }
    interface InlayHint {
        text: string;
        position: number;
        kind: InlayHintKind;
        whitespaceBefore?: boolean;
        whitespaceAfter?: boolean;
    }
    interface TodoCommentDescriptor {
        text: string;
        priority: number;
    }
    interface TodoComment {
        descriptor: TodoCommentDescriptor;
        message: string;
        position: number;
    }
    interface TextChange {
        span: TextSpan;
        newText: string;
    }
    interface FileTextChanges {
        fileName: string;
        textChanges: readonly TextChange[];
        isNewFile?: boolean;
    }
    interface CodeAction {
        /** Description of the code action to display in the UI of the editor */
        description: string;
        /** Text changes to apply to each file as part of the code action */
        changes: FileTextChanges[];
        /**
         * If the user accepts the code fix, the editor should send the action back in a `applyAction` request.
         * This allows the language service to have side effects (e.g. installing dependencies) upon a code fix.
         */
        commands?: CodeActionCommand[];
    }
    interface CodeFixAction extends CodeAction {
        /** Short name to identify the fix, for use by telemetry. */
        fixName: string;
        /**
         * If present, one may call 'getCombinedCodeFix' with this fixId.
         * This may be omitted to indicate that the code fix can't be applied in a group.
         */
        fixId?: {};
        fixAllDescription?: string;
    }
    interface CombinedCodeActions {
        changes: readonly FileTextChanges[];
        commands?: readonly CodeActionCommand[];
    }
    type CodeActionCommand = InstallPackageAction;
    interface InstallPackageAction {
    }
    /**
     * A set of one or more available refactoring actions, grouped under a parent refactoring.
     */
    interface ApplicableRefactorInfo {
        /**
         * The programmatic name of the refactoring
         */
        name: string;
        /**
         * A description of this refactoring category to show to the user.
         * If the refactoring gets inlined (see below), this text will not be visible.
         */
        description: string;
        /**
         * Inlineable refactorings can have their actions hoisted out to the top level
         * of a context menu. Non-inlineanable refactorings should always be shown inside
         * their parent grouping.
         *
         * If not specified, this value is assumed to be 'true'
         */
        inlineable?: boolean;
        actions: RefactorActionInfo[];
    }
    /**
     * Represents a single refactoring action - for example, the "Extract Method..." refactor might
     * offer several actions, each corresponding to a surround class or closure to extract into.
     */
    interface RefactorActionInfo {
        /**
         * The programmatic name of the refactoring action
         */
        name: string;
        /**
         * A description of this refactoring action to show to the user.
         * If the parent refactoring is inlined away, this will be the only text shown,
         * so this description should make sense by itself if the parent is inlineable=true
         */
        description: string;
        /**
         * A message to show to the user if the refactoring cannot be applied in
         * the current context.
         */
        notApplicableReason?: string;
        /**
         * The hierarchical dotted name of the refactor action.
         */
        kind?: string;
    }
    /**
     * A set of edits to make in response to a refactor action, plus an optional
     * location where renaming should be invoked from
     */
    interface RefactorEditInfo {
        edits: FileTextChanges[];
        renameFilename?: string;
        renameLocation?: number;
        commands?: CodeActionCommand[];
    }
    type RefactorTriggerReason = "implicit" | "invoked";
    interface TextInsertion {
        newText: string;
        /** The position in newText the caret should point to after the insertion. */
        caretOffset: number;
    }
    interface DocumentSpan {
        textSpan: TextSpan;
        fileName: string;
        /**
         * If the span represents a location that was remapped (e.g. via a .d.ts.map file),
         * then the original filename and span will be specified here
         */
        originalTextSpan?: TextSpan;
        originalFileName?: string;
        /**
         * If DocumentSpan.textSpan is the span for name of the declaration,
         * then this is the span for relevant declaration
         */
        contextSpan?: TextSpan;
        originalContextSpan?: TextSpan;
    }
    interface RenameLocation extends DocumentSpan {
        readonly prefixText?: string;
        readonly suffixText?: string;
    }
    interface ReferenceEntry extends DocumentSpan {
        isWriteAccess: boolean;
        isInString?: true;
    }
    interface ImplementationLocation extends DocumentSpan {
        kind: ScriptElementKind;
        displayParts: SymbolDisplayPart[];
    }
    enum HighlightSpanKind {
        none = "none",
        definition = "definition",
        reference = "reference",
        writtenReference = "writtenReference"
    }
    interface HighlightSpan {
        fileName?: string;
        isInString?: true;
        textSpan: TextSpan;
        contextSpan?: TextSpan;
        kind: HighlightSpanKind;
    }
    interface NavigateToItem {
        name: string;
        kind: ScriptElementKind;
        kindModifiers: string;
        matchKind: "exact" | "prefix" | "substring" | "camelCase";
        isCaseSensitive: boolean;
        fileName: string;
        textSpan: TextSpan;
        containerName: string;
        containerKind: ScriptElementKind;
    }
    enum IndentStyle {
        None = 0,
        Block = 1,
        Smart = 2
    }
    enum SemicolonPreference {
        Ignore = "ignore",
        Insert = "insert",
        Remove = "remove"
    }
    /** @deprecated - consider using EditorSettings instead */
    interface EditorOptions {
        BaseIndentSize?: number;
        IndentSize: number;
        TabSize: number;
        NewLineCharacter: string;
        ConvertTabsToSpaces: boolean;
        IndentStyle: IndentStyle;
    }
    interface EditorSettings {
        baseIndentSize?: number;
        indentSize?: number;
        tabSize?: number;
        newLineCharacter?: string;
        convertTabsToSpaces?: boolean;
        indentStyle?: IndentStyle;
        trimTrailingWhitespace?: boolean;
    }
    /** @deprecated - consider using FormatCodeSettings instead */
    interface FormatCodeOptions extends EditorOptions {
        InsertSpaceAfterCommaDelimiter: boolean;
        InsertSpaceAfterSemicolonInForStatements: boolean;
        InsertSpaceBeforeAndAfterBinaryOperators: boolean;
        InsertSpaceAfterConstructor?: boolean;
        InsertSpaceAfterKeywordsInControlFlowStatements: boolean;
        InsertSpaceAfterFunctionKeywordForAnonymousFunctions: boolean;
        InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: boolean;
        InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: boolean;
        InsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces?: boolean;
        InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: boolean;
        InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces?: boolean;
        InsertSpaceAfterTypeAssertion?: boolean;
        InsertSpaceBeforeFunctionParenthesis?: boolean;
        PlaceOpenBraceOnNewLineForFunctions: boolean;
        PlaceOpenBraceOnNewLineForControlBlocks: boolean;
        insertSpaceBeforeTypeAnnotation?: boolean;
    }
    interface FormatCodeSettings extends EditorSettings {
        readonly insertSpaceAfterCommaDelimiter?: boolean;
        readonly insertSpaceAfterSemicolonInForStatements?: boolean;
        readonly insertSpaceBeforeAndAfterBinaryOperators?: boolean;
        readonly insertSpaceAfterConstructor?: boolean;
        readonly insertSpaceAfterKeywordsInControlFlowStatements?: boolean;
        readonly insertSpaceAfterFunctionKeywordForAnonymousFunctions?: boolean;
        readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis?: boolean;
        readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets?: boolean;
        readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces?: boolean;
        readonly insertSpaceAfterOpeningAndBeforeClosingEmptyBraces?: boolean;
        readonly insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces?: boolean;
        readonly insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces?: boolean;
        readonly insertSpaceAfterTypeAssertion?: boolean;
        readonly insertSpaceBeforeFunctionParenthesis?: boolean;
        readonly placeOpenBraceOnNewLineForFunctions?: boolean;
        readonly placeOpenBraceOnNewLineForControlBlocks?: boolean;
        readonly insertSpaceBeforeTypeAnnotation?: boolean;
        readonly indentMultiLineObjectLiteralBeginningOnBlankLine?: boolean;
        readonly semicolons?: SemicolonPreference;
    }
    interface DefinitionInfo extends DocumentSpan {
        kind: ScriptElementKind;
        name: string;
        containerKind: ScriptElementKind;
        containerName: string;
        unverified?: boolean;
    }
    interface DefinitionInfoAndBoundSpan {
        definitions?: readonly DefinitionInfo[];
        textSpan: TextSpan;
    }
    interface ReferencedSymbolDefinitionInfo extends DefinitionInfo {
        displayParts: SymbolDisplayPart[];
    }
    interface ReferencedSymbol {
        definition: ReferencedSymbolDefinitionInfo;
        references: ReferencedSymbolEntry[];
    }
    interface ReferencedSymbolEntry extends ReferenceEntry {
        isDefinition?: boolean;
    }
    enum SymbolDisplayPartKind {
        aliasName = 0,
        className = 1,
        enumName = 2,
        fieldName = 3,
        interfaceName = 4,
        keyword = 5,
        lineBreak = 6,
        numericLiteral = 7,
        stringLiteral = 8,
        localName = 9,
        methodName = 10,
        moduleName = 11,
        operator = 12,
        parameterName = 13,
        propertyName = 14,
        punctuation = 15,
        space = 16,
        text = 17,
        typeParameterName = 18,
        enumMemberName = 19,
        functionName = 20,
        regularExpressionLiteral = 21,
        link = 22,
        linkName = 23,
        linkText = 24
    }
    interface JSDocLinkDisplayPart extends SymbolDisplayPart {
        target: DocumentSpan;
    }
    interface JSDocTagInfo {
        name: string;
        text?: SymbolDisplayPart[] | string;
        index?: number;
    }
    interface QuickInfo {
        kind: ScriptElementKind;
        kindModifiers: string;
        textSpan: TextSpan;
        displayParts?: SymbolDisplayPart[];
        documentation?: SymbolDisplayPart[];
        tags?: JSDocTagInfo[];
    }
    type RenameInfo = RenameInfoSuccess | RenameInfoFailure;
    interface RenameInfoSuccess {
        canRename: true;
        /**
         * File or directory to rename.
         * If set, `getEditsForFileRename` should be called instead of `findRenameLocations`.
         */
        fileToRename?: string;
        displayName: string;
        fullDisplayName: string;
        kind: ScriptElementKind;
        kindModifiers: string;
        triggerSpan: TextSpan;
    }
    interface RenameInfoFailure {
        canRename: false;
        localizedErrorMessage: string;
    }
    /**
     * @deprecated Use `UserPreferences` instead.
     */
    interface RenameInfoOptions {
        readonly allowRenameOfImportPath?: boolean;
    }
    interface DocCommentTemplateOptions {
        readonly generateReturnInDocTemplate?: boolean;
    }
    interface SignatureHelpParameter {
        name: string;
        documentation: SymbolDisplayPart[];
        displayParts: SymbolDisplayPart[];
        isOptional: boolean;
        isRest?: boolean;
    }
    interface SelectionRange {
        textSpan: TextSpan;
        parent?: SelectionRange;
    }
    /**
     * Represents a single signature to show in signature help.
     * The id is used for subsequent calls into the language service to ask questions about the
     * signature help item in the context of any documents that have been updated.  i.e. after
     * an edit has happened, while signature help is still active, the host can ask important
     * questions like 'what parameter is the user currently contained within?'.
     */
    interface SignatureHelpItem {
        isVariadic: boolean;
        prefixDisplayParts: SymbolDisplayPart[];
        suffixDisplayParts: SymbolDisplayPart[];
        separatorDisplayParts: SymbolDisplayPart[];
        parameters: SignatureHelpParameter[];
        documentation: SymbolDisplayPart[];
        tags: JSDocTagInfo[];
    }
    /**
     * Represents a set of signature help items, and the preferred item that should be selected.
     */
    interface SignatureHelpItems {
        items: SignatureHelpItem[];
        applicableSpan: TextSpan;
        selectedItemIndex: number;
        argumentIndex: number;
        argumentCount: number;
    }
    enum CompletionInfoFlags {
        None = 0,
        MayIncludeAutoImports = 1,
        IsImportStatementCompletion = 2,
        IsContinuation = 4,
        ResolvedModuleSpecifiers = 8,
        ResolvedModuleSpecifiersBeyondLimit = 16,
        MayIncludeMethodSnippets = 32
    }
    interface CompletionInfo {
        /** For performance telemetry. */
        flags?: CompletionInfoFlags;
        /** Not true for all global completions. This will be true if the enclosing scope matches a few syntax kinds. See `isSnippetScope`. */
        isGlobalCompletion: boolean;
        isMemberCompletion: boolean;
        /**
         * In the absence of `CompletionEntry["replacementSpan"]`, the editor may choose whether to use
         * this span or its default one. If `CompletionEntry["replacementSpan"]` is defined, that span
         * must be used to commit that completion entry.
         */
        optionalReplacementSpan?: TextSpan;
        /**
         * true when the current location also allows for a new identifier
         */
        isNewIdentifierLocation: boolean;
        /**
         * Indicates to client to continue requesting completions on subsequent keystrokes.
         */
        isIncomplete?: true;
        entries: CompletionEntry[];
    }
    interface CompletionEntryDataAutoImport {
        /**
         * The name of the property or export in the module's symbol table. Differs from the completion name
         * in the case of InternalSymbolName.ExportEquals and InternalSymbolName.Default.
         */
        exportName: string;
        moduleSpecifier?: string;
        /** The file name declaring the export's module symbol, if it was an external module */
        fileName?: string;
        /** The module name (with quotes stripped) of the export's module symbol, if it was an ambient module */
        ambientModuleName?: string;
        /** True if the export was found in the package.json AutoImportProvider */
        isPackageJsonImport?: true;
    }
    interface CompletionEntryDataUnresolved extends CompletionEntryDataAutoImport {
        /** The key in the `ExportMapCache` where the completion entry's `SymbolExportInfo[]` is found */
        exportMapKey: string;
    }
    interface CompletionEntryDataResolved extends CompletionEntryDataAutoImport {
        moduleSpecifier: string;
    }
    type CompletionEntryData = CompletionEntryDataUnresolved | CompletionEntryDataResolved;
    interface CompletionEntry {
        name: string;
        kind: ScriptElementKind;
        kindModifiers?: string;
        sortText: string;
        insertText?: string;
        isSnippet?: true;
        /**
         * An optional span that indicates the text to be replaced by this completion item.
         * If present, this span should be used instead of the default one.
         * It will be set if the required span differs from the one generated by the default replacement behavior.
         */
        replacementSpan?: TextSpan;
        hasAction?: true;
        source?: string;
        sourceDisplay?: SymbolDisplayPart[];
        labelDetails?: CompletionEntryLabelDetails;
        isRecommended?: true;
        isFromUncheckedFile?: true;
        isPackageJsonImport?: true;
        isImportStatementCompletion?: true;
        /**
         * A property to be sent back to TS Server in the CompletionDetailsRequest, along with `name`,
         * that allows TS Server to look up the symbol represented by the completion item, disambiguating
         * items with the same name. Currently only defined for auto-import completions, but the type is
         * `unknown` in the protocol, so it can be changed as needed to support other kinds of completions.
         * The presence of this property should generally not be used to assume that this completion entry
         * is an auto-import.
         */
        data?: CompletionEntryData;
        jsDoc?: JSDocTagInfo[];
        displayParts?: SymbolDisplayPart[];
    }
    interface CompletionEntryLabelDetails {
        detail?: string;
        description?: string;
    }
    interface CompletionEntryDetails {
        name: string;
        kind: ScriptElementKind;
        kindModifiers: string;
        displayParts: SymbolDisplayPart[];
        documentation?: SymbolDisplayPart[];
        tags?: JSDocTagInfo[];
        codeActions?: CodeAction[];
        /** @deprecated Use `sourceDisplay` instead. */
        source?: SymbolDisplayPart[];
        sourceDisplay?: SymbolDisplayPart[];
    }
    interface OutliningSpan {
        /** The span of the document to actually collapse. */
        textSpan: TextSpan;
        /** The span of the document to display when the user hovers over the collapsed span. */
        hintSpan: TextSpan;
        /** The text to display in the editor for the collapsed region. */
        bannerText: string;
        /**
         * Whether or not this region should be automatically collapsed when
         * the 'Collapse to Definitions' command is invoked.
         */
        autoCollapse: boolean;
        /**
         * Classification of the contents of the span
         */
        kind: OutliningSpanKind;
    }
    enum OutliningSpanKind {
        /** Single or multi-line comments */
        Comment = "comment",
        /** Sections marked by '// #region' and '// #endregion' comments */
        Region = "region",
        /** Declarations and expressions */
        Code = "code",
        /** Contiguous blocks of import declarations */
        Imports = "imports"
    }
    enum OutputFileType {
        JavaScript = 0,
        SourceMap = 1,
        Declaration = 2
    }
    enum EndOfLineState {
        None = 0,
        InMultiLineCommentTrivia = 1,
        InSingleQuoteStringLiteral = 2,
        InDoubleQuoteStringLiteral = 3,
        InTemplateHeadOrNoSubstitutionTemplate = 4,
        InTemplateMiddleOrTail = 5,
        InTemplateSubstitutionPosition = 6
    }
    enum TokenClass {
        Punctuation = 0,
        Keyword = 1,
        Operator = 2,
        Comment = 3,
        Whitespace = 4,
        Identifier = 5,
        NumberLiteral = 6,
        BigIntLiteral = 7,
        StringLiteral = 8,
        RegExpLiteral = 9
    }
    interface ClassificationResult {
        finalLexState: EndOfLineState;
        entries: ClassificationInfo[];
    }
    interface ClassificationInfo {
        length: number;
        classification: TokenClass;
    }
    interface Classifier {
        /**
         * Gives lexical classifications of tokens on a line without any syntactic context.
         * For instance, a token consisting of the text 'string' can be either an identifier
         * named 'string' or the keyword 'string', however, because this classifier is not aware,
         * it relies on certain heuristics to give acceptable results. For classifications where
         * speed trumps accuracy, this function is preferable; however, for true accuracy, the
         * syntactic classifier is ideal. In fact, in certain editing scenarios, combining the
         * lexical, syntactic, and semantic classifiers may issue the best user experience.
         *
         * @param text                      The text of a line to classify.
         * @param lexState                  The state of the lexical classifier at the end of the previous line.
         * @param syntacticClassifierAbsent Whether the client is *not* using a syntactic classifier.
         *                                  If there is no syntactic classifier (syntacticClassifierAbsent=true),
         *                                  certain heuristics may be used in its place; however, if there is a
         *                                  syntactic classifier (syntacticClassifierAbsent=false), certain
         *                                  classifications which may be incorrectly categorized will be given
         *                                  back as Identifiers in order to allow the syntactic classifier to
         *                                  subsume the classification.
         * @deprecated Use getLexicalClassifications instead.
         */
        getClassificationsForLine(text: string, lexState: EndOfLineState, syntacticClassifierAbsent: boolean): ClassificationResult;
        getEncodedLexicalClassifications(text: string, endOfLineState: EndOfLineState, syntacticClassifierAbsent: boolean): Classifications;
    }
    enum ScriptElementKind {
        unknown = "",
        warning = "warning",
        /** predefined type (void) or keyword (class) */
        keyword = "keyword",
        /** top level script node */
        scriptElement = "script",
        /** module foo {} */
        moduleElement = "module",
        /** class X {} */
        classElement = "class",
        /** var x = class X {} */
        localClassElement = "local class",
        /** struct X {} */
        structElement = "struct",
        /** interface Y {} */
        interfaceElement = "interface",
        /** type T = ... */
        typeElement = "type",
        /** enum E */
        enumElement = "enum",
        enumMemberElement = "enum member",
        /**
         * Inside module and script only
         * const v = ..
         */
        variableElement = "var",
        /** Inside function */
        localVariableElement = "local var",
        /**
         * Inside module and script only
         * function f() { }
         */
        functionElement = "function",
        /** Inside function */
        localFunctionElement = "local function",
        /** class X { [public|private]* foo() {} } */
        memberFunctionElement = "method",
        /** class X { [public|private]* [get|set] foo:number; } */
        memberGetAccessorElement = "getter",
        memberSetAccessorElement = "setter",
        /**
         * class X { [public|private]* foo:number; }
         * interface Y { foo:number; }
         */
        memberVariableElement = "property",
        /** class X { [public|private]* accessor foo: number; } */
        memberAccessorVariableElement = "accessor",
        /**
         * class X { constructor() { } }
         * class X { static { } }
         */
        constructorImplementationElement = "constructor",
        /** interface Y { ():number; } */
        callSignatureElement = "call",
        /** interface Y { []:number; } */
        indexSignatureElement = "index",
        /** interface Y { new():Y; } */
        constructSignatureElement = "construct",
        /** function foo(*Y*: string) */
        parameterElement = "parameter",
        typeParameterElement = "type parameter",
        primitiveType = "primitive type",
        label = "label",
        alias = "alias",
        constElement = "const",
        letElement = "let",
        directory = "directory",
        externalModuleName = "external module name",
        /**
         * <JsxTagName attribute1 attribute2={0} />
         * @deprecated
         */
        jsxAttribute = "JSX attribute",
        /** String literal */
        string = "string",
        /** Jsdoc @link: in `{@link C link text}`, the before and after text "{@link " and "}" */
        link = "link",
        /** Jsdoc @link: in `{@link C link text}`, the entity name "C" */
        linkName = "link name",
        /** Jsdoc @link: in `{@link C link text}`, the link text "link text" */
        linkText = "link text"
    }
    enum ScriptElementKindModifier {
        none = "",
        publicMemberModifier = "public",
        privateMemberModifier = "private",
        protectedMemberModifier = "protected",
        exportedModifier = "export",
        ambientModifier = "declare",
        staticModifier = "static",
        abstractModifier = "abstract",
        optionalModifier = "optional",
        deprecatedModifier = "deprecated",
        dtsModifier = ".d.ts",
        tsModifier = ".ts",
        tsxModifier = ".tsx",
        jsModifier = ".js",
        jsxModifier = ".jsx",
        jsonModifier = ".json",
        dmtsModifier = ".d.mts",
        mtsModifier = ".mts",
        mjsModifier = ".mjs",
        dctsModifier = ".d.cts",
        ctsModifier = ".cts",
        cjsModifier = ".cjs",
        etsModifier = ".ets",
        detsModifier = ".d.ets"
    }
    enum ClassificationTypeNames {
        comment = "comment",
        identifier = "identifier",
        keyword = "keyword",
        numericLiteral = "number",
        bigintLiteral = "bigint",
        operator = "operator",
        stringLiteral = "string",
        whiteSpace = "whitespace",
        text = "text",
        punctuation = "punctuation",
        className = "class name",
        enumName = "enum name",
        interfaceName = "interface name",
        moduleName = "module name",
        typeParameterName = "type parameter name",
        typeAliasName = "type alias name",
        parameterName = "parameter name",
        docCommentTagName = "doc comment tag name",
        jsxOpenTagName = "jsx open tag name",
        jsxCloseTagName = "jsx close tag name",
        jsxSelfClosingTagName = "jsx self closing tag name",
        jsxAttribute = "jsx attribute",
        jsxText = "jsx text",
        jsxAttributeStringLiteralValue = "jsx attribute string literal value"
    }
    enum ClassificationType {
        comment = 1,
        identifier = 2,
        keyword = 3,
        numericLiteral = 4,
        operator = 5,
        stringLiteral = 6,
        regularExpressionLiteral = 7,
        whiteSpace = 8,
        text = 9,
        punctuation = 10,
        className = 11,
        enumName = 12,
        interfaceName = 13,
        moduleName = 14,
        typeParameterName = 15,
        typeAliasName = 16,
        parameterName = 17,
        docCommentTagName = 18,
        jsxOpenTagName = 19,
        jsxCloseTagName = 20,
        jsxSelfClosingTagName = 21,
        jsxAttribute = 22,
        jsxText = 23,
        jsxAttributeStringLiteralValue = 24,
        bigintLiteral = 25
    }
    interface InlayHintsContext {
        file: SourceFile;
        program: Program;
        cancellationToken: CancellationToken;
        host: LanguageServiceHost;
        span: TextSpan;
        preferences: UserPreferences;
    }
    /** The classifier is used for syntactic highlighting in editors via the TSServer */
    function createClassifier(): Classifier;
    interface DocumentHighlights {
        fileName: string;
        highlightSpans: HighlightSpan[];
    }
    function createDocumentRegistry(useCaseSensitiveFileNames?: boolean, currentDirectory?: string): DocumentRegistry;
    /**
     * The document registry represents a store of SourceFile objects that can be shared between
     * multiple LanguageService instances. A LanguageService instance holds on the SourceFile (AST)
     * of files in the context.
     * SourceFile objects account for most of the memory usage by the language service. Sharing
     * the same DocumentRegistry instance between different instances of LanguageService allow
     * for more efficient memory utilization since all projects will share at least the library
     * file (lib.d.ts).
     *
     * A more advanced use of the document registry is to serialize sourceFile objects to disk
     * and re-hydrate them when needed.
     *
     * To create a default DocumentRegistry, use createDocumentRegistry to create one, and pass it
     * to all subsequent createLanguageService calls.
     */
    interface DocumentRegistry {
        /**
         * Request a stored SourceFile with a given fileName and compilationSettings.
         * The first call to acquire will call createLanguageServiceSourceFile to generate
         * the SourceFile if was not found in the registry.
         *
         * @param fileName The name of the file requested
         * @param compilationSettingsOrHost Some compilation settings like target affects the
         * shape of a the resulting SourceFile. This allows the DocumentRegistry to store
         * multiple copies of the same file for different compilation settings. A minimal
         * resolution cache is needed to fully define a source file's shape when
         * the compilation settings include `module: node16`+, so providing a cache host
         * object should be preferred. A common host is a language service `ConfiguredProject`.
         * @param scriptSnapshot Text of the file. Only used if the file was not found
         * in the registry and a new one was created.
         * @param version Current version of the file. Only used if the file was not found
         * in the registry and a new one was created.
         */
        acquireDocument(fileName: string, compilationSettingsOrHost: CompilerOptions | MinimalResolutionCacheHost, scriptSnapshot: IScriptSnapshot, version: string, scriptKind?: ScriptKind, sourceFileOptions?: CreateSourceFileOptions | ScriptTarget): SourceFile;
        acquireDocumentWithKey(fileName: string, path: Path, compilationSettingsOrHost: CompilerOptions | MinimalResolutionCacheHost, key: DocumentRegistryBucketKey, scriptSnapshot: IScriptSnapshot, version: string, scriptKind?: ScriptKind, sourceFileOptions?: CreateSourceFileOptions | ScriptTarget): SourceFile;
        /**
         * Request an updated version of an already existing SourceFile with a given fileName
         * and compilationSettings. The update will in-turn call updateLanguageServiceSourceFile
         * to get an updated SourceFile.
         *
         * @param fileName The name of the file requested
         * @param compilationSettingsOrHost Some compilation settings like target affects the
         * shape of a the resulting SourceFile. This allows the DocumentRegistry to store
         * multiple copies of the same file for different compilation settings. A minimal
         * resolution cache is needed to fully define a source file's shape when
         * the compilation settings include `module: node16`+, so providing a cache host
         * object should be preferred. A common host is a language service `ConfiguredProject`.
         * @param scriptSnapshot Text of the file.
         * @param version Current version of the file.
         */
        updateDocument(fileName: string, compilationSettingsOrHost: CompilerOptions | MinimalResolutionCacheHost, scriptSnapshot: IScriptSnapshot, version: string, scriptKind?: ScriptKind, sourceFileOptions?: CreateSourceFileOptions | ScriptTarget): SourceFile;
        updateDocumentWithKey(fileName: string, path: Path, compilationSettingsOrHost: CompilerOptions | MinimalResolutionCacheHost, key: DocumentRegistryBucketKey, scriptSnapshot: IScriptSnapshot, version: string, scriptKind?: ScriptKind, sourceFileOptions?: CreateSourceFileOptions | ScriptTarget): SourceFile;
        getKeyForCompilationSettings(settings: CompilerOptions): DocumentRegistryBucketKey;
        /**
         * Informs the DocumentRegistry that a file is not needed any longer.
         *
         * Note: It is not allowed to call release on a SourceFile that was not acquired from
         * this registry originally.
         *
         * @param fileName The name of the file to be released
         * @param compilationSettings The compilation settings used to acquire the file
         * @param scriptKind The script kind of the file to be released
         *
         * @deprecated pass scriptKind and impliedNodeFormat for correctness
         */
        releaseDocument(fileName: string, compilationSettings: CompilerOptions, scriptKind?: ScriptKind): void;
        /**
         * Informs the DocumentRegistry that a file is not needed any longer.
         *
         * Note: It is not allowed to call release on a SourceFile that was not acquired from
         * this registry originally.
         *
         * @param fileName The name of the file to be released
         * @param compilationSettings The compilation settings used to acquire the file
         * @param scriptKind The script kind of the file to be released
         * @param impliedNodeFormat The implied source file format of the file to be released
         */
        releaseDocument(fileName: string, compilationSettings: CompilerOptions, scriptKind: ScriptKind, impliedNodeFormat: SourceFile["impliedNodeFormat"]): void;
        /**
         * @deprecated pass scriptKind for and impliedNodeFormat correctness */
        releaseDocumentWithKey(path: Path, key: DocumentRegistryBucketKey, scriptKind?: ScriptKind): void;
        releaseDocumentWithKey(path: Path, key: DocumentRegistryBucketKey, scriptKind: ScriptKind, impliedNodeFormat: SourceFile["impliedNodeFormat"]): void;
        reportStats(): string;
    }
    type DocumentRegistryBucketKey = string & {
        __bucketKey: any;
    };
    function preProcessFile(sourceText: string, readImportFiles?: boolean, detectJavaScriptImports?: boolean): PreProcessedFileInfo;
    function transpileModule(input: string, transpileOptions: TranspileOptions): TranspileOutput;
    function transpile(input: string, compilerOptions?: CompilerOptions, fileName?: string, diagnostics?: Diagnostic[], moduleName?: string): string;
    interface TranspileOptions {
        compilerOptions?: CompilerOptions;
        fileName?: string;
        reportDiagnostics?: boolean;
        moduleName?: string;
        renamedDependencies?: MapLike<string>;
        transformers?: CustomTransformers;
    }
    interface TranspileOutput {
        outputText: string;
        diagnostics?: Diagnostic[];
        sourceMapText?: string;
    }
    function toEditorSettings(options: EditorOptions | EditorSettings): EditorSettings;
    function displayPartsToString(displayParts: SymbolDisplayPart[] | undefined): string;
    function getDefaultCompilerOptions(): CompilerOptions;
    function getSupportedCodeFixes(): string[];
    function createLanguageServiceSourceFile(fileName: string, scriptSnapshot: IScriptSnapshot, scriptTargetOrOptions: ScriptTarget | CreateSourceFileOptions, version: string, setNodeParents: boolean, scriptKind?: ScriptKind, option?: CompilerOptions): SourceFile;
    function updateLanguageServiceSourceFile(sourceFile: SourceFile, scriptSnapshot: IScriptSnapshot, version: string, textChangeRange: TextChangeRange | undefined, aggressiveChecks?: boolean, option?: CompilerOptions): SourceFile;
    function createLanguageService(host: LanguageServiceHost, documentRegistry?: DocumentRegistry, syntaxOnlyOrLanguageServiceMode?: boolean | LanguageServiceMode): LanguageService;
    /**
     * Get the path of the default library files (lib.d.ts) as distributed with the typescript
     * node package.
     * The functionality is not supported if the ts module is consumed outside of a node module.
     */
    function getDefaultLibFilePath(options: CompilerOptions): string;
    /** The version of the language service API */
    const servicesVersion = "0.8";
    /**
     * Transform one or more nodes using the supplied transformers.
     * @param source A single `Node` or an array of `Node` objects.
     * @param transformers An array of `TransformerFactory` callbacks used to process the transformation.
     * @param compilerOptions Optional compiler options.
     */
    function transform<T extends Node>(source: T | T[], transformers: TransformerFactory<T>[], compilerOptions?: CompilerOptions): TransformationResult<T>;
    /** @deprecated Use `factory.createNodeArray` or the factory supplied by your transformation context instead. */
    const createNodeArray: typeof factory.createNodeArray;
    /** @deprecated Use `factory.createNumericLiteral` or the factory supplied by your transformation context instead. */
    const createNumericLiteral: typeof factory.createNumericLiteral;
    /** @deprecated Use `factory.createBigIntLiteral` or the factory supplied by your transformation context instead. */
    const createBigIntLiteral: typeof factory.createBigIntLiteral;
    /** @deprecated Use `factory.createStringLiteral` or the factory supplied by your transformation context instead. */
    const createStringLiteral: typeof factory.createStringLiteral;
    /** @deprecated Use `factory.createStringLiteralFromNode` or the factory supplied by your transformation context instead. */
    const createStringLiteralFromNode: typeof factory.createStringLiteralFromNode;
    /** @deprecated Use `factory.createRegularExpressionLiteral` or the factory supplied by your transformation context instead. */
    const createRegularExpressionLiteral: typeof factory.createRegularExpressionLiteral;
    /** @deprecated Use `factory.createLoopVariable` or the factory supplied by your transformation context instead. */
    const createLoopVariable: typeof factory.createLoopVariable;
    /** @deprecated Use `factory.createUniqueName` or the factory supplied by your transformation context instead. */
    const createUniqueName: typeof factory.createUniqueName;
    /** @deprecated Use `factory.createPrivateIdentifier` or the factory supplied by your transformation context instead. */
    const createPrivateIdentifier: typeof factory.createPrivateIdentifier;
    /** @deprecated Use `factory.createSuper` or the factory supplied by your transformation context instead. */
    const createSuper: typeof factory.createSuper;
    /** @deprecated Use `factory.createThis` or the factory supplied by your transformation context instead. */
    const createThis: typeof factory.createThis;
    /** @deprecated Use `factory.createNull` or the factory supplied by your transformation context instead. */
    const createNull: typeof factory.createNull;
    /** @deprecated Use `factory.createTrue` or the factory supplied by your transformation context instead. */
    const createTrue: typeof factory.createTrue;
    /** @deprecated Use `factory.createFalse` or the factory supplied by your transformation context instead. */
    const createFalse: typeof factory.createFalse;
    /** @deprecated Use `factory.createModifier` or the factory supplied by your transformation context instead. */
    const createModifier: typeof factory.createModifier;
    /** @deprecated Use `factory.createModifiersFromModifierFlags` or the factory supplied by your transformation context instead. */
    const createModifiersFromModifierFlags: typeof factory.createModifiersFromModifierFlags;
    /** @deprecated Use `factory.createQualifiedName` or the factory supplied by your transformation context instead. */
    const createQualifiedName: typeof factory.createQualifiedName;
    /** @deprecated Use `factory.updateQualifiedName` or the factory supplied by your transformation context instead. */
    const updateQualifiedName: typeof factory.updateQualifiedName;
    /** @deprecated Use `factory.createComputedPropertyName` or the factory supplied by your transformation context instead. */
    const createComputedPropertyName: typeof factory.createComputedPropertyName;
    /** @deprecated Use `factory.updateComputedPropertyName` or the factory supplied by your transformation context instead. */
    const updateComputedPropertyName: typeof factory.updateComputedPropertyName;
    /** @deprecated Use `factory.createTypeParameterDeclaration` or the factory supplied by your transformation context instead. */
    const createTypeParameterDeclaration: typeof factory.createTypeParameterDeclaration;
    /** @deprecated Use `factory.updateTypeParameterDeclaration` or the factory supplied by your transformation context instead. */
    const updateTypeParameterDeclaration: typeof factory.updateTypeParameterDeclaration;
    /** @deprecated Use `factory.createParameterDeclaration` or the factory supplied by your transformation context instead. */
    const createParameter: typeof factory.createParameterDeclaration;
    /** @deprecated Use `factory.updateParameterDeclaration` or the factory supplied by your transformation context instead. */
    const updateParameter: typeof factory.updateParameterDeclaration;
    /** @deprecated Use `factory.createDecorator` or the factory supplied by your transformation context instead. */
    const createDecorator: typeof factory.createDecorator;
    /** @deprecated Use `factory.updateDecorator` or the factory supplied by your transformation context instead. */
    const updateDecorator: typeof factory.updateDecorator;
    /** @deprecated Use `factory.createPropertyDeclaration` or the factory supplied by your transformation context instead. */
    const createProperty: typeof factory.createPropertyDeclaration;
    /** @deprecated Use `factory.updatePropertyDeclaration` or the factory supplied by your transformation context instead. */
    const updateProperty: typeof factory.updatePropertyDeclaration;
    /** @deprecated Use `factory.createMethodDeclaration` or the factory supplied by your transformation context instead. */
    const createMethod: typeof factory.createMethodDeclaration;
    /** @deprecated Use `factory.updateMethodDeclaration` or the factory supplied by your transformation context instead. */
    const updateMethod: typeof factory.updateMethodDeclaration;
    /** @deprecated Use `factory.createConstructorDeclaration` or the factory supplied by your transformation context instead. */
    const createConstructor: typeof factory.createConstructorDeclaration;
    /** @deprecated Use `factory.updateConstructorDeclaration` or the factory supplied by your transformation context instead. */
    const updateConstructor: typeof factory.updateConstructorDeclaration;
    /** @deprecated Use `factory.createGetAccessorDeclaration` or the factory supplied by your transformation context instead. */
    const createGetAccessor: typeof factory.createGetAccessorDeclaration;
    /** @deprecated Use `factory.updateGetAccessorDeclaration` or the factory supplied by your transformation context instead. */
    const updateGetAccessor: typeof factory.updateGetAccessorDeclaration;
    /** @deprecated Use `factory.createSetAccessorDeclaration` or the factory supplied by your transformation context instead. */
    const createSetAccessor: typeof factory.createSetAccessorDeclaration;
    /** @deprecated Use `factory.updateSetAccessorDeclaration` or the factory supplied by your transformation context instead. */
    const updateSetAccessor: typeof factory.updateSetAccessorDeclaration;
    /** @deprecated Use `factory.createCallSignature` or the factory supplied by your transformation context instead. */
    const createCallSignature: typeof factory.createCallSignature;
    /** @deprecated Use `factory.updateCallSignature` or the factory supplied by your transformation context instead. */
    const updateCallSignature: typeof factory.updateCallSignature;
    /** @deprecated Use `factory.createConstructSignature` or the factory supplied by your transformation context instead. */
    const createConstructSignature: typeof factory.createConstructSignature;
    /** @deprecated Use `factory.updateConstructSignature` or the factory supplied by your transformation context instead. */
    const updateConstructSignature: typeof factory.updateConstructSignature;
    /** @deprecated Use `factory.updateIndexSignature` or the factory supplied by your transformation context instead. */
    const updateIndexSignature: typeof factory.updateIndexSignature;
    /** @deprecated Use `factory.createKeywordTypeNode` or the factory supplied by your transformation context instead. */
    const createKeywordTypeNode: typeof factory.createKeywordTypeNode;
    /** @deprecated Use `factory.createTypePredicateNode` or the factory supplied by your transformation context instead. */
    const createTypePredicateNodeWithModifier: typeof factory.createTypePredicateNode;
    /** @deprecated Use `factory.updateTypePredicateNode` or the factory supplied by your transformation context instead. */
    const updateTypePredicateNodeWithModifier: typeof factory.updateTypePredicateNode;
    /** @deprecated Use `factory.createTypeReferenceNode` or the factory supplied by your transformation context instead. */
    const createTypeReferenceNode: typeof factory.createTypeReferenceNode;
    /** @deprecated Use `factory.updateTypeReferenceNode` or the factory supplied by your transformation context instead. */
    const updateTypeReferenceNode: typeof factory.updateTypeReferenceNode;
    /** @deprecated Use `factory.createFunctionTypeNode` or the factory supplied by your transformation context instead. */
    const createFunctionTypeNode: typeof factory.createFunctionTypeNode;
    /** @deprecated Use `factory.updateFunctionTypeNode` or the factory supplied by your transformation context instead. */
    const updateFunctionTypeNode: typeof factory.updateFunctionTypeNode;
    /** @deprecated Use `factory.createConstructorTypeNode` or the factory supplied by your transformation context instead. */
    const createConstructorTypeNode: (typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode) => ConstructorTypeNode;
    /** @deprecated Use `factory.updateConstructorTypeNode` or the factory supplied by your transformation context instead. */
    const updateConstructorTypeNode: (node: ConstructorTypeNode, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode) => ConstructorTypeNode;
    /** @deprecated Use `factory.createTypeQueryNode` or the factory supplied by your transformation context instead. */
    const createTypeQueryNode: typeof factory.createTypeQueryNode;
    /** @deprecated Use `factory.updateTypeQueryNode` or the factory supplied by your transformation context instead. */
    const updateTypeQueryNode: typeof factory.updateTypeQueryNode;
    /** @deprecated Use `factory.createTypeLiteralNode` or the factory supplied by your transformation context instead. */
    const createTypeLiteralNode: typeof factory.createTypeLiteralNode;
    /** @deprecated Use `factory.updateTypeLiteralNode` or the factory supplied by your transformation context instead. */
    const updateTypeLiteralNode: typeof factory.updateTypeLiteralNode;
    /** @deprecated Use `factory.createArrayTypeNode` or the factory supplied by your transformation context instead. */
    const createArrayTypeNode: typeof factory.createArrayTypeNode;
    /** @deprecated Use `factory.updateArrayTypeNode` or the factory supplied by your transformation context instead. */
    const updateArrayTypeNode: typeof factory.updateArrayTypeNode;
    /** @deprecated Use `factory.createTupleTypeNode` or the factory supplied by your transformation context instead. */
    const createTupleTypeNode: typeof factory.createTupleTypeNode;
    /** @deprecated Use `factory.updateTupleTypeNode` or the factory supplied by your transformation context instead. */
    const updateTupleTypeNode: typeof factory.updateTupleTypeNode;
    /** @deprecated Use `factory.createOptionalTypeNode` or the factory supplied by your transformation context instead. */
    const createOptionalTypeNode: typeof factory.createOptionalTypeNode;
    /** @deprecated Use `factory.updateOptionalTypeNode` or the factory supplied by your transformation context instead. */
    const updateOptionalTypeNode: typeof factory.updateOptionalTypeNode;
    /** @deprecated Use `factory.createRestTypeNode` or the factory supplied by your transformation context instead. */
    const createRestTypeNode: typeof factory.createRestTypeNode;
    /** @deprecated Use `factory.updateRestTypeNode` or the factory supplied by your transformation context instead. */
    const updateRestTypeNode: typeof factory.updateRestTypeNode;
    /** @deprecated Use `factory.createUnionTypeNode` or the factory supplied by your transformation context instead. */
    const createUnionTypeNode: typeof factory.createUnionTypeNode;
    /** @deprecated Use `factory.updateUnionTypeNode` or the factory supplied by your transformation context instead. */
    const updateUnionTypeNode: typeof factory.updateUnionTypeNode;
    /** @deprecated Use `factory.createIntersectionTypeNode` or the factory supplied by your transformation context instead. */
    const createIntersectionTypeNode: typeof factory.createIntersectionTypeNode;
    /** @deprecated Use `factory.updateIntersectionTypeNode` or the factory supplied by your transformation context instead. */
    const updateIntersectionTypeNode: typeof factory.updateIntersectionTypeNode;
    /** @deprecated Use `factory.createConditionalTypeNode` or the factory supplied by your transformation context instead. */
    const createConditionalTypeNode: typeof factory.createConditionalTypeNode;
    /** @deprecated Use `factory.updateConditionalTypeNode` or the factory supplied by your transformation context instead. */
    const updateConditionalTypeNode: typeof factory.updateConditionalTypeNode;
    /** @deprecated Use `factory.createInferTypeNode` or the factory supplied by your transformation context instead. */
    const createInferTypeNode: typeof factory.createInferTypeNode;
    /** @deprecated Use `factory.updateInferTypeNode` or the factory supplied by your transformation context instead. */
    const updateInferTypeNode: typeof factory.updateInferTypeNode;
    /** @deprecated Use `factory.createImportTypeNode` or the factory supplied by your transformation context instead. */
    const createImportTypeNode: typeof factory.createImportTypeNode;
    /** @deprecated Use `factory.updateImportTypeNode` or the factory supplied by your transformation context instead. */
    const updateImportTypeNode: typeof factory.updateImportTypeNode;
    /** @deprecated Use `factory.createParenthesizedType` or the factory supplied by your transformation context instead. */
    const createParenthesizedType: typeof factory.createParenthesizedType;
    /** @deprecated Use `factory.updateParenthesizedType` or the factory supplied by your transformation context instead. */
    const updateParenthesizedType: typeof factory.updateParenthesizedType;
    /** @deprecated Use `factory.createThisTypeNode` or the factory supplied by your transformation context instead. */
    const createThisTypeNode: typeof factory.createThisTypeNode;
    /** @deprecated Use `factory.updateTypeOperatorNode` or the factory supplied by your transformation context instead. */
    const updateTypeOperatorNode: typeof factory.updateTypeOperatorNode;
    /** @deprecated Use `factory.createIndexedAccessTypeNode` or the factory supplied by your transformation context instead. */
    const createIndexedAccessTypeNode: typeof factory.createIndexedAccessTypeNode;
    /** @deprecated Use `factory.updateIndexedAccessTypeNode` or the factory supplied by your transformation context instead. */
    const updateIndexedAccessTypeNode: typeof factory.updateIndexedAccessTypeNode;
    /** @deprecated Use `factory.createMappedTypeNode` or the factory supplied by your transformation context instead. */
    const createMappedTypeNode: typeof factory.createMappedTypeNode;
    /** @deprecated Use `factory.updateMappedTypeNode` or the factory supplied by your transformation context instead. */
    const updateMappedTypeNode: typeof factory.updateMappedTypeNode;
    /** @deprecated Use `factory.createLiteralTypeNode` or the factory supplied by your transformation context instead. */
    const createLiteralTypeNode: typeof factory.createLiteralTypeNode;
    /** @deprecated Use `factory.updateLiteralTypeNode` or the factory supplied by your transformation context instead. */
    const updateLiteralTypeNode: typeof factory.updateLiteralTypeNode;
    /** @deprecated Use `factory.createObjectBindingPattern` or the factory supplied by your transformation context instead. */
    const createObjectBindingPattern: typeof factory.createObjectBindingPattern;
    /** @deprecated Use `factory.updateObjectBindingPattern` or the factory supplied by your transformation context instead. */
    const updateObjectBindingPattern: typeof factory.updateObjectBindingPattern;
    /** @deprecated Use `factory.createArrayBindingPattern` or the factory supplied by your transformation context instead. */
    const createArrayBindingPattern: typeof factory.createArrayBindingPattern;
    /** @deprecated Use `factory.updateArrayBindingPattern` or the factory supplied by your transformation context instead. */
    const updateArrayBindingPattern: typeof factory.updateArrayBindingPattern;
    /** @deprecated Use `factory.createBindingElement` or the factory supplied by your transformation context instead. */
    const createBindingElement: typeof factory.createBindingElement;
    /** @deprecated Use `factory.updateBindingElement` or the factory supplied by your transformation context instead. */
    const updateBindingElement: typeof factory.updateBindingElement;
    /** @deprecated Use `factory.createArrayLiteralExpression` or the factory supplied by your transformation context instead. */
    const createArrayLiteral: typeof factory.createArrayLiteralExpression;
    /** @deprecated Use `factory.updateArrayLiteralExpression` or the factory supplied by your transformation context instead. */
    const updateArrayLiteral: typeof factory.updateArrayLiteralExpression;
    /** @deprecated Use `factory.createObjectLiteralExpression` or the factory supplied by your transformation context instead. */
    const createObjectLiteral: typeof factory.createObjectLiteralExpression;
    /** @deprecated Use `factory.updateObjectLiteralExpression` or the factory supplied by your transformation context instead. */
    const updateObjectLiteral: typeof factory.updateObjectLiteralExpression;
    /** @deprecated Use `factory.createPropertyAccessExpression` or the factory supplied by your transformation context instead. */
    const createPropertyAccess: typeof factory.createPropertyAccessExpression;
    /** @deprecated Use `factory.updatePropertyAccessExpression` or the factory supplied by your transformation context instead. */
    const updatePropertyAccess: typeof factory.updatePropertyAccessExpression;
    /** @deprecated Use `factory.createPropertyAccessChain` or the factory supplied by your transformation context instead. */
    const createPropertyAccessChain: typeof factory.createPropertyAccessChain;
    /** @deprecated Use `factory.updatePropertyAccessChain` or the factory supplied by your transformation context instead. */
    const updatePropertyAccessChain: typeof factory.updatePropertyAccessChain;
    /** @deprecated Use `factory.createElementAccessExpression` or the factory supplied by your transformation context instead. */
    const createElementAccess: typeof factory.createElementAccessExpression;
    /** @deprecated Use `factory.updateElementAccessExpression` or the factory supplied by your transformation context instead. */
    const updateElementAccess: typeof factory.updateElementAccessExpression;
    /** @deprecated Use `factory.createElementAccessChain` or the factory supplied by your transformation context instead. */
    const createElementAccessChain: typeof factory.createElementAccessChain;
    /** @deprecated Use `factory.updateElementAccessChain` or the factory supplied by your transformation context instead. */
    const updateElementAccessChain: typeof factory.updateElementAccessChain;
    /** @deprecated Use `factory.createCallExpression` or the factory supplied by your transformation context instead. */
    const createCall: typeof factory.createCallExpression;
    /** @deprecated Use `factory.updateCallExpression` or the factory supplied by your transformation context instead. */
    const updateCall: typeof factory.updateCallExpression;
    /** @deprecated Use `factory.createCallChain` or the factory supplied by your transformation context instead. */
    const createCallChain: typeof factory.createCallChain;
    /** @deprecated Use `factory.updateCallChain` or the factory supplied by your transformation context instead. */
    const updateCallChain: typeof factory.updateCallChain;
    /** @deprecated Use `factory.createNewExpression` or the factory supplied by your transformation context instead. */
    const createNew: typeof factory.createNewExpression;
    /** @deprecated Use `factory.updateNewExpression` or the factory supplied by your transformation context instead. */
    const updateNew: typeof factory.updateNewExpression;
    /** @deprecated Use `factory.createTypeAssertion` or the factory supplied by your transformation context instead. */
    const createTypeAssertion: typeof factory.createTypeAssertion;
    /** @deprecated Use `factory.updateTypeAssertion` or the factory supplied by your transformation context instead. */
    const updateTypeAssertion: typeof factory.updateTypeAssertion;
    /** @deprecated Use `factory.createParenthesizedExpression` or the factory supplied by your transformation context instead. */
    const createParen: typeof factory.createParenthesizedExpression;
    /** @deprecated Use `factory.updateParenthesizedExpression` or the factory supplied by your transformation context instead. */
    const updateParen: typeof factory.updateParenthesizedExpression;
    /** @deprecated Use `factory.createFunctionExpression` or the factory supplied by your transformation context instead. */
    const createFunctionExpression: typeof factory.createFunctionExpression;
    /** @deprecated Use `factory.updateFunctionExpression` or the factory supplied by your transformation context instead. */
    const updateFunctionExpression: typeof factory.updateFunctionExpression;
    /** @deprecated Use `factory.createDeleteExpression` or the factory supplied by your transformation context instead. */
    const createDelete: typeof factory.createDeleteExpression;
    /** @deprecated Use `factory.updateDeleteExpression` or the factory supplied by your transformation context instead. */
    const updateDelete: typeof factory.updateDeleteExpression;
    /** @deprecated Use `factory.createTypeOfExpression` or the factory supplied by your transformation context instead. */
    const createTypeOf: typeof factory.createTypeOfExpression;
    /** @deprecated Use `factory.updateTypeOfExpression` or the factory supplied by your transformation context instead. */
    const updateTypeOf: typeof factory.updateTypeOfExpression;
    /** @deprecated Use `factory.createVoidExpression` or the factory supplied by your transformation context instead. */
    const createVoid: typeof factory.createVoidExpression;
    /** @deprecated Use `factory.updateVoidExpression` or the factory supplied by your transformation context instead. */
    const updateVoid: typeof factory.updateVoidExpression;
    /** @deprecated Use `factory.createAwaitExpression` or the factory supplied by your transformation context instead. */
    const createAwait: typeof factory.createAwaitExpression;
    /** @deprecated Use `factory.updateAwaitExpression` or the factory supplied by your transformation context instead. */
    const updateAwait: typeof factory.updateAwaitExpression;
    /** @deprecated Use `factory.createPrefixExpression` or the factory supplied by your transformation context instead. */
    const createPrefix: typeof factory.createPrefixUnaryExpression;
    /** @deprecated Use `factory.updatePrefixExpression` or the factory supplied by your transformation context instead. */
    const updatePrefix: typeof factory.updatePrefixUnaryExpression;
    /** @deprecated Use `factory.createPostfixUnaryExpression` or the factory supplied by your transformation context instead. */
    const createPostfix: typeof factory.createPostfixUnaryExpression;
    /** @deprecated Use `factory.updatePostfixUnaryExpression` or the factory supplied by your transformation context instead. */
    const updatePostfix: typeof factory.updatePostfixUnaryExpression;
    /** @deprecated Use `factory.createBinaryExpression` or the factory supplied by your transformation context instead. */
    const createBinary: typeof factory.createBinaryExpression;
    /** @deprecated Use `factory.updateConditionalExpression` or the factory supplied by your transformation context instead. */
    const updateConditional: typeof factory.updateConditionalExpression;
    /** @deprecated Use `factory.createTemplateExpression` or the factory supplied by your transformation context instead. */
    const createTemplateExpression: typeof factory.createTemplateExpression;
    /** @deprecated Use `factory.updateTemplateExpression` or the factory supplied by your transformation context instead. */
    const updateTemplateExpression: typeof factory.updateTemplateExpression;
    /** @deprecated Use `factory.createTemplateHead` or the factory supplied by your transformation context instead. */
    const createTemplateHead: typeof factory.createTemplateHead;
    /** @deprecated Use `factory.createTemplateMiddle` or the factory supplied by your transformation context instead. */
    const createTemplateMiddle: typeof factory.createTemplateMiddle;
    /** @deprecated Use `factory.createTemplateTail` or the factory supplied by your transformation context instead. */
    const createTemplateTail: typeof factory.createTemplateTail;
    /** @deprecated Use `factory.createNoSubstitutionTemplateLiteral` or the factory supplied by your transformation context instead. */
    const createNoSubstitutionTemplateLiteral: typeof factory.createNoSubstitutionTemplateLiteral;
    /** @deprecated Use `factory.updateYieldExpression` or the factory supplied by your transformation context instead. */
    const updateYield: typeof factory.updateYieldExpression;
    /** @deprecated Use `factory.createSpreadExpression` or the factory supplied by your transformation context instead. */
    const createSpread: typeof factory.createSpreadElement;
    /** @deprecated Use `factory.updateSpreadExpression` or the factory supplied by your transformation context instead. */
    const updateSpread: typeof factory.updateSpreadElement;
    /** @deprecated Use `factory.createOmittedExpression` or the factory supplied by your transformation context instead. */
    const createOmittedExpression: typeof factory.createOmittedExpression;
    /** @deprecated Use `factory.createAsExpression` or the factory supplied by your transformation context instead. */
    const createAsExpression: typeof factory.createAsExpression;
    /** @deprecated Use `factory.updateAsExpression` or the factory supplied by your transformation context instead. */
    const updateAsExpression: typeof factory.updateAsExpression;
    /** @deprecated Use `factory.createNonNullExpression` or the factory supplied by your transformation context instead. */
    const createNonNullExpression: typeof factory.createNonNullExpression;
    /** @deprecated Use `factory.updateNonNullExpression` or the factory supplied by your transformation context instead. */
    const updateNonNullExpression: typeof factory.updateNonNullExpression;
    /** @deprecated Use `factory.createNonNullChain` or the factory supplied by your transformation context instead. */
    const createNonNullChain: typeof factory.createNonNullChain;
    /** @deprecated Use `factory.updateNonNullChain` or the factory supplied by your transformation context instead. */
    const updateNonNullChain: typeof factory.updateNonNullChain;
    /** @deprecated Use `factory.createMetaProperty` or the factory supplied by your transformation context instead. */
    const createMetaProperty: typeof factory.createMetaProperty;
    /** @deprecated Use `factory.updateMetaProperty` or the factory supplied by your transformation context instead. */
    const updateMetaProperty: typeof factory.updateMetaProperty;
    /** @deprecated Use `factory.createTemplateSpan` or the factory supplied by your transformation context instead. */
    const createTemplateSpan: typeof factory.createTemplateSpan;
    /** @deprecated Use `factory.updateTemplateSpan` or the factory supplied by your transformation context instead. */
    const updateTemplateSpan: typeof factory.updateTemplateSpan;
    /** @deprecated Use `factory.createSemicolonClassElement` or the factory supplied by your transformation context instead. */
    const createSemicolonClassElement: typeof factory.createSemicolonClassElement;
    /** @deprecated Use `factory.createBlock` or the factory supplied by your transformation context instead. */
    const createBlock: typeof factory.createBlock;
    /** @deprecated Use `factory.updateBlock` or the factory supplied by your transformation context instead. */
    const updateBlock: typeof factory.updateBlock;
    /** @deprecated Use `factory.createVariableStatement` or the factory supplied by your transformation context instead. */
    const createVariableStatement: typeof factory.createVariableStatement;
    /** @deprecated Use `factory.updateVariableStatement` or the factory supplied by your transformation context instead. */
    const updateVariableStatement: typeof factory.updateVariableStatement;
    /** @deprecated Use `factory.createEmptyStatement` or the factory supplied by your transformation context instead. */
    const createEmptyStatement: typeof factory.createEmptyStatement;
    /** @deprecated Use `factory.createExpressionStatement` or the factory supplied by your transformation context instead. */
    const createExpressionStatement: typeof factory.createExpressionStatement;
    /** @deprecated Use `factory.updateExpressionStatement` or the factory supplied by your transformation context instead. */
    const updateExpressionStatement: typeof factory.updateExpressionStatement;
    /** @deprecated Use `factory.createExpressionStatement` or the factory supplied by your transformation context instead. */
    const createStatement: typeof factory.createExpressionStatement;
    /** @deprecated Use `factory.updateExpressionStatement` or the factory supplied by your transformation context instead. */
    const updateStatement: typeof factory.updateExpressionStatement;
    /** @deprecated Use `factory.createIfStatement` or the factory supplied by your transformation context instead. */
    const createIf: typeof factory.createIfStatement;
    /** @deprecated Use `factory.updateIfStatement` or the factory supplied by your transformation context instead. */
    const updateIf: typeof factory.updateIfStatement;
    /** @deprecated Use `factory.createDoStatement` or the factory supplied by your transformation context instead. */
    const createDo: typeof factory.createDoStatement;
    /** @deprecated Use `factory.updateDoStatement` or the factory supplied by your transformation context instead. */
    const updateDo: typeof factory.updateDoStatement;
    /** @deprecated Use `factory.createWhileStatement` or the factory supplied by your transformation context instead. */
    const createWhile: typeof factory.createWhileStatement;
    /** @deprecated Use `factory.updateWhileStatement` or the factory supplied by your transformation context instead. */
    const updateWhile: typeof factory.updateWhileStatement;
    /** @deprecated Use `factory.createForStatement` or the factory supplied by your transformation context instead. */
    const createFor: typeof factory.createForStatement;
    /** @deprecated Use `factory.updateForStatement` or the factory supplied by your transformation context instead. */
    const updateFor: typeof factory.updateForStatement;
    /** @deprecated Use `factory.createForInStatement` or the factory supplied by your transformation context instead. */
    const createForIn: typeof factory.createForInStatement;
    /** @deprecated Use `factory.updateForInStatement` or the factory supplied by your transformation context instead. */
    const updateForIn: typeof factory.updateForInStatement;
    /** @deprecated Use `factory.createForOfStatement` or the factory supplied by your transformation context instead. */
    const createForOf: typeof factory.createForOfStatement;
    /** @deprecated Use `factory.updateForOfStatement` or the factory supplied by your transformation context instead. */
    const updateForOf: typeof factory.updateForOfStatement;
    /** @deprecated Use `factory.createContinueStatement` or the factory supplied by your transformation context instead. */
    const createContinue: typeof factory.createContinueStatement;
    /** @deprecated Use `factory.updateContinueStatement` or the factory supplied by your transformation context instead. */
    const updateContinue: typeof factory.updateContinueStatement;
    /** @deprecated Use `factory.createBreakStatement` or the factory supplied by your transformation context instead. */
    const createBreak: typeof factory.createBreakStatement;
    /** @deprecated Use `factory.updateBreakStatement` or the factory supplied by your transformation context instead. */
    const updateBreak: typeof factory.updateBreakStatement;
    /** @deprecated Use `factory.createReturnStatement` or the factory supplied by your transformation context instead. */
    const createReturn: typeof factory.createReturnStatement;
    /** @deprecated Use `factory.updateReturnStatement` or the factory supplied by your transformation context instead. */
    const updateReturn: typeof factory.updateReturnStatement;
    /** @deprecated Use `factory.createWithStatement` or the factory supplied by your transformation context instead. */
    const createWith: typeof factory.createWithStatement;
    /** @deprecated Use `factory.updateWithStatement` or the factory supplied by your transformation context instead. */
    const updateWith: typeof factory.updateWithStatement;
    /** @deprecated Use `factory.createSwitchStatement` or the factory supplied by your transformation context instead. */
    const createSwitch: typeof factory.createSwitchStatement;
    /** @deprecated Use `factory.updateSwitchStatement` or the factory supplied by your transformation context instead. */
    const updateSwitch: typeof factory.updateSwitchStatement;
    /** @deprecated Use `factory.createLabelStatement` or the factory supplied by your transformation context instead. */
    const createLabel: typeof factory.createLabeledStatement;
    /** @deprecated Use `factory.updateLabelStatement` or the factory supplied by your transformation context instead. */
    const updateLabel: typeof factory.updateLabeledStatement;
    /** @deprecated Use `factory.createThrowStatement` or the factory supplied by your transformation context instead. */
    const createThrow: typeof factory.createThrowStatement;
    /** @deprecated Use `factory.updateThrowStatement` or the factory supplied by your transformation context instead. */
    const updateThrow: typeof factory.updateThrowStatement;
    /** @deprecated Use `factory.createTryStatement` or the factory supplied by your transformation context instead. */
    const createTry: typeof factory.createTryStatement;
    /** @deprecated Use `factory.updateTryStatement` or the factory supplied by your transformation context instead. */
    const updateTry: typeof factory.updateTryStatement;
    /** @deprecated Use `factory.createDebuggerStatement` or the factory supplied by your transformation context instead. */
    const createDebuggerStatement: typeof factory.createDebuggerStatement;
    /** @deprecated Use `factory.createVariableDeclarationList` or the factory supplied by your transformation context instead. */
    const createVariableDeclarationList: typeof factory.createVariableDeclarationList;
    /** @deprecated Use `factory.updateVariableDeclarationList` or the factory supplied by your transformation context instead. */
    const updateVariableDeclarationList: typeof factory.updateVariableDeclarationList;
    /** @deprecated Use `factory.createFunctionDeclaration` or the factory supplied by your transformation context instead. */
    const createFunctionDeclaration: typeof factory.createFunctionDeclaration;
    /** @deprecated Use `factory.updateFunctionDeclaration` or the factory supplied by your transformation context instead. */
    const updateFunctionDeclaration: typeof factory.updateFunctionDeclaration;
    /** @deprecated Use `factory.createClassDeclaration` or the factory supplied by your transformation context instead. */
    const createClassDeclaration: typeof factory.createClassDeclaration;
    /** @deprecated Use `factory.updateClassDeclaration` or the factory supplied by your transformation context instead. */
    const updateClassDeclaration: typeof factory.updateClassDeclaration;
    /** @deprecated Use `factory.createInterfaceDeclaration` or the factory supplied by your transformation context instead. */
    const createInterfaceDeclaration: typeof factory.createInterfaceDeclaration;
    /** @deprecated Use `factory.updateInterfaceDeclaration` or the factory supplied by your transformation context instead. */
    const updateInterfaceDeclaration: typeof factory.updateInterfaceDeclaration;
    /** @deprecated Use `factory.createTypeAliasDeclaration` or the factory supplied by your transformation context instead. */
    const createTypeAliasDeclaration: typeof factory.createTypeAliasDeclaration;
    /** @deprecated Use `factory.updateTypeAliasDeclaration` or the factory supplied by your transformation context instead. */
    const updateTypeAliasDeclaration: typeof factory.updateTypeAliasDeclaration;
    /** @deprecated Use `factory.createEnumDeclaration` or the factory supplied by your transformation context instead. */
    const createEnumDeclaration: typeof factory.createEnumDeclaration;
    /** @deprecated Use `factory.updateEnumDeclaration` or the factory supplied by your transformation context instead. */
    const updateEnumDeclaration: typeof factory.updateEnumDeclaration;
    /** @deprecated Use `factory.createModuleDeclaration` or the factory supplied by your transformation context instead. */
    const createModuleDeclaration: typeof factory.createModuleDeclaration;
    /** @deprecated Use `factory.updateModuleDeclaration` or the factory supplied by your transformation context instead. */
    const updateModuleDeclaration: typeof factory.updateModuleDeclaration;
    /** @deprecated Use `factory.createModuleBlock` or the factory supplied by your transformation context instead. */
    const createModuleBlock: typeof factory.createModuleBlock;
    /** @deprecated Use `factory.updateModuleBlock` or the factory supplied by your transformation context instead. */
    const updateModuleBlock: typeof factory.updateModuleBlock;
    /** @deprecated Use `factory.createCaseBlock` or the factory supplied by your transformation context instead. */
    const createCaseBlock: typeof factory.createCaseBlock;
    /** @deprecated Use `factory.updateCaseBlock` or the factory supplied by your transformation context instead. */
    const updateCaseBlock: typeof factory.updateCaseBlock;
    /** @deprecated Use `factory.createNamespaceExportDeclaration` or the factory supplied by your transformation context instead. */
    const createNamespaceExportDeclaration: typeof factory.createNamespaceExportDeclaration;
    /** @deprecated Use `factory.updateNamespaceExportDeclaration` or the factory supplied by your transformation context instead. */
    const updateNamespaceExportDeclaration: typeof factory.updateNamespaceExportDeclaration;
    /** @deprecated Use `factory.createImportEqualsDeclaration` or the factory supplied by your transformation context instead. */
    const createImportEqualsDeclaration: typeof factory.createImportEqualsDeclaration;
    /** @deprecated Use `factory.updateImportEqualsDeclaration` or the factory supplied by your transformation context instead. */
    const updateImportEqualsDeclaration: typeof factory.updateImportEqualsDeclaration;
    /** @deprecated Use `factory.createImportDeclaration` or the factory supplied by your transformation context instead. */
    const createImportDeclaration: typeof factory.createImportDeclaration;
    /** @deprecated Use `factory.updateImportDeclaration` or the factory supplied by your transformation context instead. */
    const updateImportDeclaration: typeof factory.updateImportDeclaration;
    /** @deprecated Use `factory.createNamespaceImport` or the factory supplied by your transformation context instead. */
    const createNamespaceImport: typeof factory.createNamespaceImport;
    /** @deprecated Use `factory.updateNamespaceImport` or the factory supplied by your transformation context instead. */
    const updateNamespaceImport: typeof factory.updateNamespaceImport;
    /** @deprecated Use `factory.createNamedImports` or the factory supplied by your transformation context instead. */
    const createNamedImports: typeof factory.createNamedImports;
    /** @deprecated Use `factory.updateNamedImports` or the factory supplied by your transformation context instead. */
    const updateNamedImports: typeof factory.updateNamedImports;
    /** @deprecated Use `factory.createImportSpecifier` or the factory supplied by your transformation context instead. */
    const createImportSpecifier: typeof factory.createImportSpecifier;
    /** @deprecated Use `factory.updateImportSpecifier` or the factory supplied by your transformation context instead. */
    const updateImportSpecifier: typeof factory.updateImportSpecifier;
    /** @deprecated Use `factory.createExportAssignment` or the factory supplied by your transformation context instead. */
    const createExportAssignment: typeof factory.createExportAssignment;
    /** @deprecated Use `factory.updateExportAssignment` or the factory supplied by your transformation context instead. */
    const updateExportAssignment: typeof factory.updateExportAssignment;
    /** @deprecated Use `factory.createNamedExports` or the factory supplied by your transformation context instead. */
    const createNamedExports: typeof factory.createNamedExports;
    /** @deprecated Use `factory.updateNamedExports` or the factory supplied by your transformation context instead. */
    const updateNamedExports: typeof factory.updateNamedExports;
    /** @deprecated Use `factory.createExportSpecifier` or the factory supplied by your transformation context instead. */
    const createExportSpecifier: typeof factory.createExportSpecifier;
    /** @deprecated Use `factory.updateExportSpecifier` or the factory supplied by your transformation context instead. */
    const updateExportSpecifier: typeof factory.updateExportSpecifier;
    /** @deprecated Use `factory.createExternalModuleReference` or the factory supplied by your transformation context instead. */
    const createExternalModuleReference: typeof factory.createExternalModuleReference;
    /** @deprecated Use `factory.updateExternalModuleReference` or the factory supplied by your transformation context instead. */
    const updateExternalModuleReference: typeof factory.updateExternalModuleReference;
    /** @deprecated Use `factory.createJSDocTypeExpression` or the factory supplied by your transformation context instead. */
    const createJSDocTypeExpression: typeof factory.createJSDocTypeExpression;
    /** @deprecated Use `factory.createJSDocTypeTag` or the factory supplied by your transformation context instead. */
    const createJSDocTypeTag: typeof factory.createJSDocTypeTag;
    /** @deprecated Use `factory.createJSDocReturnTag` or the factory supplied by your transformation context instead. */
    const createJSDocReturnTag: typeof factory.createJSDocReturnTag;
    /** @deprecated Use `factory.createJSDocThisTag` or the factory supplied by your transformation context instead. */
    const createJSDocThisTag: typeof factory.createJSDocThisTag;
    /** @deprecated Use `factory.createJSDocComment` or the factory supplied by your transformation context instead. */
    const createJSDocComment: typeof factory.createJSDocComment;
    /** @deprecated Use `factory.createJSDocParameterTag` or the factory supplied by your transformation context instead. */
    const createJSDocParameterTag: typeof factory.createJSDocParameterTag;
    /** @deprecated Use `factory.createJSDocClassTag` or the factory supplied by your transformation context instead. */
    const createJSDocClassTag: typeof factory.createJSDocClassTag;
    /** @deprecated Use `factory.createJSDocAugmentsTag` or the factory supplied by your transformation context instead. */
    const createJSDocAugmentsTag: typeof factory.createJSDocAugmentsTag;
    /** @deprecated Use `factory.createJSDocEnumTag` or the factory supplied by your transformation context instead. */
    const createJSDocEnumTag: typeof factory.createJSDocEnumTag;
    /** @deprecated Use `factory.createJSDocTemplateTag` or the factory supplied by your transformation context instead. */
    const createJSDocTemplateTag: typeof factory.createJSDocTemplateTag;
    /** @deprecated Use `factory.createJSDocTypedefTag` or the factory supplied by your transformation context instead. */
    const createJSDocTypedefTag: typeof factory.createJSDocTypedefTag;
    /** @deprecated Use `factory.createJSDocCallbackTag` or the factory supplied by your transformation context instead. */
    const createJSDocCallbackTag: typeof factory.createJSDocCallbackTag;
    /** @deprecated Use `factory.createJSDocSignature` or the factory supplied by your transformation context instead. */
    const createJSDocSignature: typeof factory.createJSDocSignature;
    /** @deprecated Use `factory.createJSDocPropertyTag` or the factory supplied by your transformation context instead. */
    const createJSDocPropertyTag: typeof factory.createJSDocPropertyTag;
    /** @deprecated Use `factory.createJSDocTypeLiteral` or the factory supplied by your transformation context instead. */
    const createJSDocTypeLiteral: typeof factory.createJSDocTypeLiteral;
    /** @deprecated Use `factory.createJSDocImplementsTag` or the factory supplied by your transformation context instead. */
    const createJSDocImplementsTag: typeof factory.createJSDocImplementsTag;
    /** @deprecated Use `factory.createJSDocAuthorTag` or the factory supplied by your transformation context instead. */
    const createJSDocAuthorTag: typeof factory.createJSDocAuthorTag;
    /** @deprecated Use `factory.createJSDocPublicTag` or the factory supplied by your transformation context instead. */
    const createJSDocPublicTag: typeof factory.createJSDocPublicTag;
    /** @deprecated Use `factory.createJSDocPrivateTag` or the factory supplied by your transformation context instead. */
    const createJSDocPrivateTag: typeof factory.createJSDocPrivateTag;
    /** @deprecated Use `factory.createJSDocProtectedTag` or the factory supplied by your transformation context instead. */
    const createJSDocProtectedTag: typeof factory.createJSDocProtectedTag;
    /** @deprecated Use `factory.createJSDocReadonlyTag` or the factory supplied by your transformation context instead. */
    const createJSDocReadonlyTag: typeof factory.createJSDocReadonlyTag;
    /** @deprecated Use `factory.createJSDocUnknownTag` or the factory supplied by your transformation context instead. */
    const createJSDocTag: typeof factory.createJSDocUnknownTag;
    /** @deprecated Use `factory.createJsxElement` or the factory supplied by your transformation context instead. */
    const createJsxElement: typeof factory.createJsxElement;
    /** @deprecated Use `factory.updateJsxElement` or the factory supplied by your transformation context instead. */
    const updateJsxElement: typeof factory.updateJsxElement;
    /** @deprecated Use `factory.createJsxSelfClosingElement` or the factory supplied by your transformation context instead. */
    const createJsxSelfClosingElement: typeof factory.createJsxSelfClosingElement;
    /** @deprecated Use `factory.updateJsxSelfClosingElement` or the factory supplied by your transformation context instead. */
    const updateJsxSelfClosingElement: typeof factory.updateJsxSelfClosingElement;
    /** @deprecated Use `factory.createJsxOpeningElement` or the factory supplied by your transformation context instead. */
    const createJsxOpeningElement: typeof factory.createJsxOpeningElement;
    /** @deprecated Use `factory.updateJsxOpeningElement` or the factory supplied by your transformation context instead. */
    const updateJsxOpeningElement: typeof factory.updateJsxOpeningElement;
    /** @deprecated Use `factory.createJsxClosingElement` or the factory supplied by your transformation context instead. */
    const createJsxClosingElement: typeof factory.createJsxClosingElement;
    /** @deprecated Use `factory.updateJsxClosingElement` or the factory supplied by your transformation context instead. */
    const updateJsxClosingElement: typeof factory.updateJsxClosingElement;
    /** @deprecated Use `factory.createJsxFragment` or the factory supplied by your transformation context instead. */
    const createJsxFragment: typeof factory.createJsxFragment;
    /** @deprecated Use `factory.createJsxText` or the factory supplied by your transformation context instead. */
    const createJsxText: typeof factory.createJsxText;
    /** @deprecated Use `factory.updateJsxText` or the factory supplied by your transformation context instead. */
    const updateJsxText: typeof factory.updateJsxText;
    /** @deprecated Use `factory.createJsxOpeningFragment` or the factory supplied by your transformation context instead. */
    const createJsxOpeningFragment: typeof factory.createJsxOpeningFragment;
    /** @deprecated Use `factory.createJsxJsxClosingFragment` or the factory supplied by your transformation context instead. */
    const createJsxJsxClosingFragment: typeof factory.createJsxJsxClosingFragment;
    /** @deprecated Use `factory.updateJsxFragment` or the factory supplied by your transformation context instead. */
    const updateJsxFragment: typeof factory.updateJsxFragment;
    /** @deprecated Use `factory.createJsxAttribute` or the factory supplied by your transformation context instead. */
    const createJsxAttribute: typeof factory.createJsxAttribute;
    /** @deprecated Use `factory.updateJsxAttribute` or the factory supplied by your transformation context instead. */
    const updateJsxAttribute: typeof factory.updateJsxAttribute;
    /** @deprecated Use `factory.createJsxAttributes` or the factory supplied by your transformation context instead. */
    const createJsxAttributes: typeof factory.createJsxAttributes;
    /** @deprecated Use `factory.updateJsxAttributes` or the factory supplied by your transformation context instead. */
    const updateJsxAttributes: typeof factory.updateJsxAttributes;
    /** @deprecated Use `factory.createJsxSpreadAttribute` or the factory supplied by your transformation context instead. */
    const createJsxSpreadAttribute: typeof factory.createJsxSpreadAttribute;
    /** @deprecated Use `factory.updateJsxSpreadAttribute` or the factory supplied by your transformation context instead. */
    const updateJsxSpreadAttribute: typeof factory.updateJsxSpreadAttribute;
    /** @deprecated Use `factory.createJsxExpression` or the factory supplied by your transformation context instead. */
    const createJsxExpression: typeof factory.createJsxExpression;
    /** @deprecated Use `factory.updateJsxExpression` or the factory supplied by your transformation context instead. */
    const updateJsxExpression: typeof factory.updateJsxExpression;
    /** @deprecated Use `factory.createCaseClause` or the factory supplied by your transformation context instead. */
    const createCaseClause: typeof factory.createCaseClause;
    /** @deprecated Use `factory.updateCaseClause` or the factory supplied by your transformation context instead. */
    const updateCaseClause: typeof factory.updateCaseClause;
    /** @deprecated Use `factory.createDefaultClause` or the factory supplied by your transformation context instead. */
    const createDefaultClause: typeof factory.createDefaultClause;
    /** @deprecated Use `factory.updateDefaultClause` or the factory supplied by your transformation context instead. */
    const updateDefaultClause: typeof factory.updateDefaultClause;
    /** @deprecated Use `factory.createHeritageClause` or the factory supplied by your transformation context instead. */
    const createHeritageClause: typeof factory.createHeritageClause;
    /** @deprecated Use `factory.updateHeritageClause` or the factory supplied by your transformation context instead. */
    const updateHeritageClause: typeof factory.updateHeritageClause;
    /** @deprecated Use `factory.createCatchClause` or the factory supplied by your transformation context instead. */
    const createCatchClause: typeof factory.createCatchClause;
    /** @deprecated Use `factory.updateCatchClause` or the factory supplied by your transformation context instead. */
    const updateCatchClause: typeof factory.updateCatchClause;
    /** @deprecated Use `factory.createPropertyAssignment` or the factory supplied by your transformation context instead. */
    const createPropertyAssignment: typeof factory.createPropertyAssignment;
    /** @deprecated Use `factory.updatePropertyAssignment` or the factory supplied by your transformation context instead. */
    const updatePropertyAssignment: typeof factory.updatePropertyAssignment;
    /** @deprecated Use `factory.createShorthandPropertyAssignment` or the factory supplied by your transformation context instead. */
    const createShorthandPropertyAssignment: typeof factory.createShorthandPropertyAssignment;
    /** @deprecated Use `factory.updateShorthandPropertyAssignment` or the factory supplied by your transformation context instead. */
    const updateShorthandPropertyAssignment: typeof factory.updateShorthandPropertyAssignment;
    /** @deprecated Use `factory.createSpreadAssignment` or the factory supplied by your transformation context instead. */
    const createSpreadAssignment: typeof factory.createSpreadAssignment;
    /** @deprecated Use `factory.updateSpreadAssignment` or the factory supplied by your transformation context instead. */
    const updateSpreadAssignment: typeof factory.updateSpreadAssignment;
    /** @deprecated Use `factory.createEnumMember` or the factory supplied by your transformation context instead. */
    const createEnumMember: typeof factory.createEnumMember;
    /** @deprecated Use `factory.updateEnumMember` or the factory supplied by your transformation context instead. */
    const updateEnumMember: typeof factory.updateEnumMember;
    /** @deprecated Use `factory.updateSourceFile` or the factory supplied by your transformation context instead. */
    const updateSourceFileNode: typeof factory.updateSourceFile;
    /** @deprecated Use `factory.createNotEmittedStatement` or the factory supplied by your transformation context instead. */
    const createNotEmittedStatement: typeof factory.createNotEmittedStatement;
    /** @deprecated Use `factory.createPartiallyEmittedExpression` or the factory supplied by your transformation context instead. */
    const createPartiallyEmittedExpression: typeof factory.createPartiallyEmittedExpression;
    /** @deprecated Use `factory.updatePartiallyEmittedExpression` or the factory supplied by your transformation context instead. */
    const updatePartiallyEmittedExpression: typeof factory.updatePartiallyEmittedExpression;
    /** @deprecated Use `factory.createCommaListExpression` or the factory supplied by your transformation context instead. */
    const createCommaList: typeof factory.createCommaListExpression;
    /** @deprecated Use `factory.updateCommaListExpression` or the factory supplied by your transformation context instead. */
    const updateCommaList: typeof factory.updateCommaListExpression;
    /** @deprecated Use `factory.createBundle` or the factory supplied by your transformation context instead. */
    const createBundle: typeof factory.createBundle;
    /** @deprecated Use `factory.updateBundle` or the factory supplied by your transformation context instead. */
    const updateBundle: typeof factory.updateBundle;
    /** @deprecated Use `factory.createImmediatelyInvokedFunctionExpression` or the factory supplied by your transformation context instead. */
    const createImmediatelyInvokedFunctionExpression: typeof factory.createImmediatelyInvokedFunctionExpression;
    /** @deprecated Use `factory.createImmediatelyInvokedArrowFunction` or the factory supplied by your transformation context instead. */
    const createImmediatelyInvokedArrowFunction: typeof factory.createImmediatelyInvokedArrowFunction;
    /** @deprecated Use `factory.createVoidZero` or the factory supplied by your transformation context instead. */
    const createVoidZero: typeof factory.createVoidZero;
    /** @deprecated Use `factory.createExportDefault` or the factory supplied by your transformation context instead. */
    const createExportDefault: typeof factory.createExportDefault;
    /** @deprecated Use `factory.createExternalModuleExport` or the factory supplied by your transformation context instead. */
    const createExternalModuleExport: typeof factory.createExternalModuleExport;
    /** @deprecated Use `factory.createNamespaceExport` or the factory supplied by your transformation context instead. */
    const createNamespaceExport: typeof factory.createNamespaceExport;
    /** @deprecated Use `factory.updateNamespaceExport` or the factory supplied by your transformation context instead. */
    const updateNamespaceExport: typeof factory.updateNamespaceExport;
    /** @deprecated Use `factory.createToken` or the factory supplied by your transformation context instead. */
    const createToken: <TKind extends SyntaxKind>(kind: TKind) => Token<TKind>;
    /** @deprecated Use `factory.createIdentifier` or the factory supplied by your transformation context instead. */
    const createIdentifier: (text: string) => Identifier;
    /** @deprecated Use `factory.createTempVariable` or the factory supplied by your transformation context instead. */
    const createTempVariable: (recordTempVariable: ((node: Identifier) => void) | undefined) => Identifier;
    /** @deprecated Use `factory.getGeneratedNameForNode` or the factory supplied by your transformation context instead. */
    const getGeneratedNameForNode: (node: Node | undefined) => Identifier;
    /** @deprecated Use `factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic)` or the factory supplied by your transformation context instead. */
    const createOptimisticUniqueName: (text: string) => Identifier;
    /** @deprecated Use `factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel)` or the factory supplied by your transformation context instead. */
    const createFileLevelUniqueName: (text: string) => Identifier;
    /** @deprecated Use `factory.createIndexSignature` or the factory supplied by your transformation context instead. */
    const createIndexSignature: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode) => IndexSignatureDeclaration;
    /** @deprecated Use `factory.createTypePredicateNode` or the factory supplied by your transformation context instead. */
    const createTypePredicateNode: (parameterName: Identifier | ThisTypeNode | string, type: TypeNode) => TypePredicateNode;
    /** @deprecated Use `factory.updateTypePredicateNode` or the factory supplied by your transformation context instead. */
    const updateTypePredicateNode: (node: TypePredicateNode, parameterName: Identifier | ThisTypeNode, type: TypeNode) => TypePredicateNode;
    /** @deprecated Use `factory.createStringLiteral`, `factory.createStringLiteralFromNode`, `factory.createNumericLiteral`, `factory.createBigIntLiteral`, `factory.createTrue`, `factory.createFalse`, or the factory supplied by your transformation context instead. */
    const createLiteral: {
        (value: string | StringLiteral | NoSubstitutionTemplateLiteral | NumericLiteral | Identifier): StringLiteral;
        (value: number | PseudoBigInt): NumericLiteral;
        (value: boolean): BooleanLiteral;
        (value: string | number | PseudoBigInt | boolean): PrimaryExpression;
    };
    /** @deprecated Use `factory.createMethodSignature` or the factory supplied by your transformation context instead. */
    const createMethodSignature: (typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined) => MethodSignature;
    /** @deprecated Use `factory.updateMethodSignature` or the factory supplied by your transformation context instead. */
    const updateMethodSignature: (node: MethodSignature, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined, name: PropertyName, questionToken: QuestionToken | undefined) => MethodSignature;
    /** @deprecated Use `factory.createTypeOperatorNode` or the factory supplied by your transformation context instead. */
    const createTypeOperatorNode: {
        (type: TypeNode): TypeOperatorNode;
        (operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword, type: TypeNode): TypeOperatorNode;
    };
    /** @deprecated Use `factory.createTaggedTemplate` or the factory supplied by your transformation context instead. */
    const createTaggedTemplate: {
        (tag: Expression, template: TemplateLiteral): TaggedTemplateExpression;
        (tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression;
    };
    /** @deprecated Use `factory.updateTaggedTemplate` or the factory supplied by your transformation context instead. */
    const updateTaggedTemplate: {
        (node: TaggedTemplateExpression, tag: Expression, template: TemplateLiteral): TaggedTemplateExpression;
        (node: TaggedTemplateExpression, tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression;
    };
    /** @deprecated Use `factory.updateBinary` or the factory supplied by your transformation context instead. */
    const updateBinary: (node: BinaryExpression, left: Expression, right: Expression, operator?: BinaryOperator | BinaryOperatorToken) => BinaryExpression;
    /** @deprecated Use `factory.createConditional` or the factory supplied by your transformation context instead. */
    const createConditional: {
        (condition: Expression, whenTrue: Expression, whenFalse: Expression): ConditionalExpression;
        (condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression): ConditionalExpression;
    };
    /** @deprecated Use `factory.createYield` or the factory supplied by your transformation context instead. */
    const createYield: {
        (expression?: Expression | undefined): YieldExpression;
        (asteriskToken: AsteriskToken | undefined, expression: Expression): YieldExpression;
    };
    /** @deprecated Use `factory.createClassExpression` or the factory supplied by your transformation context instead. */
    const createClassExpression: (modifiers: readonly Modifier[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]) => ClassExpression;
    /** @deprecated Use `factory.updateClassExpression` or the factory supplied by your transformation context instead. */
    const updateClassExpression: (node: ClassExpression, modifiers: readonly Modifier[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]) => ClassExpression;
    /** @deprecated Use `factory.createPropertySignature` or the factory supplied by your transformation context instead. */
    const createPropertySignature: (modifiers: readonly Modifier[] | undefined, name: PropertyName | string, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer?: Expression | undefined) => PropertySignature;
    /** @deprecated Use `factory.updatePropertySignature` or the factory supplied by your transformation context instead. */
    const updatePropertySignature: (node: PropertySignature, modifiers: readonly Modifier[] | undefined, name: PropertyName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined) => PropertySignature;
    /** @deprecated Use `factory.createExpressionWithTypeArguments` or the factory supplied by your transformation context instead. */
    const createExpressionWithTypeArguments: (typeArguments: readonly TypeNode[] | undefined, expression: Expression) => ExpressionWithTypeArguments;
    /** @deprecated Use `factory.updateExpressionWithTypeArguments` or the factory supplied by your transformation context instead. */
    const updateExpressionWithTypeArguments: (node: ExpressionWithTypeArguments, typeArguments: readonly TypeNode[] | undefined, expression: Expression) => ExpressionWithTypeArguments;
    /** @deprecated Use `factory.createArrowFunction` or the factory supplied by your transformation context instead. */
    const createArrowFunction: {
        (modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken | undefined, body: ConciseBody): ArrowFunction;
        (modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: ConciseBody): ArrowFunction;
    };
    /** @deprecated Use `factory.updateArrowFunction` or the factory supplied by your transformation context instead. */
    const updateArrowFunction: {
        (node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken, body: ConciseBody): ArrowFunction;
        (node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: ConciseBody): ArrowFunction;
    };
    /** @deprecated Use `factory.createVariableDeclaration` or the factory supplied by your transformation context instead. */
    const createVariableDeclaration: {
        (name: string | BindingName, type?: TypeNode | undefined, initializer?: Expression | undefined): VariableDeclaration;
        (name: string | BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
    };
    /** @deprecated Use `factory.updateVariableDeclaration` or the factory supplied by your transformation context instead. */
    const updateVariableDeclaration: {
        (node: VariableDeclaration, name: BindingName, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
        (node: VariableDeclaration, name: BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
    };
    /** @deprecated Use `factory.createImportClause` or the factory supplied by your transformation context instead. */
    const createImportClause: (name: Identifier | undefined, namedBindings: NamedImportBindings | undefined, isTypeOnly?: any) => ImportClause;
    /** @deprecated Use `factory.updateImportClause` or the factory supplied by your transformation context instead. */
    const updateImportClause: (node: ImportClause, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined, isTypeOnly: boolean) => ImportClause;
    /** @deprecated Use `factory.createExportDeclaration` or the factory supplied by your transformation context instead. */
    const createExportDeclaration: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, exportClause: NamedExportBindings | undefined, moduleSpecifier?: Expression | undefined, isTypeOnly?: any) => ExportDeclaration;
    /** @deprecated Use `factory.updateExportDeclaration` or the factory supplied by your transformation context instead. */
    const updateExportDeclaration: (node: ExportDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, exportClause: NamedExportBindings | undefined, moduleSpecifier: Expression | undefined, isTypeOnly: boolean) => ExportDeclaration;
    /** @deprecated Use `factory.createJSDocParameterTag` or the factory supplied by your transformation context instead. */
    const createJSDocParamTag: (name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression | undefined, comment?: string | undefined) => JSDocParameterTag;
    /** @deprecated Use `factory.createComma` or the factory supplied by your transformation context instead. */
    const createComma: (left: Expression, right: Expression) => Expression;
    /** @deprecated Use `factory.createLessThan` or the factory supplied by your transformation context instead. */
    const createLessThan: (left: Expression, right: Expression) => Expression;
    /** @deprecated Use `factory.createAssignment` or the factory supplied by your transformation context instead. */
    const createAssignment: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createStrictEquality` or the factory supplied by your transformation context instead. */
    const createStrictEquality: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createStrictInequality` or the factory supplied by your transformation context instead. */
    const createStrictInequality: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createAdd` or the factory supplied by your transformation context instead. */
    const createAdd: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createSubtract` or the factory supplied by your transformation context instead. */
    const createSubtract: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createLogicalAnd` or the factory supplied by your transformation context instead. */
    const createLogicalAnd: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createLogicalOr` or the factory supplied by your transformation context instead. */
    const createLogicalOr: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createPostfixIncrement` or the factory supplied by your transformation context instead. */
    const createPostfixIncrement: (operand: Expression) => PostfixUnaryExpression;
    /** @deprecated Use `factory.createLogicalNot` or the factory supplied by your transformation context instead. */
    const createLogicalNot: (operand: Expression) => PrefixUnaryExpression;
    /** @deprecated Use an appropriate `factory` method instead. */
    const createNode: (kind: SyntaxKind, pos?: any, end?: any) => Node;
    /**
     * Creates a shallow, memberwise clone of a node ~for mutation~ with its `pos`, `end`, and `parent` set.
     *
     * NOTE: It is unsafe to change any properties of a `Node` that relate to its AST children, as those changes won't be
     * captured with respect to transformations.
     *
     * @deprecated Use an appropriate `factory.update...` method instead, use `setCommentRange` or `setSourceMapRange`, and avoid setting `parent`.
     */
    const getMutableClone: <T extends Node>(node: T) => T;
    /** @deprecated Use `isTypeAssertionExpression` instead. */
    const isTypeAssertion: (node: Node) => node is TypeAssertion;
    /**
     * @deprecated Use `isMemberName` instead.
     */
    const isIdentifierOrPrivateIdentifier: (node: Node) => node is MemberName;
    namespace ArkTSLinter_1_0 {
        interface AutofixInfo {
            problemID: string;
            start: number;
            end: number;
        }
        interface CommandLineOptions {
            strictMode?: boolean;
            ideMode?: boolean;
            logTscErrors?: boolean;
            warningsAsErrors: boolean;
            parsedConfigFile?: ParsedCommandLine;
            inputFiles: string[];
            autofixInfo?: AutofixInfo[];
        }
        interface LintOptions {
            cmdOptions: CommandLineOptions;
            tsProgram?: Program;
            [key: string]: any;
        }
        const cookBookMsg: string[];
        const cookBookTag: string[];
        interface DiagnosticChecker {
            checkDiagnosticMessage(msgText: string | DiagnosticMessageChain): boolean;
        }
        const TYPE_0_IS_NOT_ASSIGNABLE_TO_TYPE_1_ERROR_CODE = 2322;
        const TYPE_UNKNOWN_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE: RegExp;
        const TYPE_NULL_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE: RegExp;
        const TYPE_UNDEFINED_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE: RegExp;
        const ARGUMENT_OF_TYPE_0_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_ERROR_CODE = 2345;
        const ARGUMENT_OF_TYPE_NULL_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_RE: RegExp;
        const ARGUMENT_OF_TYPE_UNDEFINED_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_RE: RegExp;
        const NO_OVERLOAD_MATCHES_THIS_CALL_ERROR_CODE = 2769;
        class LibraryTypeCallDiagnosticChecker implements DiagnosticChecker {
            inLibCall: boolean;
            diagnosticMessages: Array<DiagnosticMessageChain> | undefined;
            filteredDiagnosticMessages: DiagnosticMessageChain[];
            constructor(filteredDiagnosticMessages: DiagnosticMessageChain[]);
            configure(inLibCall: boolean, diagnosticMessages: Array<DiagnosticMessageChain>): void;
            checkMessageText(msg: string): boolean;
            checkMessageChain(chain: DiagnosticMessageChain): boolean;
            checkFilteredDiagnosticMessages(msgText: DiagnosticMessageChain | string): boolean;
            checkDiagnosticMessage(msgText: string | DiagnosticMessageChain): boolean;
        }
        function setTypeChecker(tsTypeChecker: TypeChecker): void;
        function clearTypeChecker(): void;
        function setTestMode(tsTestMode: boolean): void;
        function getStartPos(nodeOrComment: Node | CommentRange): number;
        function getEndPos(nodeOrComment: Node | CommentRange): number;
        function isAssignmentOperator(tsBinOp: BinaryOperatorToken): boolean;
        function isTypedArray(tsType: TypeNode | undefined): boolean;
        function isType(tsType: TypeNode | undefined, checkType: string): boolean;
        function entityNameToString(name: EntityName): string;
        function isNumberType(tsType: Type): boolean;
        function isBooleanType(tsType: Type): boolean;
        function isStringLikeType(tsType: Type): boolean;
        function isStringType(type: Type): boolean;
        function isPrimitiveEnumType(type: Type, primitiveType: TypeFlags): boolean;
        function isPrimitiveEnumMemberType(type: Type, primitiveType: TypeFlags): boolean;
        function unwrapParenthesizedType(tsType: TypeNode): TypeNode;
        function findParentIf(asExpr: AsExpression): IfStatement | null;
        function isDestructuringAssignmentLHS(tsExpr: ArrayLiteralExpression | ObjectLiteralExpression): boolean;
        function isEnumType(tsType: Type): boolean;
        function isEnumMemberType(tsType: Type): boolean;
        function isObjectLiteralType(tsType: Type): boolean;
        function isNumberLikeType(tsType: Type): boolean;
        function hasModifier(tsModifiers: readonly Modifier[] | undefined, tsModifierKind: number): boolean;
        function unwrapParenthesized(tsExpr: Expression): Expression;
        function followIfAliased(sym: Symbol): Symbol;
        function trueSymbolAtLocation(node: Node): Symbol | undefined;
        function clearTrueSymbolAtLocationCache(): void;
        function isTypeDeclSyntaxKind(kind: SyntaxKind): boolean;
        function symbolHasDuplicateName(symbol: Symbol, tsDeclKind: SyntaxKind): boolean;
        function isReferenceType(tsType: Type): boolean;
        function isPrimitiveType(type: Type): boolean;
        function isTypeSymbol(symbol: Symbol | undefined): boolean;
        function isGenericArrayType(tsType: Type): tsType is TypeReference;
        function isDerivedFrom(tsType: Type, checkType: CheckType): tsType is TypeReference;
        function isTypeReference(tsType: Type): tsType is TypeReference;
        function isNullType(tsTypeNode: TypeNode): boolean;
        function isThisOrSuperExpr(tsExpr: Expression): boolean;
        function isPrototypeSymbol(symbol: Symbol | undefined): boolean;
        function isFunctionSymbol(symbol: Symbol | undefined): boolean;
        function isInterfaceType(tsType: Type | undefined): boolean;
        function isAnyType(tsType: Type): tsType is TypeReference;
        function isUnknownType(tsType: Type): boolean;
        function isUnsupportedType(tsType: Type): boolean;
        function isUnsupportedUnionType(tsType: Type): boolean;
        function isFunctionOrMethod(tsSymbol: Symbol | undefined): boolean;
        function isMethodAssignment(tsSymbol: Symbol | undefined): boolean;
        function getDeclaration(tsSymbol: Symbol | undefined): Declaration | undefined;
        function isValidEnumMemberInit(tsExpr: Expression): boolean;
        function isCompileTimeExpression(tsExpr: Expression): boolean;
        function isConst(tsNode: Node): boolean;
        function isNumberConstantValue(tsExpr: EnumMember | PropertyAccessExpression | ElementAccessExpression | NumericLiteral): boolean;
        function isIntegerConstantValue(tsExpr: EnumMember | PropertyAccessExpression | ElementAccessExpression | NumericLiteral): boolean;
        function isStringConstantValue(tsExpr: EnumMember | PropertyAccessExpression | ElementAccessExpression): boolean;
        function relatedByInheritanceOrIdentical(typeA: Type, typeB: Type): boolean;
        function needToDeduceStructuralIdentity(typeFrom: Type, typeTo: Type, allowPromotion?: boolean): boolean;
        function hasPredecessor(node: Node, predicate: (node: Node) => boolean): boolean;
        function processParentTypes(parentTypes: NodeArray<ExpressionWithTypeArguments>, typeB: Type, processInterfaces: boolean): boolean;
        function processParentTypesCheck(parentTypes: NodeArray<ExpressionWithTypeArguments>, checkType: CheckType): boolean;
        function isObjectType(tsType: Type): boolean;
        function logTscDiagnostic(diagnostics: readonly Diagnostic[], log: (message: any, ...args: any[]) => void): void;
        function encodeProblemInfo(problem: ProblemInfo): string;
        function decodeAutofixInfo(info: string): AutofixInfo;
        function isCallToFunctionWithOmittedReturnType(tsExpr: Expression): boolean;
        function validateObjectLiteralType(type: Type | undefined): boolean;
        function isStructDeclarationKind(kind: SyntaxKind): boolean;
        function isStructDeclaration(node: Node): boolean;
        function isStructObjectInitializer(objectLiteral: ObjectLiteralExpression): boolean;
        function hasMethods(type: Type): boolean;
        function isExpressionAssignableToType(lhsType: Type | undefined, rhsExpr: Expression): boolean;
        function isLiteralType(type: Type): boolean;
        function validateFields(type: Type, objectLiteral: ObjectLiteralExpression): boolean;
        function isSupportedType(typeNode: TypeNode): boolean;
        function isStruct(symbol: Symbol): boolean;
        function getParentSymbolName(symbol: Symbol): string | undefined;
        function isGlobalSymbol(symbol: Symbol): boolean;
        function isSymbolAPI(symbol: Symbol): boolean;
        function isStdSymbol(symbol: Symbol): boolean;
        function isSymbolIterator(symbol: Symbol): boolean;
        function isDefaultImport(importSpec: ImportSpecifier): boolean;
        function hasAccessModifier(decl: Declaration): boolean;
        function getModifier(modifiers: readonly Modifier[] | undefined, modifierKind: SyntaxKind): Modifier | undefined;
        function getAccessModifier(modifiers: readonly Modifier[] | undefined): Modifier | undefined;
        function isStdRecordType(type: Type): boolean;
        function isStdPartialType(type: Type): boolean;
        function isStdRequiredType(type: Type): boolean;
        function isStdReadonlyType(type: Type): boolean;
        function isLibraryType(type: Type): boolean;
        function hasLibraryType(node: Node): boolean;
        function isLibrarySymbol(sym: Symbol | undefined): boolean;
        function pathContainsDirectory(targetPath: string, dir: string): boolean;
        function getScriptKind(srcFile: SourceFile): ScriptKind;
        function isStdLibraryType(type: Type): boolean;
        function isStdLibrarySymbol(sym: Symbol | undefined): boolean;
        function isIntrinsicObjectType(type: Type): boolean;
        function isDynamicType(type: Type | undefined): boolean | undefined;
        function isDynamicLiteralInitializer(expr: Expression): boolean;
        function isEsObjectType(typeNode: TypeNode): boolean;
        function isInsideBlock(node: Node): boolean;
        function isEsObjectPossiblyAllowed(typeRef: TypeReferenceNode): boolean;
        function isValueAssignableToESObject(node: Node): boolean;
        function getVariableDeclarationTypeNode(node: Node): TypeNode | undefined;
        function getSymbolDeclarationTypeNode(sym: Symbol): TypeNode | undefined;
        function hasEsObjectType(node: Node): boolean;
        function symbolHasEsObjectType(sym: Symbol): boolean;
        function isEsObjectSymbol(sym: Symbol): boolean;
        function isAnonymousType(type: Type): boolean;
        function getSymbolOfCallExpression(callExpr: CallExpression): Symbol | undefined;
        function typeIsRecursive(topType: Type, type?: Type | undefined): boolean;
        const PROPERTY_HAS_NO_INITIALIZER_ERROR_CODE = 2564;
        const NON_INITIALIZABLE_PROPERTY_DECORATORS: string[];
        const NON_INITIALIZABLE_PROPERTY_ClASS_DECORATORS: string[];
        const LIMITED_STANDARD_UTILITY_TYPES: string[];
        const ALLOWED_STD_SYMBOL_API: string[];
        enum ProblemSeverity {
            WARNING = 1,
            ERROR = 2
        }
        const ARKTS_IGNORE_DIRS: string[];
        const ARKTS_IGNORE_FILES: string[];
        enum CheckType {
            Array = 0,
            String = "String",
            Set = "Set",
            Map = "Map",
            Error = "Error"
        }
        const ES_OBJECT = "ESObject";
        const LIMITED_STD_GLOBAL_FUNC: string[];
        const LIMITED_STD_OBJECT_API: string[];
        const LIMITED_STD_REFLECT_API: string[];
        const LIMITED_STD_PROXYHANDLER_API: string[];
        const ARKUI_DECORATORS: string[];
        const FUNCTION_HAS_NO_RETURN_ERROR_CODE = 2366;
        const NON_RETURN_FUNCTION_DECORATORS: string[];
        const STANDARD_LIBRARIES: string[];
        const TYPED_ARRAYS: string[];
        enum FaultID {
            AnyType = 0,
            SymbolType = 1,
            ObjectLiteralNoContextType = 2,
            ArrayLiteralNoContextType = 3,
            ComputedPropertyName = 4,
            LiteralAsPropertyName = 5,
            TypeQuery = 6,
            RegexLiteral = 7,
            IsOperator = 8,
            DestructuringParameter = 9,
            YieldExpression = 10,
            InterfaceMerging = 11,
            EnumMerging = 12,
            InterfaceExtendsClass = 13,
            IndexMember = 14,
            WithStatement = 15,
            ThrowStatement = 16,
            IndexedAccessType = 17,
            UnknownType = 18,
            ForInStatement = 19,
            InOperator = 20,
            ImportFromPath = 21,
            FunctionExpression = 22,
            IntersectionType = 23,
            ObjectTypeLiteral = 24,
            CommaOperator = 25,
            LimitedReturnTypeInference = 26,
            LambdaWithTypeParameters = 27,
            ClassExpression = 28,
            DestructuringAssignment = 29,
            DestructuringDeclaration = 30,
            VarDeclaration = 31,
            CatchWithUnsupportedType = 32,
            DeleteOperator = 33,
            DeclWithDuplicateName = 34,
            UnaryArithmNotNumber = 35,
            ConstructorType = 36,
            ConstructorIface = 37,
            ConstructorFuncs = 38,
            CallSignature = 39,
            TypeAssertion = 40,
            PrivateIdentifier = 41,
            LocalFunction = 42,
            ConditionalType = 43,
            MappedType = 44,
            NamespaceAsObject = 45,
            ClassAsObject = 46,
            NonDeclarationInNamespace = 47,
            GeneratorFunction = 48,
            FunctionContainsThis = 49,
            PropertyAccessByIndex = 50,
            JsxElement = 51,
            EnumMemberNonConstInit = 52,
            ImplementsClass = 53,
            NoUndefinedPropAccess = 54,
            MultipleStaticBlocks = 55,
            ThisType = 56,
            IntefaceExtendDifProps = 57,
            StructuralIdentity = 58,
            DefaultImport = 59,
            ExportAssignment = 60,
            ImportAssignment = 61,
            GenericCallNoTypeArgs = 62,
            ParameterProperties = 63,
            InstanceofUnsupported = 64,
            ShorthandAmbientModuleDecl = 65,
            WildcardsInModuleName = 66,
            UMDModuleDefinition = 67,
            NewTarget = 68,
            DefiniteAssignment = 69,
            Prototype = 70,
            GlobalThis = 71,
            UtilityType = 72,
            PropertyDeclOnFunction = 73,
            FunctionApplyBindCall = 74,
            ConstAssertion = 75,
            ImportAssertion = 76,
            SpreadOperator = 77,
            LimitedStdLibApi = 78,
            ErrorSuppression = 79,
            StrictDiagnostic = 80,
            UnsupportedDecorators = 81,
            ImportAfterStatement = 82,
            EsObjectType = 83,
            LAST_ID = 84
        }
        class FaultAttributs {
            migratable?: boolean;
            warning?: boolean;
            cookBookRef: string;
        }
        const faultsAttrs: FaultAttributs[];
        function shouldAutofix(node: Node, faultID: FaultID): boolean;
        function fixLiteralAsPropertyName(node: Node): Autofix[] | undefined;
        function fixPropertyAccessByIndex(node: Node): Autofix[] | undefined;
        function fixFunctionExpression(funcExpr: FunctionExpression, params?: NodeArray<ParameterDeclaration>, retType?: TypeNode | undefined): Autofix;
        function fixReturnType(funcLikeDecl: FunctionLikeDeclaration, typeNode: TypeNode): Autofix;
        function fixCtorParameterProperties(ctorDecl: ConstructorDeclaration, paramTypes: TypeNode[]): Autofix[] | undefined;
        const AUTOFIX_ALL: AutofixInfo;
        const autofixInfo: AutofixInfo[];
        interface Autofix {
            replacementText: string;
            start: number;
            end: number;
        }
        class LinterConfig {
            static nodeDesc: string[];
            static tsSyntaxKindNames: string[];
            static initStatic(): void;
            static terminalTokens: Set<SyntaxKind>;
            static incrementOnlyTokens: ESMap<SyntaxKind, FaultID>;
        }
        interface ProblemInfo {
            line: number;
            column: number;
            start: number;
            end: number;
            type: string;
            severity: number;
            problem: string;
            suggest: string;
            rule: string;
            ruleTag: number;
            autofixable: boolean;
            autofix?: Autofix[];
        }
        class TypeScriptLinter {
            private sourceFile;
            private tscStrictDiagnostics?;
            static ideMode: boolean;
            static strictMode: boolean;
            static logTscErrors: boolean;
            static warningsAsErrors: boolean;
            static lintEtsOnly: boolean;
            static totalVisitedNodes: number;
            static nodeCounters: number[];
            static lineCounters: number[];
            static totalErrorLines: number;
            static errorLineNumbersString: string;
            static totalWarningLines: number;
            static warningLineNumbersString: string;
            static reportDiagnostics: boolean;
            static problemsInfos: ProblemInfo[];
            static filteredDiagnosticMessages: DiagnosticMessageChain[];
            static initGlobals(): void;
            static initStatic(): void;
            static tsTypeChecker: TypeChecker;
            currentErrorLine: number;
            currentWarningLine: number;
            staticBlocks: Set<string>;
            libraryTypeCallDiagnosticChecker: LibraryTypeCallDiagnosticChecker;
            skipArkTSStaticBlocksCheck: boolean;
            constructor(sourceFile: SourceFile, tsProgram: Program, tscStrictDiagnostics?: ts.Map<ts.Diagnostic[]> | undefined);
            static clearTsTypeChecker(): void;
            static clearQualifiedNameCache(): void;
            readonly handlersMap: ts.ESMap<SyntaxKind, (node: Node) => void>;
            incrementCounters(node: Node | CommentRange, faultId: number, autofixable?: boolean, autofix?: Autofix[]): void;
            visitTSNode(node: Node): void;
            private countInterfaceExtendsDifferentPropertyTypes;
            private countDeclarationsWithDuplicateName;
            private countClassMembersWithDuplicateName;
            private functionContainsThis;
            private isPrototypePropertyAccess;
            private interfaceInheritanceLint;
            private lintForInterfaceExtendsDifferentPorpertyTypes;
            private handleObjectLiteralExpression;
            private handleArrayLiteralExpression;
            private handleParameter;
            private handleEnumDeclaration;
            private handleInterfaceDeclaration;
            private handleThrowStatement;
            private handleForStatement;
            private handleForInStatement;
            private handleForOfStatement;
            private handleImportDeclaration;
            private handlePropertyAccessExpression;
            private handlePropertyAssignmentOrDeclaration;
            private filterOutDecoratorsDiagnostics;
            private checkInRange;
            private filterStrictDiagnostics;
            private handleFunctionExpression;
            private handleArrowFunction;
            private handleClassExpression;
            private handleFunctionDeclaration;
            private handleMissingReturnType;
            private hasLimitedTypeInferenceFromReturnExpr;
            private handlePrefixUnaryExpression;
            private handleBinaryExpression;
            private handleVariableDeclarationList;
            private handleVariableDeclaration;
            private handleEsObjectDelaration;
            private handleEsObjectAssignment;
            private handleCatchClause;
            private handleClassDeclaration;
            private handleModuleDeclaration;
            private handleTypeAliasDeclaration;
            private handleImportClause;
            private handleImportSpecifier;
            private handleNamespaceImport;
            private handleTypeAssertionExpression;
            private handleMethodDeclaration;
            private handleIdentifier;
            private isAllowedClassValueContext;
            private handleRestrictedValues;
            private identiferUseInValueContext;
            private isEnumPropAccess;
            private handleElementAccessExpression;
            private handleEnumMember;
            private handleExportAssignment;
            private handleCallExpression;
            private handleImportCall;
            private handleRequireCall;
            private handleGenericCallWithNoTypeArgs;
            private static listApplyBindCallApis;
            private handleFunctionApplyBindPropCall;
            private handleStructIdentAndUndefinedInArgs;
            private static LimitedApis;
            private handleStdlibAPICall;
            private findNonFilteringRangesFunctionCalls;
            private handleLibraryTypeCall;
            private handleNewExpression;
            private handleAsExpression;
            private handleTypeReference;
            private handleMetaProperty;
            private handleStructDeclaration;
            private handleSpreadOp;
            private handleConstructSignature;
            private handleComments;
            private handleExpressionWithTypeArguments;
            private handleComputedPropertyName;
            private checkErrorSuppressingAnnotation;
            private handleDecorators;
            private handleGetAccessor;
            private handleSetAccessor;
            private handleDeclarationInferredType;
            private handleDefiniteAssignmentAssertion;
            private validatedTypesSet;
            private checkAnyOrUnknownChildNode;
            private handleInferredObjectreference;
            private validateDeclInferredType;
            private handleClassStaticBlockDeclaration;
            lint(): void;
        }
        class TSCCompiledProgram {
            private diagnosticsExtractor;
            constructor(program: BuilderProgram);
            getProgram(): Program;
            getBuilderProgram(): BuilderProgram;
            getStrictDiagnostics(fileName: string): Diagnostic[];
            doAllGetDiagnostics(): void;
        }
        function translateDiag(srcFile: SourceFile, problemInfo: ProblemInfo): Diagnostic;
        function runArkTSLinter(tsBuilderProgram: BuilderProgram, srcFile?: SourceFile, buildInfoWriteFile?: WriteFileCallback, arkTSVersion?: string): Diagnostic[];
    }
    namespace ArkTSLinter_1_1 {
        interface AutofixInfo {
            problemID: string;
            start: number;
            end: number;
        }
        interface CommandLineOptions {
            strictMode?: boolean;
            ideMode?: boolean;
            logTscErrors?: boolean;
            warningsAsErrors: boolean;
            parsedConfigFile?: ParsedCommandLine;
            inputFiles: string[];
            autofixInfo?: AutofixInfo[];
        }
        interface LintOptions {
            cmdOptions: CommandLineOptions;
            tsProgram?: Program;
            [key: string]: any;
        }
        enum ProblemSeverity {
            WARNING = 1,
            ERROR = 2
        }
        const cookBookMsg: string[];
        const cookBookTag: string[];
        interface DiagnosticChecker {
            checkDiagnosticMessage(msgText: string | DiagnosticMessageChain): boolean;
        }
        const TYPE_0_IS_NOT_ASSIGNABLE_TO_TYPE_1_ERROR_CODE = 2322;
        const TYPE_UNKNOWN_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE: RegExp;
        const TYPE_NULL_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE: RegExp;
        const TYPE_UNDEFINED_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE: RegExp;
        const ARGUMENT_OF_TYPE_0_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_ERROR_CODE = 2345;
        const OBJECT_IS_POSSIBLY_UNDEFINED_ERROR_CODE = 2532;
        const ARGUMENT_OF_TYPE_NULL_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_RE: RegExp;
        const ARGUMENT_OF_TYPE_UNDEFINED_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_RE: RegExp;
        const NO_OVERLOAD_MATCHES_THIS_CALL_ERROR_CODE = 2769;
        const TYPE = "Type";
        const IS_NOT_ASSIGNABLE_TO_TYPE = "is not assignable to type";
        const ARGUMENT_OF_TYPE = "Argument of type";
        const IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE = "is not assignable to parameter of type";
        enum ErrorType {
            NO_ERROR = 0,
            UNKNOW = 1,
            NULL = 2,
            POSSIBLY_UNDEFINED = 3
        }
        class LibraryTypeCallDiagnosticChecker {
            private static _instance;
            static get instance(): LibraryTypeCallDiagnosticChecker;
            private _diagnosticErrorTypeMap;
            private constructor();
            clear(): void;
            rebuildTscDiagnostics(tscStrictDiagnostics: ESMap<string, ts.Diagnostic[]>): void;
            filterDiagnostics(tscDiagnostics: readonly ts.Diagnostic[], expr: ts.CallExpression | ts.NewExpression, isLibCall: boolean, filterHandle: (diagnositc: ts.Diagnostic, errorType: ErrorType) => void): void;
            private getErrorType;
            private static isValidErrorType;
            private static isValidDiagnosticRange;
        }
        enum FaultID {
            AnyType = 0,
            SymbolType = 1,
            ObjectLiteralNoContextType = 2,
            ArrayLiteralNoContextType = 3,
            ComputedPropertyName = 4,
            LiteralAsPropertyName = 5,
            TypeQuery = 6,
            IsOperator = 7,
            DestructuringParameter = 8,
            YieldExpression = 9,
            InterfaceMerging = 10,
            EnumMerging = 11,
            InterfaceExtendsClass = 12,
            IndexMember = 13,
            WithStatement = 14,
            ThrowStatement = 15,
            IndexedAccessType = 16,
            UnknownType = 17,
            ForInStatement = 18,
            InOperator = 19,
            FunctionExpression = 20,
            IntersectionType = 21,
            ObjectTypeLiteral = 22,
            CommaOperator = 23,
            LimitedReturnTypeInference = 24,
            ClassExpression = 25,
            DestructuringAssignment = 26,
            DestructuringDeclaration = 27,
            VarDeclaration = 28,
            CatchWithUnsupportedType = 29,
            DeleteOperator = 30,
            DeclWithDuplicateName = 31,
            UnaryArithmNotNumber = 32,
            ConstructorType = 33,
            ConstructorIface = 34,
            ConstructorFuncs = 35,
            CallSignature = 36,
            TypeAssertion = 37,
            PrivateIdentifier = 38,
            LocalFunction = 39,
            ConditionalType = 40,
            MappedType = 41,
            NamespaceAsObject = 42,
            ClassAsObject = 43,
            NonDeclarationInNamespace = 44,
            GeneratorFunction = 45,
            FunctionContainsThis = 46,
            PropertyAccessByIndex = 47,
            JsxElement = 48,
            EnumMemberNonConstInit = 49,
            ImplementsClass = 50,
            MethodReassignment = 51,
            MultipleStaticBlocks = 52,
            ThisType = 53,
            IntefaceExtendDifProps = 54,
            StructuralIdentity = 55,
            ExportAssignment = 56,
            ImportAssignment = 57,
            GenericCallNoTypeArgs = 58,
            ParameterProperties = 59,
            InstanceofUnsupported = 60,
            ShorthandAmbientModuleDecl = 61,
            WildcardsInModuleName = 62,
            UMDModuleDefinition = 63,
            NewTarget = 64,
            DefiniteAssignment = 65,
            Prototype = 66,
            GlobalThis = 67,
            UtilityType = 68,
            PropertyDeclOnFunction = 69,
            FunctionApplyCall = 70,
            FunctionBind = 71,
            ConstAssertion = 72,
            ImportAssertion = 73,
            SpreadOperator = 74,
            LimitedStdLibApi = 75,
            ErrorSuppression = 76,
            StrictDiagnostic = 77,
            ImportAfterStatement = 78,
            EsObjectType = 79,
            SendableClassInheritance = 80,
            SendablePropType = 81,
            SendableDefiniteAssignment = 82,
            SendableGenericTypes = 83,
            SendableCapturedVars = 84,
            SendableClassDecorator = 85,
            SendableObjectInitialization = 86,
            SendableComputedPropName = 87,
            SendableAsExpr = 88,
            SharedNoSideEffectImport = 89,
            SharedModuleExports = 90,
            SharedModuleNoWildcardExport = 91,
            NoTsImportEts = 92,
            SendableTypeInheritance = 93,
            SendableTypeExported = 94,
            NoTsReExportEts = 95,
            NoNamespaceImportEtsToTs = 96,
            NoSideEffectImportEtsToTs = 97,
            SendableExplicitFieldType = 98,
            SendableFunctionImportedVariables = 99,
            SendableFunctionDecorator = 100,
            SendableTypeAliasDecorator = 101,
            SendableTypeAliasDeclaration = 102,
            SendableFunctionAssignment = 103,
            SendableFunctionOverloadDecorator = 104,
            SendableFunctionProperty = 105,
            SendableFunctionAsExpr = 106,
            SendableDecoratorLimited = 107,
            SharedModuleExportsWarning = 108,
            SendableBetaCompatible = 109,
            SendablePropTypeWarning = 110,
            TaskpoolFunctionArg = 111,
            ObjectLiteralAmbiguity = 112,
            LAST_ID = 113
        }
        class FaultAttributes {
            cookBookRef: number;
            migratable: boolean;
            severity: ProblemSeverity;
            constructor(cookBookRef: number, migratable?: boolean, severity?: ProblemSeverity);
        }
        const faultsAttrs: FaultAttributes[];
        function setTypeChecker(tsTypeChecker: TypeChecker): void;
        function clearTypeChecker(): void;
        function setTestMode(tsTestMode: boolean): void;
        function getStartPos(nodeOrComment: Node | CommentRange): number;
        function getEndPos(nodeOrComment: Node | CommentRange): number;
        function getHighlightRange(nodeOrComment: Node | CommentRange, faultId: number): [
            number,
            number
        ];
        function getVarDeclarationHighlightRange(nodeOrComment: Node | CommentRange): [
            number,
            number
        ] | undefined;
        function getCatchWithUnsupportedTypeHighlightRange(nodeOrComment: Node | CommentRange): [
            number,
            number
        ] | undefined;
        function getForInStatementHighlightRange(nodeOrComment: Node | CommentRange): [
            number,
            number
        ] | undefined;
        function getWithStatementHighlightRange(nodeOrComment: Node | CommentRange): [
            number,
            number
        ] | undefined;
        function getDeleteOperatorHighlightRange(nodeOrComment: Node | CommentRange): [
            number,
            number
        ] | undefined;
        function getTypeQueryHighlightRange(nodeOrComment: Node | CommentRange): [
            number,
            number
        ] | undefined;
        function getInstanceofUnsupportedHighlightRange(nodeOrComment: Node | CommentRange): [
            number,
            number
        ] | undefined;
        function getConstAssertionHighlightRange(nodeOrComment: Node | CommentRange): [
            number,
            number
        ] | undefined;
        function getLimitedReturnTypeInferenceHighlightRange(nodeOrComment: Node | CommentRange): [
            number,
            number
        ] | undefined;
        function getLocalFunctionHighlightRange(nodeOrComment: Node | CommentRange): [
            number,
            number
        ] | undefined;
        function getFunctionApplyCallHighlightRange(nodeOrComment: Node | CommentRange): [
            number,
            number
        ] | undefined;
        function getDeclWithDuplicateNameHighlightRange(nodeOrComment: Node | CommentRange): [
            number,
            number
        ] | undefined;
        function getObjectLiteralNoContextTypeHighlightRange(nodeOrComment: Node | CommentRange): [
            number,
            number
        ] | undefined;
        function getClassExpressionHighlightRange(nodeOrComment: Node | CommentRange): [
            number,
            number
        ] | undefined;
        function getMultipleStaticBlocksHighlightRange(nodeOrComment: Node | CommentRange): [
            number,
            number
        ] | undefined;
        function getSendableDefiniteAssignmentHighlightRange(nodeOrComment: Node | CommentRange): [
            number,
            number
        ] | undefined;
        function getKeywordHighlightRange(nodeOrComment: Node | CommentRange, keyword: string): [
            number,
            number
        ];
        function isAssignmentOperator(tsBinOp: BinaryOperatorToken): boolean;
        function isType(tsType: TypeNode | undefined, checkType: string): boolean;
        function entityNameToString(name: EntityName): string;
        function isNumberLikeType(tsType: Type): boolean;
        function isBooleanLikeType(tsType: Type): boolean;
        function isStringLikeType(tsType: Type): boolean;
        function isStringType(tsType: Type): boolean;
        function isPrimitiveEnumMemberType(type: Type, primitiveType: TypeFlags): boolean;
        function unwrapParenthesizedType(tsType: TypeNode): TypeNode;
        function findParentIf(asExpr: AsExpression): IfStatement | null;
        function isDestructuringAssignmentLHS(tsExpr: ArrayLiteralExpression | ObjectLiteralExpression): boolean;
        function isEnumType(tsType: Type): boolean;
        function isEnum(tsSymbol: Symbol): boolean;
        function isEnumMemberType(tsType: Type): boolean;
        function isObjectLiteralType(tsType: Type): boolean;
        function hasModifier(tsModifiers: readonly Modifier[] | undefined, tsModifierKind: number): boolean;
        function unwrapParenthesized(tsExpr: Expression): Expression;
        function followIfAliased(sym: Symbol): Symbol;
        function trueSymbolAtLocation(node: Node): Symbol | undefined;
        function clearTrueSymbolAtLocationCache(): void;
        function isTypeDeclSyntaxKind(kind: SyntaxKind): boolean;
        function symbolHasDuplicateName(symbol: Symbol, tsDeclKind: SyntaxKind): boolean;
        function isReferenceType(tsType: Type): boolean;
        function isPrimitiveType(type: Type): boolean;
        function isPrimitiveLiteralType(type: Type): boolean;
        function isPurePrimitiveLiteralType(type: Type): boolean;
        function isTypeSymbol(symbol: Symbol | undefined): boolean;
        function isGenericArrayType(tsType: Type): tsType is TypeReference;
        function isReadonlyArrayType(tsType: Type): boolean;
        function isConcatArrayType(tsType: Type): boolean;
        function isArrayLikeType(tsType: Type): boolean;
        function isTypedArray(tsType: Type, allowTypeArrays: string[]): boolean;
        function isArray(tsType: Type): boolean;
        function isCollectionArrayType(tsType: Type): boolean;
        function isIndexableArray(tsType: Type): boolean;
        function isTuple(tsType: Type): boolean;
        function isOrDerivedFrom(tsType: Type, checkType: CheckType, checkedBaseTypes?: Set<Type>): boolean;
        function isTypeReference(tsType: Type): tsType is TypeReference;
        function isNullType(tsTypeNode: TypeNode): boolean;
        function isThisOrSuperExpr(tsExpr: Expression): boolean;
        function isPrototypeSymbol(symbol: Symbol | undefined): boolean;
        function isFunctionSymbol(symbol: Symbol | undefined): boolean;
        function isInterfaceType(tsType: Type | undefined): boolean;
        function isAnyType(tsType: Type): tsType is TypeReference;
        function isUnknownType(tsType: Type): boolean;
        function isUnsupportedType(tsType: Type): boolean;
        function isUnsupportedUnionType(tsType: Type): boolean;
        function isFunctionOrMethod(tsSymbol: Symbol | undefined): boolean;
        function isMethodAssignment(tsSymbol: Symbol | undefined): boolean;
        function getDeclaration(tsSymbol: Symbol | undefined): Declaration | undefined;
        function isValidEnumMemberInit(tsExpr: Expression): boolean;
        function isCompileTimeExpression(tsExpr: Expression): boolean;
        function isConst(tsNode: Node): boolean;
        function isNumberConstantValue(tsExpr: EnumMember | PropertyAccessExpression | ElementAccessExpression | NumericLiteral): boolean;
        function isIntegerConstantValue(tsExpr: EnumMember | PropertyAccessExpression | ElementAccessExpression | NumericLiteral): boolean;
        function isStringConstantValue(tsExpr: EnumMember | PropertyAccessExpression | ElementAccessExpression): boolean;
        function relatedByInheritanceOrIdentical(typeA: Type, typeB: Type): boolean;
        function reduceReference(t: Type): Type;
        function needToDeduceStructuralIdentity(lhsType: Type, rhsType: Type, rhsExpr: Expression, isStrict?: boolean): boolean;
        function needStrictMatchType(lhsType: Type, rhsType: Type): boolean;
        function hasPredecessor(node: Node, predicate: (node: Node) => boolean): boolean;
        function processParentTypes(parentTypes: NodeArray<ExpressionWithTypeArguments>, typeB: Type, processInterfaces: boolean): boolean;
        function isObject(tsType: Type): boolean;
        function logTscDiagnostic(diagnostics: readonly Diagnostic[], log: (message: any, ...args: any[]) => void): void;
        function encodeProblemInfo(problem: ProblemInfo): string;
        function decodeAutofixInfo(info: string): AutofixInfo;
        function isCallToFunctionWithOmittedReturnType(tsExpr: Expression): boolean;
        function validateObjectLiteralType(type: Type | undefined): boolean;
        function isStructDeclarationKind(kind: SyntaxKind): boolean;
        function isStructDeclaration(node: Node): boolean;
        function isStructObjectInitializer(objectLiteral: ObjectLiteralExpression): boolean;
        function hasMethods(type: Type): boolean;
        function checkTypeSet(typeSet: Type, predicate: CheckType): boolean;
        function getNonNullableType(t: Type): Type;
        function isObjectLiteralAssignable(lhsType: Type | undefined, rhsExpr: ObjectLiteralExpression): boolean;
        function isLiteralType(type: Type): boolean;
        function validateFields(objectType: Type, objectLiteral: ObjectLiteralExpression): boolean;
        function isSupportedType(typeNode: TypeNode): boolean;
        function isStruct(symbol: Symbol): boolean;
        function getParentSymbolName(symbol: Symbol): string | undefined;
        function isGlobalSymbol(symbol: Symbol): boolean;
        function isSymbolAPI(symbol: Symbol): boolean;
        function isStdSymbol(symbol: Symbol): boolean;
        function isSymbolIterator(symbol: Symbol): boolean;
        function isSymbolIteratorExpression(expr: Expression): boolean;
        function isDefaultImport(importSpec: ImportSpecifier): boolean;
        function hasAccessModifier(decl: Declaration): boolean;
        function getModifier(modifiers: readonly Modifier[] | undefined, modifierKind: SyntaxKind): Modifier | undefined;
        function getAccessModifier(modifiers: readonly Modifier[] | undefined): Modifier | undefined;
        function isStdRecordType(type: Type): boolean;
        function isStdMapType(type: Type): boolean;
        function isStdErrorType(type: Type): boolean;
        function isStdPartialType(type: Type): boolean;
        function isStdRequiredType(type: Type): boolean;
        function isStdReadonlyType(type: Type): boolean;
        function isLibraryType(type: Type): boolean;
        function hasLibraryType(node: Node): boolean;
        function isLibrarySymbol(sym: Symbol | undefined): boolean;
        function srcFilePathContainsDirectory(srcFile: SourceFile, dir: string): boolean;
        function pathContainsDirectory(targetPath: string, dir: string): boolean;
        function getScriptKind(srcFile: SourceFile): ScriptKind;
        function isStdLibraryType(type: Type): boolean;
        function isStdLibrarySymbol(sym: Symbol | undefined): boolean;
        function isIntrinsicObjectType(type: Type): boolean;
        function isOhModulesEtsSymbol(sym: Symbol | undefined): boolean;
        function isDynamicType(type: Type | undefined): boolean | undefined;
        function isObjectType(type: Type): type is ObjectType;
        function isAnonymous(type: Type): boolean;
        function isDynamicLiteralInitializer(expr: Expression): boolean;
        function isEsObjectType(typeNode: TypeNode | undefined): boolean;
        function isInsideBlock(node: Node): boolean;
        function isValueAssignableToESObject(node: Node): boolean;
        function getVariableDeclarationTypeNode(node: Node): TypeNode | undefined;
        function getSymbolDeclarationTypeNode(sym: Symbol): TypeNode | undefined;
        function hasEsObjectType(node: Node): boolean;
        function symbolHasEsObjectType(sym: Symbol): boolean;
        function isEsObjectSymbol(sym: Symbol): boolean;
        function isAnonymousType(type: Type): boolean;
        function getSymbolOfCallExpression(callExpr: CallExpression): Symbol | undefined;
        function typeIsRecursive(topType: Type, type?: Type | undefined): boolean;
        function getTypeOrTypeConstraintAtLocation(expr: Expression): Type;
        function isStdBigIntType(type: Type): boolean;
        function isStdNumberType(type: Type): boolean;
        function isStdBooleanType(type: Type): boolean;
        function isEnumStringLiteral(expr: Expression): boolean;
        function isValidComputedPropertyName(computedProperty: ComputedPropertyName, isRecordObjectInitializer?: boolean): boolean;
        function isAllowedIndexSignature(node: IndexSignatureDeclaration): boolean;
        function isArkTSCollectionsArrayLikeType(type: Type): boolean;
        function isArkTSCollectionsClassOrInterfaceDeclaration(decl: Node): boolean;
        function getDecoratorName(decorator: Decorator): string;
        function unwrapParenthesizedTypeNode(typeNode: TypeNode): TypeNode;
        function isSendableTypeNode(typeNode: TypeNode, isShared?: boolean): boolean;
        function isSendableType(type: Type): boolean;
        function isShareableType(tsType: Type): boolean;
        function isSendableClassOrInterface(type: Type): boolean;
        function typeContainsSendableClassOrInterface(type: Type): boolean;
        function typeContainsNonSendableClassOrInterface(type: Type): boolean;
        function isConstEnum(sym: Symbol | undefined): boolean;
        function isSendableUnionType(type: UnionType): boolean;
        function hasSendableDecorator(decl: ClassDeclaration | FunctionDeclaration | TypeAliasDeclaration): boolean;
        function getNonSendableDecorators(decl: ClassDeclaration | FunctionDeclaration | TypeAliasDeclaration): Decorator[] | undefined;
        function getSendableDecorator(decl: ClassDeclaration | FunctionDeclaration | TypeAliasDeclaration): Decorator | undefined;
        function getDecoratorsIfInSendableClass(declaration: HasDecorators): readonly Decorator[] | undefined;
        function isISendableInterface(type: Type): boolean;
        function isSharedModule(sourceFile: SourceFile): boolean;
        function getDeclarationNode(node: Node): Declaration | undefined;
        function isShareableEntity(node: Node): boolean;
        function isSendableClassOrInterfaceEntity(node: Node): boolean;
        function isInImportWhiteList(resolvedModule: ResolvedModuleFull): boolean;
        function hasSendableDecoratorFunctionOverload(decl: FunctionDeclaration): boolean;
        function isSendableFunction(type: Type): boolean;
        function isSendableTypeAlias(type: Type): boolean;
        function hasSendableTypeAlias(type: Type): boolean;
        function isNonSendableFunctionTypeAlias(type: Type): boolean;
        function isWrongSendableFunctionAssignment(lhsType: Type, rhsType: Type): boolean;
        function searchFileExportDecl(sourceFile: SourceFile, targetDecls?: SyntaxKind[]): Set<Node>;
        function clearUtilsGlobalvariables(): void;
        function isTaskPoolApi(exprSym: Symbol | undefined, node: Node): boolean;
        function isConcurrentFunction(type: Type): boolean;
        function hasConcurrentDecoratorFunctionOverload(decl: FunctionDeclaration): boolean;
        function hasUseConcurrentDirective(decl: FunctionDeclaration): boolean;
        function isDeclarationSymbol(sym: Symbol | undefined): boolean;
        const PROPERTY_HAS_NO_INITIALIZER_ERROR_CODE = 2564;
        const NON_INITIALIZABLE_PROPERTY_DECORATORS: string[];
        const NON_INITIALIZABLE_PROPERTY_CLASS_DECORATORS: string[];
        const LIMITED_STANDARD_UTILITY_TYPES: string[];
        const ALLOWED_STD_SYMBOL_API: string[];
        const ARKTS_IGNORE_DIRS: string[];
        const ARKTS_IGNORE_FILES: string[];
        const ARKTS_IGNORE_DIRS_OH_MODULES = "oh_modules";
        const SENDABLE_DECORATOR = "Sendable";
        const SENDABLE_INTERFACE = "ISendable";
        const PROMISE = "Promise";
        const SENDABLE_DECORATOR_NODES: SyntaxKind[];
        const SENDABLE_CLOSURE_DECLS: SyntaxKind[];
        const ARKTS_COLLECTIONS_D_ETS = "@arkts.collections.d.ets";
        const COLLECTIONS_NAMESPACE = "collections";
        const ARKTS_LANG_D_ETS = "@arkts.lang.d.ets";
        const LANG_NAMESPACE = "lang";
        const ISENDABLE_TYPE = "ISendable";
        const USE_SHARED = "use shared";
        const D_TS = ".d.ts";
        const TASKPOOL = "taskpool";
        const TASKGROUP = "TaskGroup";
        const TASKPOOL_API: string[];
        const CONCURRENT_DECORATOR = "Concurrent";
        const USE_CONCURRENT = "use concurrent";
        type CheckType = ((t: Type) => boolean);
        const ES_OBJECT = "ESObject";
        const LIMITED_STD_GLOBAL_FUNC: string[];
        const LIMITED_STD_OBJECT_API: string[];
        const LIMITED_STD_REFLECT_API: string[];
        const LIMITED_STD_PROXYHANDLER_API: string[];
        const FUNCTION_HAS_NO_RETURN_ERROR_CODE = 2366;
        const NON_RETURN_FUNCTION_DECORATORS: string[];
        const STANDARD_LIBRARIES: string[];
        const TYPED_ARRAYS: string[];
        const TYPED_COLLECTIONS: string[];
        function shouldAutofix(node: Node, faultID: FaultID): boolean;
        function fixLiteralAsPropertyName(node: Node): Autofix[] | undefined;
        function fixPropertyAccessByIndex(node: Node): Autofix[] | undefined;
        function fixFunctionExpression(funcExpr: FunctionExpression, params?: NodeArray<ParameterDeclaration>, retType?: TypeNode | undefined): Autofix;
        function fixReturnType(funcLikeDecl: FunctionLikeDeclaration, typeNode: TypeNode): Autofix;
        function fixCtorParameterProperties(ctorDecl: ConstructorDeclaration, paramTypes: TypeNode[]): Autofix[] | undefined;
        const AUTOFIX_ALL: AutofixInfo;
        const autofixInfo: AutofixInfo[];
        interface Autofix {
            replacementText: string;
            start: number;
            end: number;
        }
        class LinterConfig {
            static nodeDesc: string[];
            static tsSyntaxKindNames: string[];
            static initStatic(): void;
            static terminalTokens: Set<SyntaxKind>;
            static incrementOnlyTokens: ESMap<SyntaxKind, FaultID>;
        }
        interface ProblemInfo {
            line: number;
            column: number;
            start: number;
            end: number;
            type: string;
            severity: number;
            problem: string;
            suggest: string;
            rule: string;
            ruleTag: number;
            autofixable: boolean;
            autofix?: Autofix[];
        }
        class TypeScriptLinter {
            private sourceFile;
            private tscStrictDiagnostics?;
            static ideMode: boolean;
            static strictMode: boolean;
            static logTscErrors: boolean;
            static warningsAsErrors: boolean;
            static lintEtsOnly: boolean;
            static totalVisitedNodes: number;
            static nodeCounters: number[];
            static lineCounters: number[];
            static totalErrorLines: number;
            static errorLineNumbersString: string;
            static totalWarningLines: number;
            static warningLineNumbersString: string;
            static reportDiagnostics: boolean;
            static problemsInfos: ProblemInfo[];
            static filteredDiagnosticMessages: DiagnosticMessageChain[];
            static sharedModulesCache: ESMap<string, boolean>;
            static strictDiagnosticCache: Set<Diagnostic>;
            static unknowDiagnosticCache: Set<Diagnostic>;
            static initGlobals(): void;
            static initStatic(): void;
            static tsTypeChecker: TypeChecker;
            currentErrorLine: number;
            currentWarningLine: number;
            staticBlocks: Set<string>;
            skipArkTSStaticBlocksCheck: boolean;
            private fileExportDeclCaches?;
            private compatibleSdkVersionStage;
            private compatibleSdkVersion;
            private mixCompile;
            constructor(sourceFile: SourceFile, tsProgram: Program, tscStrictDiagnostics?: ts.Map<ts.Diagnostic[]> | undefined);
            static clearTsTypeChecker(): void;
            static clearQualifiedNameCache(): void;
            readonly handlersMap: ts.ESMap<ts.SyntaxKind, {
                handler: (node: Node) => void;
                name: string;
            }>;
            incrementCounters(node: Node | CommentRange, faultId: number, autofixable?: boolean, autofix?: Autofix[]): void;
            private forEachNodeInSubtree;
            private visitSourceFile;
            private countInterfaceExtendsDifferentPropertyTypes;
            private countDeclarationsWithDuplicateName;
            private countClassMembersWithDuplicateName;
            private static scopeContainsThis;
            private isPrototypePropertyAccess;
            private interfaceInheritanceLint;
            private lintForInterfaceExtendsDifferentPorpertyTypes;
            private handleObjectLiteralExpression;
            private handleUnionTypeObjectLiteral;
            private getSourceFileFromType;
            private handleArrayLiteralExpression;
            private handleParameter;
            private handleEnumDeclaration;
            private handleInterfaceDeclaration;
            private handleThrowStatement;
            private handleForStatement;
            private handleForInStatement;
            private handleForOfStatement;
            private handleImportDeclaration;
            private handleSharedModuleNoSideEffectImport;
            private static inSharedModule;
            private handlePropertyAccessExpression;
            private handleTaskpooApiForNewExpression;
            private handlePropertyDeclaration;
            private handleSendableClassProperty;
            private checkTypeAliasInSendableScope;
            private isNoneSendableTypeAlias;
            private handlePropertyAssignment;
            private handlePropertySignature;
            private handleSendableInterfaceProperty;
            private filterOutDecoratorsDiagnostics;
            private static isClassLikeOrIface;
            private handleFunctionExpression;
            private handleArrowFunction;
            private handleFunctionDeclaration;
            private handleMissingReturnType;
            private hasLimitedTypeInferenceFromReturnExpr;
            private checkReturnExpression;
            private isValidTypeForUnaryArithmeticOperator;
            private handlePrefixUnaryExpression;
            private handleBinaryExpression;
            private handleVariableDeclarationList;
            private handleVariableDeclaration;
            private handleEsObjectAssignment;
            private handleCatchClause;
            private handleClassDeclaration;
            private scanCapturedVarsInSendableScope;
            private checkLocalDecl;
            private checkLocalDeclWithSendableClosure;
            private checkIsTopClosure;
            private checkNamespaceImportVar;
            isFileExportDecl(decl: Declaration): boolean;
            private checkClassDeclarationHeritageClause;
            private isValidSendableClassExtends;
            private checkSendableTypeParameter;
            private processClassStaticBlocks;
            private handleModuleDeclaration;
            private handleTypeAliasDeclaration;
            private handleImportClause;
            private handleImportSpecifier;
            private handleNamespaceImport;
            private handleTypeAssertionExpression;
            private handleMethodDeclaration;
            private handleMethodSignature;
            private handleIdentifier;
            private isAllowedClassValueContext;
            private handleRestrictedValues;
            private identiferUseInValueContext;
            private isEnumPropAccess;
            private isElementAcessAllowed;
            private handleElementAccessExpression;
            private handleEnumMember;
            private handleExportAssignment;
            private handleCallExpression;
            private handleTaskpoolApiForCallExpression;
            private handleEtsComponentExpression;
            private handleImportCall;
            private handleRequireCall;
            private handleGenericCallWithNoTypeArgs;
            private static readonly listFunctionApplyCallApis;
            private static readonly listFunctionBindApis;
            private handleFunctionApplyBindPropCall;
            private handleStructIdentAndUndefinedInArgs;
            private static LimitedApis;
            private handleStdlibAPICall;
            private handleLibraryTypeCall;
            private handleNewExpression;
            private handleSendableGenericTypes;
            private handleAsExpression;
            isEsObjectPossiblyAllowed(typeRef: TypeReferenceNode): boolean;
            isObjectLiteralFromFunc(node: Node, isPromise?: boolean): boolean;
            private handleTypeReference;
            private checkSendableTypeArguments;
            private handleMetaProperty;
            private handleSpreadOp;
            private handleConstructSignature;
            private handleExpressionWithTypeArguments;
            private handleComputedPropertyName;
            private isSendableCompPropName;
            private handleGetAccessor;
            private handleSetAccessor;
            private handleDeclarationInferredType;
            private handleDefiniteAssignmentAssertion;
            private validatedTypesSet;
            private checkAnyOrUnknownChildNode;
            private handleInferredObjectreference;
            private validateDeclInferredType;
            private processNoCheckEntry;
            private reportThisKeywordsInScope;
            private handleCommentDirectives;
            private handleClassStaticBlockDeclaration;
            private handleIndexSignature;
            lint(): void;
            private handleExportKeyword;
            private handleExportDeclaration;
            private handleReturnStatement;
            /**
            * 'arkts-no-structural-typing' check was missing in some scenarios,
            * in order not to cause incompatibility,
            * only need to strictly match the type of filling the check again
            */
            private checkAssignmentMatching;
            private handleDecorator;
            private isSendableDecoratorValid;
        }
        interface KitSymbol {
            source: string;
            bindings: string;
        }
        type KitSymbols = Record<string, KitSymbol>;
        interface KitInfo {
            symbols?: KitSymbols;
        }
        class InteropTypescriptLinter {
            private sourceFile;
            private isInSdk;
            static strictMode: boolean;
            static totalVisitedNodes: number;
            static nodeCounters: number[];
            static lineCounters: number[];
            static totalErrorLines: number;
            static errorLineNumbersString: string;
            static totalWarningLines: number;
            static warningLineNumbersString: string;
            static reportDiagnostics: boolean;
            static problemsInfos: ProblemInfo[];
            static initGlobals(): void;
            static initStatic(): void;
            static tsTypeChecker: TypeChecker;
            static etsLoaderPath?: string;
            static kitInfos: Map<KitInfo>;
            private KIT;
            private D_TS;
            private D_ETS;
            private ETS;
            private SDK_PATH;
            currentErrorLine: number;
            currentWarningLine: number;
            constructor(sourceFile: SourceFile, tsProgram: Program, isInSdk: boolean);
            static clearTsTypeChecker(): void;
            readonly handlersMap: ts.ESMap<SyntaxKind, (node: Node) => void>;
            incrementCounters(node: Node | CommentRange, faultId: number, autofixable?: boolean, autofix?: Autofix[]): void;
            private forEachNodeInSubtree;
            private visitSourceFile;
            private handleImportDeclaration;
            private checkSendableClassorISendable;
            private checkKitImportClause;
            private checkImportClause;
            private allowInSdkImportSendable;
            private handleClassDeclaration;
            private checkClassOrInterfaceDeclarationHeritageClause;
            private handleInterfaceDeclaration;
            private handleNewExpression;
            private handleSendableGenericTypes;
            private handleObjectLiteralExpression;
            private handleArrayLiteralExpression;
            private handleAsExpression;
            private handleExportDeclaration;
            private handleExportAssignment;
            private initKitInfos;
            private getKitModuleFileNames;
            lint(): void;
        }
        class TSCCompiledProgram {
            private diagnosticsExtractor;
            constructor(program: BuilderProgram);
            getProgram(): Program;
            getBuilderProgram(): BuilderProgram;
            getStrictDiagnostics(sourceFile: SourceFile): Diagnostic[];
            doAllGetDiagnostics(): void;
        }
        function translateDiag(srcFile: SourceFile, problemInfo: ProblemInfo): Diagnostic;
        function runArkTSLinter(tsBuilderProgram: BuilderProgram, srcFile?: SourceFile, buildInfoWriteFile?: WriteFileCallback, arkTSVersion?: string): Diagnostic[];
    }
    enum TimePhase {
        START = "start",
        GET_PROGRAM = "getProgram(not ArkTSLinter)",
        UPDATE_ERROR_FILE = "updateErrorFile",
        INIT = "init",
        STRICT_PROGRAM_GET_SEMANTIC_DIAGNOSTICS = "strictProgramGetSemanticDiagnostics",
        NON_STRICT_PROGRAM_GET_SEMANTIC_DIAGNOSTICS = "nonStrictProgramGetSemanticDiagnostics",
        NON_STRICT_PROGRAM_GET_SYNTACTIC_DIAGNOSTICS = "nonStrictProgramGetSyntacticDiagnostics",
        GET_TSC_DIAGNOSTICS = "getTscDiagnostics",
        EMIT_BUILD_INFO = "emitBuildInfo",
        LINT = "lint"
    }
    class ArkTSLinterTimePrinter {
        private static instance?;
        private arkTSTimePrintSwitch;
        private timeMap;
        private constructor();
        static getInstance(): ArkTSLinterTimePrinter;
        static destroyInstance(): void;
        setArkTSTimePrintSwitch(arkTSTimePrintSwitch: boolean): void;
        appendTime(key: string): void;
        private formatMapAsTable;
        printTimes(): void;
    }
}
export = ts;