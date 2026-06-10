// Initialize all tooltips with data-tippy-content
document.addEventListener('DOMContentLoaded', function () {
    tippy('[data-tippy-content]', {
        placement: 'top-start',
        animation: 'scale',
        arrow: true,
        theme: 'transparent-theme',
        interactive: true,
        delay: [100, 200],
        duration: [250, 200],
    });
});
