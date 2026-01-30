
// ============================================
// LOCALSTORAGE FUNCTIONS - Step by Step Guide
// ============================================

// STEP 1: Save all form data to browser's localStorage
// This function is called every time user types in any field
function saveToLocalStorage() {
    // Create an object to hold all form data
    const data = {
        name: document.getElementById('name').value,           // Get name field value
        designation: document.getElementById('dsg').value,     // Get designation field value
        email: document.getElementById('email').value,         // Get email field value
        profile_summary: document.getElementById('summary').value,
        phone: document.getElementById('phone').value,         // Get phone field value
        skills: document.getElementById('skills').value,       // Get skills field value
        experiences: [],                                       // Array to store work experiences
        education: [],                                         // Array to store education
        certifications: []                                     // Array to store certifications
    };
   
    // Collect all work experience entries from the page
    const expTitles = document.getElementsByClassName('job-title');
    const expCompanies = document.getElementsByClassName('company');
    const expStarts = document.getElementsByClassName('start-date');
    const expEnds = document.getElementsByClassName('end-date');
    const expDescs = document.getElementsByClassName('job-desc');
   
    // Loop through each experience block and save all fields
    for (let i = 0; i < expTitles.length; i++) {
        data.experiences.push({
            title: expTitles[i].value,
            company: expCompanies[i].value,
            startDate: expStarts[i].value,
            endDate: expEnds[i].value,
            description: expDescs[i].value
        });
    }
   
    // Collect all education entries
    const eduDegrees = document.getElementsByClassName('degree');
    const eduSchools = document.getElementsByClassName('school');
    const eduYears = document.getElementsByClassName('edu-year');
   
    for (let i = 0; i < eduDegrees.length; i++) {
        data.education.push({
            degree: eduDegrees[i].value,
            school: eduSchools[i].value,
            year: eduYears[i].value
        });
    }
   
    // Collect all certification entries
    const certNames = document.getElementsByClassName('cert-name');
    const certIssuers = document.getElementsByClassName('cert-issuer');
    const certYears = document.getElementsByClassName('cert-year');
   
    for (let i = 0; i < certNames.length; i++) {
        data.certifications.push({
            name: certNames[i].value,
            issuer: certIssuers[i].value,
            year: certYears[i].value
        });
    }
   
    // Convert JavaScript object to JSON string and save to localStorage
    // localStorage can only store strings, so we use JSON.stringify()
    localStorage.setItem('resumeData', JSON.stringify(data));
}

