import * as XLSX from 'xlsx';

export interface ExportContact {
  name: string;
  company: string;
  jobTitle: string;
  email: string | null;
  phone: string | null;
  companyLocation: string;
  industryCategory: string;
  connectionDate: string;
  connectionStatus: string;
  accessLevel: string;
  notes: string;
  lastContactDate: string;
  meetingStatus: string;
}

export const exportToExcel = (
  contacts: any[],
  activeTab: string,
  activeFilters: any
): void => {
  try {
    // Show loading state
    const loadingToast = showLoadingToast();

    // Transform contacts to export format
    const exportData: ExportContact[] = contacts.map(contact => ({
      name: contact.name,
      company: contact.company,
      jobTitle: contact.title,
      email: contact.email || 'Not shared',
      phone: contact.phone || 'Not shared',
      companyLocation: getCompanyLocation(contact.company),
      industryCategory: getIndustryCategory(contact.company),
      connectionDate: formatExportDate(contact.connectedAt),
      connectionStatus: contact.hasFullAccess ? 'Full Access' : 'Limited Access',
      accessLevel: getAccessLevel(contact),
      notes: contact.notes || '',
      lastContactDate: getLastContactDate(contact),
      meetingStatus: contact.meetingScheduled ? 'Meeting Scheduled' : 'No meeting scheduled'
    }));

    // Handle empty results
    if (exportData.length === 0) {
      hideLoadingToast(loadingToast);
      showErrorToast('No contacts to export');
      return;
    }

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData, {
      header: [
        'name',
        'company', 
        'jobTitle',
        'email',
        'phone',
        'companyLocation',
        'industryCategory',
        'connectionDate',
        'connectionStatus',
        'accessLevel',
        'notes',
        'lastContactDate',
        'meetingStatus'
      ]
    });

    // Set column headers
    const headers = [
      'Name',
      'Company',
      'Job Title', 
      'Email',
      'Phone',
      'Company Location',
      'Industry Category',
      'Connection Date',
      'Connection Status',
      'Access Level',
      'Notes',
      'Last Contact Date',
      'Meeting Status'
    ];

    // Apply headers
    headers.forEach((header, index) => {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].v = header;
      }
    });

    // Auto-size columns
    const columnWidths = headers.map((header, index) => {
      const maxLength = Math.max(
        header.length,
        ...exportData.map(row => {
          const value = Object.values(row)[index];
          return value ? String(value).length : 0;
        })
      );
      return { wch: Math.min(maxLength + 2, 50) }; // Cap at 50 characters
    });
    worksheet['!cols'] = columnWidths;

    // Style the header row (bold)
    const headerRange = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = {
          font: { bold: true },
          fill: { fgColor: { rgb: 'F3F4F6' } }
        };
      }
    }

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'My Network Export');

    // Generate filename with current date (keep ISO format for system compatibility)
    const today = new Date();
    const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD format for filename
    const filename = `My_Network_Export_${dateString}.xlsx`;

    // Export file
    XLSX.writeFile(workbook, filename);

    // Hide loading and show success
    hideLoadingToast(loadingToast);
    showSuccessToast(`Exported ${exportData.length} contacts successfully!`);

  } catch (error) {
    console.error('Export failed:', error);
    showErrorToast('Export failed. Please try again.');
  }
};

// Helper functions
const getCompanyLocation = (company: string): string => {
  // Mock company locations - in real app this would come from data
  const locations: Record<string, string> = {
    'StartupX': 'San Francisco, CA',
    'Global Enterprises': 'New York, NY',
    'DataFlow Inc': 'Austin, TX',
    'GrowthCo': 'Seattle, WA',
    'InnovateLab': 'Boston, MA',
    'NextGen Systems': 'Denver, CO',
    'TechFlow Solutions': 'Chicago, IL',
    'TechCorp Solutions': 'San Francisco, CA'
  };
  return locations[company] || 'Location not available';
};

const getIndustryCategory = (company: string): string => {
  // Mock industry categories - in real app this would come from data
  const industries: Record<string, string> = {
    'StartupX': 'Technology',
    'Global Enterprises': 'Enterprise Software',
    'DataFlow Inc': 'Data Analytics',
    'GrowthCo': 'Marketing Technology',
    'InnovateLab': 'Product Development',
    'NextGen Systems': 'Cloud Computing',
    'TechFlow Solutions': 'IT Services',
    'TechCorp Solutions': 'Enterprise Solutions'
  };
  return industries[company] || 'Technology';
};

// CORRECTED: European date format (DD/MM/YYYY)
const formatExportDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const getAccessLevel = (contact: any): string => {
  if (contact.hasFullAccess) {
    return 'Lead';
  }
  return 'Connection';
};

const getLastContactDate = (contact: any): string => {
  // Mock last contact date - in real app this would come from actual data
  const lastContact = new Date(contact.connectedAt);
  lastContact.setDate(lastContact.getDate() + Math.floor(Math.random() * 7)); // Random date within a week
  return formatExportDate(lastContact.toISOString());
};

// Toast notification functions
const showLoadingToast = (): HTMLElement => {
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center';
  toast.innerHTML = `
    <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
    Preparing export...
  `;
  document.body.appendChild(toast);
  return toast;
};

const hideLoadingToast = (toast: HTMLElement): void => {
  if (toast && toast.parentNode) {
    toast.parentNode.removeChild(toast);
  }
};

const showSuccessToast = (message: string): void => {
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center';
  toast.innerHTML = `
    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
    </svg>
    ${message}
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 3000);
};

const showErrorToast = (message: string): void => {
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 right-4 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center';
  toast.innerHTML = `
    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
    </svg>
    ${message}
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 4000);
};