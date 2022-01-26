const { hasUncaughtExceptionCaptureCallback } = require("process");
var XLSX = require('xlsx');

let Mec_sanity = function () {

    this.Get = function (url) {
        browser.get(url);
    };
    
    let username1 = element(by.id('username'));
    this.enterUserName = function (U) {
        username1.sendKeys(U);
    };
    let password1 = element(by.id('password'));
    this.enterPassword = function (P) {
        password1.sendKeys(P);
    };
    let login = element(by.id('kc-login'));
    this.enterLogin = function () {
        login.sendKeys(protractor.Key.ENTER);
    };
    let clickcredential = element(by.css("button span[class='mat-button-wrapper'] div img[class='avatar']"));
    this.click_credential = function () {
        clickcredential.click();
    };
    let selectrole = element(by.css("div[class='cdk-overlay-pane'] div[role='menu']")).element(by.css("div[class='mat-menu-content'] div mat-form-field"));
    this.select_role = function () {
        selectrole.click();
    };
    let searchprog = element(by.css("input[placeholder='Search For Programs...']"));
    this.search_prog = function(Prog) {
        searchprog.sendKeys(Prog);
    };
    let month = element(by.xpath("//app-mec-dashboard/div/div[1]/mat-form-field[1]/div[1]/div/div/mat-select/div/div[2]/div[@class='mat-select-arrow']"));
    this.clickmonth = function() {
        month.click();
    };
    let createplan = element(by.xpath("//span[contains(text(),'CREATE PLAN FOR ')]"));
    this.create_plan = function() {
        createplan.click();
    };
    let input = element(by.xpath("//div/div[1]/app-input-source-selection/div[1]/div[1]/div[1]/mat-form-field[1]/div[1]/div[1]/div[3]/mat-select/div[1]/div[1]/span"));
    this.inputsource = function() {
        input.click();
    };
    let savenext = element(by.xpath("//span[contains(text(),'Save & Next')]"));
    this.saveplan = function(){
        savenext.click();
    };
    let yes1 = element(by.xpath("//span[contains(text(),'YES')]"));
    this.yesplan = function(){
        yes1.click();
    };
    let manageplan = element(by.xpath("//span[contains(text(),'MANAGE PLAN FOR ')]"));
    this.manage_plan = function() {
        manageplan.click();
    };
    /*let entity1 = element(by.xpath("//div[@ref='eLabel']/span[contains(text(),'Entity (Selected Item)')]"));
    this.wu_entity1 = function(){
        return entity1;
    };*/
    let createwu = element(by.xpath("//span[contains(text(),'Create Workunit')]"));
    this.create_wu = function(){
        createwu.click();
    };
    let wuname = element(by.xpath("//input[@placeholder='Workunit Name']"));
    this.wu_name = function(WUname){
        wuname.sendKeys(WUname);
    };
    let createwubut = element(by.xpath("//button[@class='mat-flat-button mat-accent']//span[@class='mat-button-wrapper'][contains(text(),'Create')]"));
    this.createwu_but = function(){
        createwubut.click();
    };
    let wuyes = element(by.xpath("//span[contains(text(),'YES')]"));
    this.wu_yes = function(){
       wuyes.click();
    };
    let wuclosewindow = element(by.css("button[aria-label='close-mec-button'] span mat-icon"));
    this.wu_closewindow = function(){
        wuclosewindow.click();
    };
    let createtask = element(by.xpath("//span[contains(text(),'Create MEC Task')]"));
    this.create_task = function(){
        createtask.click();
    };
    let taskname = element(by.css("div input[formcontrolname='taskName']"));
    this.task_name = function(Taskname){
        taskname.sendKeys(Taskname);
    };
    let taskdesc = element(by.css("div input[formcontrolname='taskDescription']"));
    this.task_desc = function(desc){
        taskdesc.sendKeys(desc);
    };
    let milestone = element(by.css("div mat-select[formcontrolname='milestoneTask']"));
    this.mile_stone = function(){
        milestone.click();
    };
    let category = element(by.css("div mat-select[formcontrolname='taskCategory']"));
    this.category1 = function(){
        category.click();
    };
    let subcategory = element(by.css("div input[formcontrolname='taskSubCategory']"));
    this.sub_category = function(subcat){
        subcategory.sendKeys(subcat);
    };
    let criticality = element(by.css("div mat-select[formcontrolname='criticality']"));
    this.criticality1 = function(){
        criticality.click();
    };
    let inputspoc = element(by.css("div input[formcontrolname='taskInput']"));
    this.input_spoc = function(spoc){
        inputspoc.sendKeys(spoc);
    };
    let monthendtask = element(by.css("div mat-select[formcontrolname='monthEndCloseTask']"));
    this.month_endtask = function(){
        monthendtask.click();
    };
    let assigneefield = element(by.xpath("//div[@class='mat-form-field-infix']//mat-select[@formcontrolname='assignee']"));
    this.assignee = function(){
        assigneefield.click();
    };
    let ownerfield = element(by.css("div mat-select[formcontrolname='owner']"));
    this.owner = function(){
        ownerfield.click();
    };
    let approverfield = element(by.css("div mat-select[formcontrolname='approver']"));
    this.approver = function(){
        approverfield.click();
    };
    let workdaystart = element(by.css("mat-select[formcontrolname='workDayStart']"));
    this.workday_start = function(){
        workdaystart.click();
    };
    let workdaydue = element(by.css("mat-select[formcontrolname='workDayDue']"));
    this.workday_due = function(){
        workdaydue.click();
    };
    let checklist = element(by.xpath("//div[@class='mat-form-field-infix']//mat-select[@formcontrolname='controlsCheckList']"));
    this.check_list = function(){
        checklist.click();
    };
    let controltemplate = element(by.xpath("//div[@class='mat-form-field-infix']//mat-select[@formcontrolname='controlTemplateIndex']"));
    this.control_template = function(){
        controltemplate.click();
    };
    let checklistreporter = element(by.xpath("//div[@class='mat-form-field-infix']//mat-select[@formcontrolname='checkListReporter']"));
    this.checklist_reporter = function(){
        checklistreporter.click();
    };
    let savetask = element(by.xpath("//span[contains(text(),'Save Task')]"));
    this.save_task = function(){
        savetask.click();
    };
    let taskyes = element(by.xpath("//span[contains(text(),'YES')]"));
    this.task_yes = function(){
        taskyes.click();
    };
    let taskclosewindow = element(by.xpath("//button[@mattooltip='Close Tasks Dialog']/span[@class='mat-button-wrapper']/mat-icon[contains(text(),'close')]"));
    this.task_closewindow = function(){
        taskclosewindow.click();
    };
    let removetaskfil = element(by.xpath("//span[contains(text(),'(Remove Filter)')]"));
    this.remove_taskfil = function(){
        removetaskfil.click();
    };
    let addsubtaskbut = element(by.xpath("//ag-grid-angular[1]/div[1]/div[2]/div[1]/div[3]/div[3]/div[1]/div[@col-id='addSubtask']/span[1]/div[1]"));
    this.add_subtaskbut = function(){
        addsubtaskbut.click();
    };
    let addsubtaskbut1 = element(by.xpath("//span[contains(text(),'ADD')]"));
    this.add_subtaskbut1 = function(){
        addsubtaskbut1.click();
    };
    let removesubtaskfil = element(by.xpath("//mat-dialog-container/app-view-mec-task/div/div[2]/div/span[3]"));
    this.remove_subtaskfil = function(){
        return removesubtaskfil;
    };
    let adddependencybut = element(by.xpath("//div[@col-id='addDependency']/span/div[1]"));
    this.add_dependencybut = function(){
        adddependencybut.click();
    };
    let dependencytype = element(by.xpath("//div/mat-dialog-container/app-dependency-addition-dialog/div/div/div[2]/mat-form-field/div/div/div[3]/mat-select/div/div/span"));
    this.dependency_type = function(){
        dependencytype.click();
    };
    let depclosewin = element(by.xpath("//app-view-mec-task/div/div/button[@mattooltip='Close Tasks Dialog']/span[@class='mat-button-wrapper']/mat-icon[contains(text(),'close')]"));
    this.dep_closewin = function(){
        //depclosewin.click();
        return depclosewin;
    };
    let removedepfil = element(by.xpath("//mat-dialog-container/app-view-mec-task/div/div[2]/div/span[3]"));
    this.remove_depfil = function(){
        return removedepfil;
    };
    let removedepfilter = element(by.xpath("//span[contains(text(),'(Remove Filter)')]"));
    this.remove_depfilter = function(){
        removedepfilter.click();
    };

    let remindertask = element(by.xpath("//div[@ref='eBodyViewport']/div[1]/div/div[@col-id='ag-Grid-AutoColumn']/div/span[1]/span[@class='ag-icon ag-icon-checkbox-unchecked']"));
    this.reminder_task = function(){
        remindertask.click();
    };
    let setreminderuser = element(by.xpath("//span[contains(text(),'Set Reminder User')]"));
    this.set_reminderuser = function(){
        setreminderuser.click();
    };
    let setreminder1 = element(by.xpath("//span[contains(text(),'Set Reminder 1')]"));
    this.set_reminder1 = function(){
        setreminder1.click();
    };
    let whentosend = element(by.xpath("//div[@class='workdayDueDays']/span[3]"));
    this.whento_send = function(){
       return whentosend;
    };

    let reminder1 = element(by.xpath("//span[contains(text(),'REMINDER SETUP')]"));
    this.remindersetup1 = function(){
        return reminder1;
    };
    let remclosewin = element(by.xpath("//app-view-mec-task/div/div/button[@mattooltip='Close Tasks Dialog']/span[@class='mat-button-wrapper']/mat-icon[contains(text(),'close')]"));
    this.rem_closewin = function(){
        //depclosewin.click();
        return remclosewin;
    };
    let milestoneconfig = element(by.xpath("//span[contains(text(),'Milestone Config')]"));
    this.milestone_config = function(){
        milestoneconfig.click();
    };
    let addmilestonetask = element(by.xpath("//span[contains(text(),'Add Milestone Task')]"));
    this.add_milestonetask = function(){
        addmilestonetask.click();
    };
    let milestonetaskname = element(by.css("div input[formcontrolname='taskName']"));
    this.milestone_taskname = function(mtaskname){
        milestonetaskname.sendKeys(mtaskname);
    };
    let milestonetaskdesc = element(by.css("div input[formcontrolname='taskDescription']"));
    this.milestone_taskdesc = function(mtaskdesc){
        milestonetaskdesc.sendKeys(mtaskdesc);
    };
    let milestonecategory = element(by.css("div mat-select[formcontrolname='taskCategory']"));
    this.milestone_taskcategory = function(){
        milestonecategory.click();
    };
    let milestonesubcat = element(by.css("div input[formcontrolname='taskSubCategory']"));
    this.milestone_tasksubcat = function(mtasksubcat){
        milestonesubcat.sendKeys(mtasksubcat);
    };
    let milestonecriticality = element(by.css("div mat-select[formcontrolname='criticality']"));
    this.milestone_criticality = function(){
        milestonecriticality.click();
    };
    let milestoneinputspoc = element(by.css("div input[formcontrolname='taskInput']"));
    this.milestone_spoc = function(mspoc){
        milestoneinputspoc.sendKeys(mspoc);
    };
    let milestonemonthend = element(by.css("div mat-select[formcontrolname='monthEndCloseTask']"));
    this.milestone_monthend = function(){
        milestonemonthend.click();
    };
    let milestoneowner = element(by.css("div mat-select[formcontrolname='owner']"));
    this.milestone_owner = function(){
        milestoneowner.click();
    };
    let milestonechecklist = element(by.xpath("//div[@class='mat-form-field-infix']//mat-select[@formcontrolname='controlsCheckList']"));
    this.milestone_checklist = function(){
        milestonechecklist.click();
    };
    let milestonecontroltemp = element(by.xpath("//div[@class='mat-form-field-infix']//mat-select[@formcontrolname='controlTemplateIndex']"));
    this.milestone_controltemp = function(){
        milestonecontroltemp.click();
    };
    let milestonereporter = element(by.xpath("//div[@class='mat-form-field-infix']//mat-select[@formcontrolname='checkListReporter']"));
    this.milestone_reporter = function(){
        milestonereporter.click();
    };
    let milestonesave = element(by.xpath("//span[contains(text(),'Save Task')]"));
    this.milestone_save = function(){
        milestonesave.click();
    };
    let milestoneyes = element(by.xpath("//span[contains(text(),'YES')]"));
    this.milestone_yes = function(){
        milestoneyes.click();
    };
    let controlchecklistconfig = element(by.xpath("//span[contains(text(),'Control Checklist Config')]"));
    this.controlchecklist_config = function(){
        controlchecklistconfig.click();
    };
    let addnewchecklist = element(by.css("button[class*='sm'] span"));
    this.addnew_checklist = function(){
        addnewchecklist.click();
    };
    let checklistname = element(by.css("input[placeholder='Control Checklist Name']"));
    this.checklist_name = function(checkname1){
        checklistname.sendKeys(checkname1);
    };
    let checklistques = element(by.css("div input[aria-label='question']"));
    this.checklist_ques = function(checkques){
        checklistques.sendKeys(checkques);
    };
    let delques = element(by.xpath("//app-control-checklist-creation-dialog/div[1]/div[2]/form[1]/div[1]/div[2]/div[1]/button[@aria-label='delete question']/span/i"));
    this.del_ques = function(){
        delques.click();
    };
    let savechecklist = element(by.xpath("//span[contains(text(),'Save')]"));
    this.save_checklist = function(){
        savechecklist.click();
    };
    let checklistyes = element(by.xpath("//span[contains(text(),'YES')]"));
    this.checklist_yes = function(){
        checklistyes.click();
    };
    let editassigneestatus = element(by.xpath("//app-workunit-status-renderer/mat-icon[contains(text(),'edit')]"));
    this.edit_assigneestatus = function(){
        editassigneestatus.click();
    };
    let changeassigneestatus = element(by.css("mat-select[formcontrolname='status']"));
    this.change_assigneestatus = function(){
        changeassigneestatus.click();
    };
    let editapproverstatus = element(by.xpath("//app-workunit-status-renderer/mat-icon[contains(text(),'edit')]"));
    this.edit_approverstatus = function(){
        editapproverstatus.click();
    };
    let changeapproverstatus = element(by.css("mat-select[formcontrolname='status']"));
    this.change_approverstatus = function(){
        changeapproverstatus.click();
    };
}
module.exports = new Mec_sanity();