// STEP 2: Load saved data from localStorage when page loads
function loadFromLocalStorage() {
    // Try to get saved data from localStorage using the key 'resumeData'
    const savedData = localStorage.getItem('resumeData');
   
    // If no data is saved, exit the function (nothing to load)
    if (!savedData) return;
   
    // Convert JSON string back to JavaScript object
    const data = JSON.parse(savedData);
   
    // Fill in the basic form fields with saved values
    document.getElementById('name').value = data.name || '';
    document.getElementById('dsg').value = data.designation || '';
    document.getElementById('email').value = data.email || '';
    document.getElementById('summary').value = data.profile_summary || '';
    document.getElementById('phone').value = data.phone || '';
    document.getElementById('skills').value = data.skills || '';
   
    // Restore work experiences
    const expContainer = document.getElementById('experience-container');
    expContainer.innerHTML = '<h3>Projects</h3>';
   
    if (data.experiences && data.experiences.length > 0) {
        data.experiences.forEach((exp) => {
            const block = document.createElement('div');
            block.className = 'exp-block';
            block.innerHTML = `
                <input type="text" class="job-title" placeholder="Job Title" value="${exp.title || ''}">
                <input type="text" class="company" placeholder="Company Name" value="${exp.company || ''}">
                <div class="date-row">
                    <input type="text" class="start-date" placeholder="Start Date (e.g. Jan 2020)" value="${exp.startDate || ''}">
                    <input type="text" class="end-date" placeholder="End Date (e.g. Dec 2022 or Present)" value="${exp.endDate || ''}">
                </div>
                <textarea class="job-desc" placeholder="Describe your responsibilities and achievements...">${exp.description || ''}</textarea>
            `;
            expContainer.appendChild(block);
        });
    } else {
        addExperience();
    }
   
    // Restore education
    const eduContainer = document.getElementById('education-container');
    eduContainer.innerHTML = '<h3>Education</h3>';
   
    if (data.education && data.education.length > 0) {
        data.education.forEach((edu) => {
            const block = document.createElement('div');
            block.className = 'edu-block';
            block.innerHTML = `
                <input type="text" class="degree" placeholder="Degree / Qualification" value="${edu.degree || ''}">
                <input type="text" class="school" placeholder="School / University" value="${edu.school || ''}">
                <input type="text" class="edu-year" placeholder="Year (e.g. 2018-2022)" value="${edu.year || ''}">
            `;
            eduContainer.appendChild(block);
        });
    } else {
        addEducation();
    }
   
    // Restore certifications
    const certContainer = document.getElementById('certification-container');
    certContainer.innerHTML = '<h3>Certifications</h3>';
   
    if (data.certifications && data.certifications.length > 0) {
        data.certifications.forEach((cert) => {
            const block = document.createElement('div');
            block.className = 'cert-block';
            block.innerHTML = `
                <input type="text" class="cert-name" placeholder="Certification Name" value="${cert.name || ''}">
                <input type="text" class="cert-issuer" placeholder="Issuing Organization" value="${cert.issuer || ''}">
                <input type="text" class="cert-year" placeholder="Year Obtained" value="${cert.year || ''}">
            `;
            certContainer.appendChild(block);
        });
    } else {
        addCertification();
    }
   
    // After loading data, attach event listeners to enable auto-save
    attachEventListeners();
}

// STEP 3: Clear all saved data from localStorage
function clearData() {
    // Ask user for confirmation before deleting
    if (confirm('Are you sure you want to clear all saved data?')) {
        localStorage.removeItem('resumeData');  // Delete the saved data
        location.reload();                       // Refresh the page to show empty form
    }
}

// STEP 4: Attach auto-save listeners to all input fields
// This makes the form save automatically every time user types
function attachEventListeners() {
    // Attach 'input' event listeners to basic fields
    document.getElementById('name').addEventListener('input', saveToLocalStorage);
    document.getElementById('dsg').addEventListener('input', saveToLocalStorage);
    document.getElementById('email').addEventListener('input', saveToLocalStorage);
    document.getElementById('summary').addEventListener('input', saveToLocalStorage);
    document.getElementById('phone').addEventListener('input', saveToLocalStorage);
    document.getElementById('skills').addEventListener('input', saveToLocalStorage);
   
    // Attach listeners to all experience fields
    const expInputs = document.querySelectorAll('.job-title, .company, .start-date, .end-date, .job-desc');
    expInputs.forEach(input => input.addEventListener('input', saveToLocalStorage));
   
    // Attach listeners to all education fields
    const eduInputs = document.querySelectorAll('.degree, .school, .edu-year');
    eduInputs.forEach(input => input.addEventListener('input', saveToLocalStorage));
   
    // Attach listeners to all certification fields
    const certInputs = document.querySelectorAll('.cert-name, .cert-issuer, .cert-year');
    certInputs.forEach(input => input.addEventListener('input', saveToLocalStorage));
}

// STEP 5: Initialize localStorage when page loads
// DOMContentLoaded fires when HTML is fully loaded
window.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();      // Load any saved data first
    attachEventListeners();      // Then attach auto-save listeners
});

// ============================================
// ADD NEW SECTIONS FUNCTIONS
// ============================================

