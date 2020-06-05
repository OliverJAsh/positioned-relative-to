chrome.devtools.panels.elements.createSidebarPane(
    'Positioned relative to',
    (sidebar) => {
        const update = () => {
            sidebar.setExpression(
                `(() => {$MAIN_SCRIPT; return window.__POSITIONED_RELATIVE_TO__();})()`,
            );
        };

        update();

        chrome.devtools.panels.elements.onSelectionChanged.addListener(update);
    },
);
