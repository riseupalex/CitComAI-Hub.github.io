document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    const toggleButton = document.getElementById('toggleFilters');
    const searchInput = document.getElementById('searchInput');
    const table = document.querySelector('table');

    let filtersEnabled = false;
    let isDragging = false;
    let startX;
    let buttonRect;

    function handleSearch() {
        if (filtersEnabled) return; // Don't search if filters are enabled

        const filter = searchInput.value.toLowerCase();
        const rows = table.getElementsByTagName('tr');

        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let found = false;

            for (let j = 0; j < cells.length; j++) {
                if (cells[j].textContent.toLowerCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }

            rows[i].style.display = found ? '' : 'none';
        }
    }

    function initializeFilters() {

        function updateFilterStyle(dropdown) {
            const select = dropdown.querySelector('.dropdown-select');
            const hasChecked = dropdown.querySelectorAll('input[type="checkbox"]:checked').length > 0;
            select.classList.toggle('has-filters', hasChecked);
        }

        const headers = table.querySelectorAll('th');

        headers.forEach((header, index) => {
            const columnValues = new Set();
            const rows = table.querySelectorAll('tbody tr');

            rows.forEach(row => {
                const cell = row.cells[index];
                if (cell) {
                    columnValues.add(cell.textContent.trim());
                }
            });

            const filter = document.createElement('div');
            filter.className = 'column-filter';

            const dropdownHTML = `
                <div class="filter-dropdown" data-column="${index}">
                    <div class="dropdown-select">
                        <span>Filter</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12">
                            <path d="M14 12v7.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0l-2.01-2.01a.989.989 0 0 1-.29-.83V12h-.03L4.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L14.03 12H14Z"/>
                        </svg>
                    </div>
                    <div class="dropdown-list">
                        <label class="dropdown-item select-all">
                            <input type="checkbox" class="select-all-checkbox">
                            <span>Select All</span>
                        </label>
                        <div class="dropdown-divider"></div>
                        ${Array.from(columnValues)
                    .sort()
                    .map(value => `
                                <label class="dropdown-item">
                                    <input type="checkbox" value="${value}">
                                    <span>${value}</span>
                                </label>
                            `).join('')}
                    </div>
                </div>
            `;

            filter.innerHTML = dropdownHTML;
            header.appendChild(filter);

            // Add click handlers
            const dropdown = filter.querySelector('.filter-dropdown');
            const select = dropdown.querySelector('.dropdown-select');
            const list = dropdown.querySelector('.dropdown-list');
            const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]:not(.select-all-checkbox)');
            const selectAllCheckbox = dropdown.querySelector('.select-all-checkbox');

            select.addEventListener('click', () => {
                list.classList.toggle('show');
            });

            // Handle Select All checkbox
            selectAllCheckbox.addEventListener('change', (e) => {
                checkboxes.forEach(checkbox => {
                    checkbox.checked = e.target.checked;
                });
                applyFilters();
                updateFilterStyle(dropdown);
            });

            // Update Select All when individual checkboxes change
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
                    const someChecked = Array.from(checkboxes).some(cb => cb.checked);
                    selectAllCheckbox.checked = allChecked;
                    selectAllCheckbox.indeterminate = someChecked && !allChecked;
                    applyFilters();
                    updateFilterStyle(dropdown);
                });
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target)) {
                    list.classList.remove('show');
                }
            });
        });
    }

    function applyFilters() {
        const activeFilters = {};

        document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
            const selectedValues = Array.from(dropdown.querySelectorAll('input[type="checkbox"]:checked'))
                .map(cb => cb.value);
            if (selectedValues.length > 0) {
                activeFilters[dropdown.dataset.column] = selectedValues;
            }
        });

        document.querySelectorAll('tbody tr').forEach(row => {
            let showRow = true;
            Object.entries(activeFilters).forEach(([column, values]) => {
                const cell = row.cells[column];
                if (!cell || !values.includes(cell.textContent.trim())) {
                    showRow = false;
                }
            });
            row.style.display = showRow ? '' : 'none';
        });
    }

    // Initialize filters
    initializeFilters();

    searchInput.addEventListener('keyup', handleSearch);

    // Toggle filters visibility
    toggleButton.addEventListener('click', function (e) {
        e.preventDefault();
        filtersEnabled = !filtersEnabled;
        document.body.classList.toggle('filters-enabled', filtersEnabled);
        toggleButton.classList.toggle('md-button--active');

        searchInput.disabled = filtersEnabled;
        if (filtersEnabled) {
            // Clear search when enabling filters
            searchInput.value = '';
            // Show all rows before filters take effect
            document.querySelectorAll('tbody tr').forEach(row => {
                row.style.display = '';
            });
        } else {
            // Reset all filters when disabling
            document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
                dropdown.value = ''; // Reset to default "All" option
            });
        }
        // Show all rows
        document.querySelectorAll('tbody tr').forEach(row => {
            row.style.display = '';
        });
    });

    // Add filter change listeners
    document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
        dropdown.addEventListener('change', applyFilters);
    });

    // Add drag functionality to toggle button
    toggleButton.addEventListener('mousedown', function (e) {
        isDragging = true;
        startX = e.clientX;
        buttonRect = toggleButton.getBoundingClientRect();
        toggleButton.style.transition = 'none'; // Disable transitions while dragging
    });

    document.addEventListener('mousemove', function (e) {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const threshold = buttonRect.width / 2;

        // Add visual feedback during drag
        if (Math.abs(deltaX) > threshold) {
            const newState = deltaX > 0;
            if (filtersEnabled !== newState) {
                filtersEnabled = newState;
                document.body.classList.toggle('filters-enabled', filtersEnabled);
                toggleButton.classList.toggle('md-button--active');

                // Update search and filters state
                searchInput.disabled = filtersEnabled;
                if (filtersEnabled) {
                    searchInput.value = '';
                    document.querySelectorAll('tbody tr').forEach(row => {
                        row.style.display = '';
                    });
                } else {
                    document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
                        dropdown.value = '';
                    });
                    document.querySelectorAll('tbody tr').forEach(row => {
                        row.style.display = '';
                    });
                }
            }
        }
    });

    document.addEventListener('mouseup', function () {
        if (isDragging) {
            isDragging = false;
            toggleButton.style.transition = ''; // Re-enable transitions
        }
    });

    // Add touch support
    toggleButton.addEventListener('touchstart', function (e) {
        isDragging = true;
        startX = e.touches[0].clientX;
        buttonRect = toggleButton.getBoundingClientRect();
        toggleButton.style.transition = 'none';
    });

    document.addEventListener('touchmove', function (e) {
        if (!isDragging) return;

        const deltaX = e.touches[0].clientX - startX;
        const threshold = buttonRect.width / 2;

        if (Math.abs(deltaX) > threshold) {
            const newState = deltaX > 0;
            if (filtersEnabled !== newState) {
                filtersEnabled = newState;
                document.body.classList.toggle('filters-enabled', filtersEnabled);
                toggleButton.classList.toggle('md-button--active');

                searchInput.disabled = filtersEnabled;
                if (filtersEnabled) {
                    searchInput.value = '';
                    document.querySelectorAll('tbody tr').forEach(row => {
                        row.style.display = '';
                    });
                } else {
                    document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
                        dropdown.value = '';
                    });
                    document.querySelectorAll('tbody tr').forEach(row => {
                        row.style.display = '';
                    });
                }
            }
        }
    });

    document.addEventListener('touchend', function () {
        if (isDragging) {
            isDragging = false;
            toggleButton.style.transition = '';
        }
    });
});