// Function to add new experience input fields
function addExperience() {
    const container = document.getElementById('experience-container');
    const newBlock = document.createElement('div');
    newBlock.className = 'exp-block';
    newBlock.innerHTML = `
        <input type="text" class="job-title" placeholder="Job Title">
        <input type="text" class="company" placeholder="Company Name">
        <div class="date-row">
            <input type="text" class="start-date" placeholder="Start Date (e.g. Jan 2020)">
            <input type="text" class="end-date" placeholder="End Date (e.g. Dec 2022 or Present)">
        </div>
        <textarea class="job-desc" placeholder="Describe your responsibilities and achievements..."></textarea>
    `;
    container.appendChild(newBlock);
   
    // Attach auto-save listeners to the newly added fields
    attachEventListeners();
    saveToLocalStorage();
}

// Function to add new education input fields
function addEducation() {
    const container = document.getElementById('education-container');
    const newBlock = document.createElement('div');
    newBlock.className = 'edu-block';
    newBlock.innerHTML = `
        <input type="text" class="degree" placeholder="Degree / Qualification">
        <input type="text" class="school" placeholder="School / University">
        <input type="text" class="edu-year" placeholder="Year (e.g. 2018-2022)">
    `;
    container.appendChild(newBlock);
   
    // Attach auto-save listeners
    attachEventListeners();
    saveToLocalStorage();
}

// Function to add new certification input fields
function addCertification() {
    const container = document.getElementById('certification-container');
    const newBlock = document.createElement('div');
    newBlock.className = 'cert-block';
    newBlock.innerHTML = `
        <input type="text" class="cert-name" placeholder="Certification Name">
        <input type="text" class="cert-issuer" placeholder="Issuing Organization">
        <input type="text" class="cert-year" placeholder="Year Obtained">
    `;
    container.appendChild(newBlock);
   
    // Attach auto-save listeners
    attachEventListeners();
    saveToLocalStorage();
}

// ============================================
// PDF GENERATION - Professional & Simple Design
// ============================================

