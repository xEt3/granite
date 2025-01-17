let articles = {
  'creating-users-employees-departments-locations': {
    title: 'Creating Employees, Users, Departments & Locations',
    body:  `<h3><a id="Creating_Employees_0"></a>Creating Employees</h3>
<p>Using the side menu bar, navigate to the tab labeled “Employees”.  Once on the employees page, click the plus icon in the righthand menu.  From here, a single employee may be created, or a census may be uploaded.  If creating a single employee, fill in required fields, and then click the button labeled “begin onboarding”.  Fill out all sections appropriately, clicking next to continue to the next section.  On the last section, clicking the button labeled “finish onboarding” will finish the process and bring you to the newly created employee’s page.</p>
<p>If creating employees via a census upload, an existing spreadsheet can be uploaded, or a template spreadsheet can be downloaded to fill out and then upload.  Once a file has been uploaded, the data will be displayed as it was uploaded, with headers guessed to the best of Granite’s abilities.  The headers may be changed manually if they were guessed incorrectly.  To see how the uploaded employees’ records would look if saved, the dry run link can be clicked in the top right corner of the page.  If an employee’s supervisor has not already been uploaded, or is not in the same upload, a reference to the supervisor will not be made.  If an employee’s department or location has not been previously created, the department or location can be created by clicking on the exclamation point in the flagged cell.  Once all of the headers are mapped correctly and no cells are flagged, the import button will upload all employees in the census.</p>
<h3><a id="Creating_Users_Departments__Locations_5"></a>Creating Users, Departments &amp; Locations</h3>
<p>Using the side menu bar, navigate to the tab labeled “Company Anatomy”.  Once on the anatomy page, click the tab related to what is being created.  Clicking the plus icon in the top right corner of the page will start the creation process.</p>`
  },

  'onboarding-and-offboarding': {
    title: 'Onboarding & Offboarding',
    body:  `<h3><a id="Onboarding_0"></a>Onboarding</h3>
<p>Once an employee is created in Granite they are considered to be onboarding, and a link to onboard them will be visible near the top right corner of their employee page.  Once onboarding, there will be six tabs to fill out.  Clicking continue on the bottom of the page will save onboarding progress for that tab, and the onboarding process can be abandoned and returned to at will.  Personal and job related information can be entered, along with the ability to assign assets and documents.  Employee pictures can be uploaded, along with custom fields to save custom employee information.</p>
<h3><a id="Offboarding_2"></a>Offboarding</h3>
<p>The offboarding can be started on employee by clicking the wrench icon on the very right of the top menu bar.  Once an employee is in the offboarding stage, a link to start/continue the offboarding process will be visible directly to the left of the wrench icon on the right side of the menu bar.  Just like with onboarding, the offboarding process will be saved every time the next button is clicked to navigate to the next tab, and the process can be abandoned and returned to as the user desires.  Once the offboarding process is completed, the employee will be taken off the company’s billing.  Things that can be done in the offboarding process include setting up exit interview, collecting assigned assets, assigning exit documents, and reorganizing the company’s employee tree.</p>`
  },

  'recruiting-campaigns': {
    title: 'Recruiting Campaigns',
    body:  `<h3><a id="Job_Descriptions_0"></a>Job Descriptions</h3>
<p>To start a recruiting campaign, there must first be a job description to recruit for.  To create a job description, first navigate to the recruiting page by opening the side navigation menu, and clicking the recruiting label.  Once on the recruiting page, click the tab labeled “Descriptions”.  From here, click the plus button in the righthand corner and create the job description.</p>
<h3><a id="Campaign_2"></a>Campaign</h3>
<h5><a id="Setup_3"></a>Setup</h5>
<p>A campaign can be started by clicking the plus button in the righthand corner of the tab labeled “Campaigns” in the recruiting section.  Select the job description for the campaign, or quickly create one with the link to the top right, and create a name for the campaign.  Once the campaign has been created, setup can be continued by clicking the tab labeled “Continue Setup”.  During campaign setup, the campaign will save progress after the next button is clicked on any page.  Campaign setup can be abandonded and returned to as the user wishes.  Once the campaign setup is complete, the campaign will be launched, and potential applicants will have the ability to apply at the time selected during setup.</p>
<p>One of the many settings of a campaign are the campaign stages.  The default stages may be used, or custom stages may be setup up for the specific campaign.  By clicking the toggle labeled “Use custom recruiting stages”, the default stages will appear.  The stages can be dragged to reorder, stages can be removed entirely, and new stages can be added.</p>
<p>Another feature that needs setup is screening.  Screening questions can be created to grade applicants by clicking the button labeled “Applicant Scoring On/Off”.  Questions can be created for all types of user input, including freeform inputs, dropdowns, radios, checkboxes, data entries, and toggles.  Created questions can be reordered in whatever order is wanted.</p>
<h5><a id="Navigating_9"></a>Navigating</h5>
<p>Upon arrival to the campaign page, a chart of recent applicant activity can be seen.  Navigating to the “Applicants” tab will show all applicants for the campaign, with either the company’s default stages, or the custom stages created during the campaign setup.  Applicants not yet in a stage will appear at the top, and these applicants can be added to the pipeline by clicking them, and then clicking “Move Selected to Pipeline”.  Applicants can be moved through the various pipeline stages with the mouse via drag and drop, or by clicking the icon with two arrows in the top right corner of their applicant card.  The talent pool tab of the campaign will show non-rejected applicants of a closed campaign if that setting was toggled on during setup.  The EEO Reports tab will show the EEO report for the applicants of the campaign.</p>`
  },

  'employee-counseling': {
    title: 'Employee Counseling',
    body:  `<h3><a id="Starting_an_Employee_Issue_0"></a>Starting an Employee Issue</h3>
<p>Employee counseling can be seen by navigating to an employee’s page, and then by clicking on the tab labeled “Counseling”.  To add a new issue for the employee, click the plus button in the upper righthand corner.  When creating an employee issue, specific users can be excluded from seeing the issue process by selecting their name in the dropdown for that setting.</p>
<h3><a id="Issuing_Corrective_Action_2"></a>Issuing Corrective Action</h3>
<p>To issue a corrective action for an employee issue, navigate to the Counseling tab for the employee and click the button labeled “Issue a New Corrective Action”, for the appropriate issue.  Creating a formal corrective action will have more options than one that is informal.  Formal corrective actions can easily be printed for presentation with the print link in the top right corner of the corrective action’s summary page.  Corrective actions can be followed up, edited, or deleted by clicking the wrench icon to the right of the corrective action’s name.</p>`
  }
};

export { articles };