async function generateResume() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
   
    // Collect Data
    const name = document.getElementById('name').value || "YOUR NAME";
    const designation = document.getElementById('dsg').value || "Your Designation";
    const email = document.getElementById('email').value || "email@example.com";
    const phone = document.getElementById('phone').value || "";
    const profile_summary = document.getElementById('summary').value || "";
    const skills = document.getElementById('skills').value || "Your skills here";
   
    // Professional Color Scheme
    const primaryColor = [0, 0, 0];           // Black for main text
    const accentColor = [70, 70, 70];         // Dark gray for secondary
    const lineColor = [200, 200, 200];        // Light gray for lines
   
    let currentY = 20;
   
    // === HEADER SECTION ===
    // Name - Large and Bold
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(name.toUpperCase(), 105, currentY, { align: 'center' });
    currentY += 7;
   
    // Designation - Medium size
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text(designation, 105, currentY, { align: 'center' });
    currentY += 6;
   
    // Contact Info - Small
    doc.setFontSize(10);
    const contactInfo = phone ? `${email} | ${phone}` : email;
    doc.text(contactInfo, 105, currentY, { align: 'center' });
    currentY += 3;
   
    // Separator Line
    doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
    doc.setLineWidth(0.5);
    doc.line(20, currentY, 190, currentY);
    currentY += 8;
   
    // === PROFILE SUMMARY ===
    if (profile_summary) {
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("PROFESSIONAL SUMMARY", 20, currentY);
        currentY += 6;
       
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
        const summaryLines = doc.splitTextToSize(profile_summary, 170);
        doc.text(summaryLines, 20, currentY);
        currentY += (summaryLines.length * 5) + 6;
    }
   
    // === SKILLS SECTION ===
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("SKILLS", 20, currentY);
    currentY += 6;
   
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    const skillLines = doc.splitTextToSize(skills, 170);
    doc.text(skillLines, 20, currentY);
    currentY += (skillLines.length * 5) + 6;
   
    // === WORK EXPERIENCE ===
    const expTitles = document.getElementsByClassName('job-title');
    const expCompanies = document.getElementsByClassName('company');
    const expStarts = document.getElementsByClassName('start-date');
    const expEnds = document.getElementsByClassName('end-date');
    const expDescs = document.getElementsByClassName('job-desc');
   
    if (expTitles.length > 0 && expTitles[0].value) {
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("WORK EXPERIENCE", 20, currentY);
        currentY += 6;
       
        for (let i = 0; i < expTitles.length; i++) {
            if (!expTitles[i].value) continue;
           
            // Check if we need a new page
            if (currentY > 270) {
                doc.addPage();
                currentY = 20;
            }
           
            // Job Title - Bold
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text(expTitles[i].value || "Position Title", 20, currentY);
           
            // Dates on the right
            const dateText = `${expStarts[i].value || ''} - ${expEnds[i].value || ''}`.trim();
            if (dateText !== '-') {
                doc.setFont("helvetica", "normal");
                doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
                doc.text(dateText, 190, currentY, { align: 'right' });
            }
            currentY += 5;
           
            // Company Name
            doc.setFont("helvetica", "italic");
            doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
            doc.text(expCompanies[i].value || "", 20, currentY);
            currentY += 5;
           
            // Description - Bullet points
            if (expDescs[i].value) {
                doc.setFont("helvetica", "normal");
                const descLines = doc.splitTextToSize(expDescs[i].value, 165);
                doc.text(descLines, 25, currentY);
                currentY += (descLines.length * 5) + 2;
            }
           
            currentY += 3;
        }
    }
   
    // === EDUCATION ===
    const eduDegrees = document.getElementsByClassName('degree');
    const eduSchools = document.getElementsByClassName('school');
    const eduYears = document.getElementsByClassName('edu-year');
   
    if (eduDegrees.length > 0 && eduDegrees[0].value) {
        if (currentY > 260) {
            doc.addPage();
            currentY = 20;
        }
       
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("EDUCATION", 20, currentY);
        currentY += 6;
       
        for (let i = 0; i < eduDegrees.length; i++) {
            if (!eduDegrees[i].value) continue;
           
            if (currentY > 275) {
                doc.addPage();
                currentY = 20;
            }
           
            // Degree - Bold
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text(eduDegrees[i].value || "Degree", 20, currentY);
           
            // Year on right
            if (eduYears[i].value) {
                doc.setFont("helvetica", "normal");
                doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
                doc.text(eduYears[i].value, 190, currentY, { align: 'right' });
            }
            currentY += 5;
           
            // Institution - Italic
            doc.setFont("helvetica", "italic");
            doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
            doc.text(eduSchools[i].value || "Institution", 20, currentY);
            currentY += 6;
        }
    }
   
    // === CERTIFICATIONS ===
    const certNames = document.getElementsByClassName('cert-name');
    const certIssuers = document.getElementsByClassName('cert-issuer');
    const certYears = document.getElementsByClassName('cert-year');
   
    if (certNames.length > 0 && certNames[0].value) {
        if (currentY > 260) {
            doc.addPage();
            currentY = 20;
        }
       
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("CERTIFICATIONS", 20, currentY);
        currentY += 6;
       
        for (let i = 0; i < certNames.length; i++) {
            if (!certNames[i].value) continue;
           
            if (currentY > 275) {
                doc.addPage();
                currentY = 20;
            }
           
            // Certification Name - Bold
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text(certNames[i].value || "Certification", 20, currentY);
           
            // Year on right
            if (certYears[i].value) {
                doc.setFont("helvetica", "normal");
                doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
                doc.text(certYears[i].value, 190, currentY, { align: 'right' });
            }
            currentY += 5;
           
            // Issuer - Italic
            doc.setFont("helvetica", "italic");
            doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
            doc.text(certIssuers[i].value || "Issuing Organization", 20, currentY);
            currentY += 6;
        }
    }
   
    // Save PDF
    doc.save(`${name.replace(/\s+/g, '_')}_Resume.pdf`);
}


