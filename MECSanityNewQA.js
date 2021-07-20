var XLSX = require('xlsx');
var workbook = XLSX.readFile('C:/Users/SandipNandi/Project/SingleTouchAutomationAvnet/MEC/MECSanityQADatasheet.xlsx');
var MEC = workbook.Sheets['QA'];
var EC = protractor.ExpectedConditions;
var path = require('path');
var mecsanitypom = require('./MECSanityQA1_POM.js');
var d = new Date().toString();

function click_SignIn() {
    mecsanitypom.click_credential();
    browser.sleep(1000);
    mecsanitypom.select_role();
    browser.sleep(1000);
}

describe('MEC Core', function () {
    function SynchronizationProcess() {
        browser.waitForAngularEnabled(false);
        browser.ignoreSynchronization = true;
    }
    it('TS:-1 Valid username and valid password', function () {
        SynchronizationProcess();
        browser.get("" + MEC['A2'].v + "", 4000);
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(60000);
        //2. Enter an User name by giving valid  Username
        mecsanitypom.enterUserName('' + MEC['B2'].v + '');
        //3. Enter an password by giving valid  password
        mecsanitypom.enterPassword('' + MEC['C2'].v + '');
        //Click on Login
        browser.executeScript('window.scrollTo(100,100);');
        mecsanitypom.enterLogin();
        browser.sleep(3000);
    });

    it('TS:-2 Selecting the MEC Program', function () {
        //TC_02_Selecting the MEC Program
        click_SignIn();
        element(by.xpath("//div[contains(@class,'mat-select-panel mat-primary')]")).element(by.xpath("//mat-option/span[contains(text(),'Program Admin')]")).click();
        browser.sleep(3000);
        //Searching for the program
        mecsanitypom.search_prog(MEC['G2'].v);
        //Clicking on the program
        element(by.xpath("//div[contains(text(),'" + MEC['G2'].v + "')]")).click();
        browser.sleep(4000);
    });

    for (let j = 2; j <= 2; j++) {
        it('TS:-3 Create MEC Plan', function () {
            /*//1. Select a month for plan period
            //element(by.xpath("//app-mec-dashboard/div/div[1]/mat-form-field[1]/div[1]/div/div/mat-select/div/div[2]/div[@class='mat-select-arrow']")).click();
            //mecsanitypom.clickmonth();
            //browser.sleep(2000);
            //element(by.xpath("//mat-option[@role='option']/span[contains(text(),'" + WorksheetWorkUnit['C' + j].v + "')]")).click();
            //browser.actions().mouseMove(element(by.xpath("//span[contains(text(),'"+WorksheetWorkUnit['C3'].v+"')]"))).click().perform();
            //browser.sleep(3000);*/
            //it('* Create plan period for 1st time', function () {
            var period = element(by.xpath("//mat-card[contains(text(),' Please Create Plan to proceed..')]"));
            period.isPresent().then(function (text) {
                console.log(text);
                if (text == true) {
                    mecsanitypom.create_plan();
                    browser.sleep(1000);
                    //Select Input source'
                    mecsanitypom.inputsource();
                    //Selecting the input source from dropdown
                    element(by.xpath("//span[contains(text(),'" + MEC['I2'].v + "')]")).click();
                    //Select MEC Item from Drop Down'
                    element(by.xpath("//div/div[1]/app-input-source-selection/div[1]/div[1]/div[1]/mat-form-field[2]/div[1]/div[1]/div[3]/mat-select/div[1]/div[1]/span")).click();
                    //Selecting MEC Item from dropdown
                    element(by.xpath("//span[contains(text(),'" + MEC['J2'].v + "')]")).click();
                    //Click on Next option'
                    //element(by.xpath("//span[contains(text(),'Save & Next')]")).click();
                    mecsanitypom.saveplan();
                    //element(by.xpath("//span[contains(text(),'YES')]")).click();
                    mecsanitypom.yesplan();
                }
                else {
                    //element(by.xpath("//span[contains(text(),'MANAGE PLAN FOR ')]")).click();
                    mecsanitypom.manage_plan();
                    browser.sleep(2000);
                }
            })
        });

        it('TS:-4 Create Workunit', function () {
            //1. Select the Entities
            var entity1 = element(by.xpath("//div[@ref='eLabel']/span[contains(text(),'Entity (Selected Item)')]"));
            entity1.click();
            //Filter button 3 lines for entity name
            element(by.xpath("//div[@col-id='entitySelected']//span[@ref='eMenu']/span")).click();
            browser.sleep(2000);
            element(by.xpath("//div[@class='ag-menu ag-ltr']/div[1]/div[@ref='tabHeader']/span[2]/span[@class='ag-icon ag-icon-filter']")).click();
            browser.sleep(2000);
            //Click on filter check box to uncheck
            var uncheck = element(by.xpath("//label[@ref='eSelectAllContainer']/div[@ref='eSelectAll']/span[contains(@class,'ag-icon-checkbox-checked')]"));
            browser.executeScript("arguments[0].click()", uncheck);
            browser.sleep(2000);
            element(by.xpath("//div[@class='ag-input-wrapper']/input[@placeholder='Search...']")).sendKeys('' + MEC['Q2'].v + '');
            browser.sleep(1000);
            //Click again on filter check box
            var filtercheck = element(by.css("div[class='ag-filter-header-container'] label[ref='eSelectAllContainer'] div[ref='eSelectAll'] span"));
            browser.executeScript("arguments[0].click()", filtercheck);
            browser.sleep(1000);
            //Apply Filter and click
            var filterclick = element(by.xpath("//div[@ref='eButtonsPanel']/button[contains(text(),'Apply Filter')]"));
            browser.executeScript("arguments[0].click()", filterclick);
            browser.sleep(1000);
            element(by.xpath("//p[contains(text(),'PROGRAM')]")).click();
            browser.sleep(1000);
            //Clicking on entity name
            element(by.xpath("//div[@ref='eCenterColsClipper']/div[@ref='eCenterViewport']/div[@ref='eCenterContainer']/div[@row-index='0']/div[1]")).click();
            browser.sleep(2000);
            //Click on Create Workunit
            mecsanitypom.create_wu();
            browser.sleep(4000);
            //Enter Workunit Name
            mecsanitypom.wu_name(MEC['K' + j].v + d);
            //Selecting the calendar
            element(by.xpath("//mat-select[@formcontrolname='calendar']")).click();
            var cal = element(by.xpath("//mat-option/span[contains(text(),'" + MEC['L' + j].v + "')]"))
            //browser.actions().mouseMove(cal).click().perform();
            browser.executeScript("arguments[0].click()", cal);
            browser.sleep(3000);
            //Clicking on the Owner dropdown
            element(by.css("mat-select[formcontrolname='owner']")).click();
            browser.sleep(3000);
            //Selecting Owner from the dropdown
            element(by.xpath("//span[contains(text(),'" + MEC['M' + j].v + "')]")).click();
            browser.sleep(3000);
            //Create Workunit
            mecsanitypom.createwu_but();
            browser.sleep(3000);
            mecsanitypom.wu_yes();
            browser.sleep(2000);
            //Closing the window
            mecsanitypom.wu_closewindow();
            browser.sleep(2000);
        });
    }

    it('TS:-5 MEC Task Creation', function () {
        //Rows per page
        element(by.xpath("//mat-paginator[1]/div[1]/div[1]/div[1]/mat-form-field[1]/div[1]/div[1]/div[1]/mat-select[1]/div[1]/div[2]/div[1]")).click();
        browser.sleep(1000);
        element(by.xpath("//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/mat-option[4]/span[contains(text(),'200')]")).click();
        browser.sleep(2000);
        //Click on the workunit
        console.log(MEC['K2'].v);
        //1. Selecting the workunit
        var filterwu2 = element(by.xpath("//div[@ref='eLabel']/span[contains(text(),'Workunit Name')]"));
        browser.executeScript("arguments[0].click()", filterwu2);
        //Filter button 3 lines for workunit name
        element(by.xpath("//div[@col-id='workUnitName']//span[@ref='eMenu']/span")).click();
        browser.sleep(2000);
        element(by.xpath("//div[@class='ag-menu ag-ltr']/div[1]/div[@ref='tabHeader']/span[2]/span[@class='ag-icon ag-icon-filter']")).click();
        browser.sleep(2000);
        //Click on filter check box to uncheck
        var c1 = element(by.xpath("//label[@ref='eSelectAllContainer']/div[@ref='eSelectAll']/span[contains(@class,'ag-icon-checkbox-checked')]"));
        browser.executeScript("arguments[0].click()", c1);
        //browser.actions().mouseMove(element(by.xpath("//label[@ref='eSelectAllContainer']/div[@ref='eSelectAll']/span[contains(@class,'ag-icon-checkbox-checked')]"))).click().perform();
        //browser.sleep(2000);
        element(by.xpath("//div[@class='ag-input-wrapper']/input[@placeholder='Search...']")).sendKeys(MEC['K2'].v + d);
        browser.sleep(1000);
        //Click again on filter check box
        var f1 = element(by.css("div[class='ag-filter-header-container'] label[ref='eSelectAllContainer'] div[ref='eSelectAll'] span"));
        browser.executeScript("arguments[0].click()", f1);
        browser.sleep(1000);
        //Apply Filter and click
        var fc1 = element(by.xpath("//div[@ref='eButtonsPanel']/button[contains(text(),'Apply Filter')]"));
        browser.executeScript("arguments[0].click()", fc1);
        browser.sleep(1000);
        element(by.xpath("//div/p[contains(text(),'PROGRAM')]")).click();
        browser.sleep(1000);
        //Clicking on work unit name
        element(by.xpath("//div[@ref='eCenterColsClipper']/div[@ref='eCenterViewport']/div[@ref='eCenterContainer']/div[@row-index='0']/div[2]")).click();
        browser.sleep(3000);
        for (let x = 2; x <= 6; x++) {
            //2. Click on Create MEC Task option
            mecsanitypom.create_task();
            browser.sleep(2000);
            //Entering the Task name
            mecsanitypom.task_name('' + MEC['R' + x].v + '');
            browser.sleep(2000);
            //Entering the Task description
            mecsanitypom.task_desc('' + MEC['S' + x].v + '');
            browser.sleep(2000);
            //Milestone task dropdown
            mecsanitypom.mile_stone();
            //Selecting Milestone task
            element(by.xpath("//span[contains(text(),'" + MEC['T' + x].v + "')]")).click();
            browser.sleep(2000);
            //Task Category dropdown
            mecsanitypom.category1();
            //Selecting Task Category
            element(by.xpath("//span[contains(text(),'" + MEC['V' + x].v + "')]")).click();
            browser.sleep(2000);
            //Entering Sub-category
            mecsanitypom.sub_category('' + MEC['W' + x].v + '');
            browser.sleep(2000);
            //Criticality dropdown
            mecsanitypom.criticality1();
            //Selecting criticality
            element(by.xpath("//span[contains(text(),'" + MEC['X' + x].v + "')]")).click();
            browser.sleep(2000);
            //Entering Input SPoC
            mecsanitypom.input_spoc(MEC['Y' + x].v);
            browser.sleep(2000);
            //MonthEndTask dropdown
            mecsanitypom.month_endtask();
            browser.sleep(2000);
            //Selecting MonthendTask
            element(by.xpath("//span[@class='mat-option-text'][contains(text(),'" + MEC['Z' + x].v + "')]")).click();
            browser.sleep(2000);
            //Assignee field
            mecsanitypom.assignee();
            browser.sleep(2000);
            element(by.xpath("//span[@class='mat-option-text'][contains(text(),'" + MEC['AA' + x].v + "')]")).click();
            browser.sleep(2000);

            //Owner field
            //element(by.css("div mat-select[formcontrolname='owner']")).click();
            mecsanitypom.owner();
            element(by.xpath("//span[@class='mat-option-text'][contains(text(),'" + MEC['AB' + x].v + "')]")).click();
            browser.sleep(2000);

            //Approver field
            //element(by.css("div mat-select[formcontrolname='approver']")).click();
            mecsanitypom.approver();
            element(by.xpath("//span[@class='mat-option-text'][contains(text(),'" + MEC['AC' + x].v + "')]")).click();
            browser.sleep(2000);

            //Workdaystart dropdown
            //element(by.css("mat-select[formcontrolname='workDayStart']")).click();
            mecsanitypom.workday_start();
            browser.sleep(2000);
            //element(by.xpath("//div[1]/mat-option[24]//span[@class='mat-option-text']")).sendKeys(''+MEC['N2'].v+'');
            //Selecting date for Workdaystart
            element(by.xpath("//span[@class='mat-option-text'][contains(text(),'" + MEC['AD' + x].v + "')]")).click();
            browser.sleep(3000);

            //WorkDayDue dropdown
            //element(by.css("mat-select[formcontrolname='workDayDue']")).click();
            mecsanitypom.workday_due();
            browser.sleep(3000);
            //Selecting date for Workdaydue
            //browser.actions().mouseMove(element(by.xpath("//span[@class='mat-option-text'][contains(text(),'" + MEC['P' + x].v + "')]"))).click().perform();
            var due1 = element(by.xpath("//span[@class='mat-option-text'][contains(text(),'" + MEC['AE' + x].v + "')]"));
            browser.executeScript('arguments[0].click();', due1);

            //selecting hrs for workday start time
            //element(by.css("div input[formcontrolname='workDayStartTime']")).click();
            element(by.xpath("//div[@class='mat-form-field-infix']//input[@formcontrolname='workDayStartTime']")).click();
            element(by.xpath("//owl-date-time-timer-box[1]/label[1]/input[1]")).clear();
            element(by.xpath("//owl-date-time-timer-box[1]/label[1]/input[1]")).sendKeys('' + MEC['AF' + x].v + '');

            //selecting minutes for workday start time
            element(by.xpath("//owl-date-time-timer-box[2]/label[1]/input[1]")).clear();
            element(by.xpath("//owl-date-time-timer-box[2]/label[1]/input[1]")).sendKeys('' + MEC['AG' + x].v + '');
            browser.sleep(1000);
            element(by.xpath("//div[1]/button[2]//span[contains(text(),'Set')]")).click();
            browser.sleep(2000);

            //selecting hrs for workday due time
            element(by.xpath("//div[@class='mat-form-field-infix']//input[@formcontrolname='workDayDueTime']")).click();
            element(by.xpath("//owl-date-time-timer-box[1]/label[1]/input[1]")).clear();
            element(by.xpath("//owl-date-time-timer-box[1]/label[1]/input[1]")).sendKeys('' + MEC['AH' + x].v + '');

            //selecting minutes for workday due time
            element(by.xpath("//owl-date-time-timer-box[2]/label[1]/input[1]")).clear();
            element(by.xpath("//owl-date-time-timer-box[2]/label[1]/input[1]")).sendKeys('' + MEC['AI' + x].v + '');
            browser.sleep(3000);
            element(by.xpath("//span[contains(text(),'Set')]")).click();
            browser.sleep(2000);

            //selecting the timezone
            element(by.xpath("//div[@class='mat-form-field-infix']//mat-select[@formcontrolname='timezone']")).click().then(() => {
                browser.sleep(2000);
                element(by.xpath("//mat-option[448]/span[contains(text(),'" + MEC['AJ' + x].v + "')]")).click();
            })
            browser.sleep(3000);
            //Control Checklist Configuration drop down
            mecsanitypom.check_list();
            //selecting Yes/No from drop down 
            element(by.xpath("//span[@class='mat-option-text'][contains(text(),'" + MEC['AK' + x].v + "')]")).click();
            if (MEC['AK' + x].v == 'Yes') {
                //Selecting Control template 
                mecsanitypom.control_template();
                element(by.xpath("//span[contains(text(),'" + MEC['AL' + x].v + "')]")).click();
                browser.sleep(2000);
                //Selecting Checklist Reporter
                mecsanitypom.checklist_reporter();
                browser.sleep(2000);
                //Selecting ASSIGNEE/OWNER/APPROVER from Drop down
                element(by.xpath("//span[contains(text(),'" + MEC['AM' + x].v + "')]")).click();
                element(by.xpath("//i[@class='fs1 icon-add']")).click();
                browser.sleep(3000);
            }
            //4. Click on Save
            mecsanitypom.save_task();
            browser.sleep(3000);
            mecsanitypom.task_yes();
            browser.sleep(3000);
        }
        browser.sleep(3000);
    });

    it('TS:-6 Subtask Creation', function () {
        //2. Filtering the task to add subtask
        var filtertask = element(by.xpath("//div[@ref='eLabel']/span[contains(text(),'Task Name')]"));
        browser.executeScript("arguments[0].click()", filtertask);
        element(by.xpath("//div[@ref='ePinnedLeftHeader']/descendant::span[@ref='eMenu']/span[@class='ag-icon ag-icon-menu']")).click();
        browser.sleep(1000);
        element(by.xpath("//div[@class='ag-menu ag-ltr']/div[1]/div[@ref='tabHeader']/span[2]/span[@class='ag-icon ag-icon-filter']")).click();
        browser.sleep(2000);
        //Click on filter check box to uncheck
        var taskfil1 = element(by.xpath("//label[@ref='eSelectAllContainer']/div[@ref='eSelectAll']/span[contains(@class,'ag-icon-checkbox-checked')]"));
        browser.executeScript("arguments[0].click()", taskfil1);
        browser.sleep(2000);
        element(by.xpath("//div[@class='ag-input-wrapper']/input[@placeholder='Search...']")).sendKeys('' + MEC['R3'].v + '');
        browser.sleep(1000);
        //Click again on filter check box
        var filcheck1 = element(by.css("div[class='ag-filter-header-container'] label[ref='eSelectAllContainer'] div[ref='eSelectAll'] span"));
        browser.executeScript("arguments[0].click()", filcheck1);
        browser.sleep(1000);
        //Apply Filter and click
        var applyfil1 = element(by.xpath("//div[@ref='eButtonsPanel']/button[contains(text(),'Apply Filter')]"));
        browser.executeScript("arguments[0].click()", applyfil1);
        browser.sleep(2000);
        //browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
        element(by.xpath("//div/span[contains(text(),'List of MEC Tasks. Assign, Edit, Create Tasks.')]"));
        browser.sleep(3000);
        //3. Clicking on Add Subtask button
        mecsanitypom.add_subtaskbut();
        browser.sleep(2000);
        //4. Selecting the subtask
        var filtersubtask = element(by.xpath("//mat-dialog-container/app-sub-task-addition-dialog/div/div[3]/ag-grid-angular/div/div[2]/div/div/div[2]/div/div/div/div[3]/div/span[contains(text(),'Task Name')]"));
        browser.executeScript("arguments[0].click()", filtersubtask);
        //Clicking on 3lines to filter
        element(by.xpath("//mat-dialog-container/app-sub-task-addition-dialog/div/div[3]/ag-grid-angular/div/div[2]/div/div/div[2]/div/div/div/div[3]/span/span")).click();
        element(by.xpath("//div[@class='ag-menu ag-ltr']/div[1]/div[@ref='tabHeader']/span[2]/span[@class='ag-icon ag-icon-filter']")).click();
        browser.sleep(2000);
        //Click on filter check box to uncheck
        var c3 = element(by.xpath("//label[@ref='eSelectAllContainer']/div[@ref='eSelectAll']/span[contains(@class,'ag-icon-checkbox-checked')]"));
        browser.executeScript("arguments[0].click()", c3);
        browser.sleep(2000);
        element(by.xpath("//div[@class='ag-input-wrapper']/input[@placeholder='Search...']")).sendKeys('' + MEC['R4'].v + '');
        browser.sleep(1000);
        //Click again on filter check box
        var f3 = element(by.css("div[class='ag-filter-header-container'] label[ref='eSelectAllContainer'] div[ref='eSelectAll'] span"));
        browser.executeScript("arguments[0].click()", f3);
        browser.sleep(1000);
        //Apply Filter and click
        var fc3 = element(by.xpath("//div[@ref='eButtonsPanel']/button[contains(text(),'Apply Filter')]"));
        browser.executeScript("arguments[0].click()", fc3);
        browser.sleep(1000);
        element(by.xpath("//b[contains(text(),' ADD SUB TASK(S): ')]")).click();
        browser.sleep(1000);
        //Selecting the subtask checkbox
        element(by.xpath("//body/div[1]/div[4]/div[1]/mat-dialog-container[1]/app-sub-task-addition-dialog[1]/div[1]/div[3]/ag-grid-angular[1]/div[1]/div[2]/div[1]/div[3]/div[1]/div[1]/div[1]/div[1]/span[1]/span[2]")).click();
        //5. Click on Add button
        mecsanitypom.add_subtaskbut1();
        browser.sleep(5000);

        //Remove the filter
        var rfil1 = mecsanitypom.remove_subtaskfil();
        browser.executeScript('arguments[0].click();', rfil1);
        browser.sleep(3000);
    });

    it('TS:-7 Adding Dependencies', function () {
        //2. Filtering the task to add dependency
        var filtertask1 = element(by.xpath("//div[@ref='eLabel']/span[contains(text(),'Task Name')]"));
        browser.executeScript("arguments[0].click()", filtertask1);
        //browser.actions().mouseMove(filtertask1).perform();
        element(by.xpath("//div[@ref='ePinnedLeftHeader']/descendant::span[@ref='eMenu']/span[@class='ag-icon ag-icon-menu']")).click();
        browser.sleep(1000);
        //element(by.xpath("//div[@class='ag-menu ag-ltr']/div[1]/div[@ref='tabHeader']/span[2]/span[@class='ag-icon ag-icon-filter']")).click();
        //browser.sleep(2000);
        //Click on filter check box to uncheck
        var c5 = element(by.xpath("//label[@ref='eSelectAllContainer']/div[@ref='eSelectAll']/span[contains(@class,'ag-icon-checkbox-checked')]"));
        browser.executeScript("arguments[0].click()", c5);
        browser.sleep(2000);
        element(by.xpath("//div[@class='ag-input-wrapper']/input[@placeholder='Search...']")).sendKeys('' + MEC['R5'].v + '');
        browser.sleep(1000);
        //Click again on filter check box
        var f5 = element(by.css("div[class='ag-filter-header-container'] label[ref='eSelectAllContainer'] div[ref='eSelectAll'] span"));
        browser.executeScript("arguments[0].click()", f5);
        browser.sleep(1000);
        //Apply Filter and click
        var fc5 = element(by.xpath("//div[@ref='eButtonsPanel']/button[contains(text(),'Apply Filter')]"));
        browser.executeScript("arguments[0].click()", fc5);
        browser.sleep(1000);
        element(by.xpath("//div/span[contains(text(),'List of MEC Tasks. Assign, Edit, Create Tasks.')]"));
        browser.sleep(3000);
        //3. Clicking on Add Dependancy button
        mecsanitypom.add_dependencybut();
        browser.sleep(2000);
        // Filtering the tasks
        var filterdependencytask = element(by.xpath("//mat-dialog-container/app-dependency-addition-dialog/div/div[3]/ag-grid-angular/div/div[2]/div/div/div[2]/div/div/div/div[3]/div/span[contains(text(),'Task Name')]"));
        browser.executeScript("arguments[0].click()", filterdependencytask);
        //Clicking on 3lines to filter
        element(by.xpath("//mat-dialog-container/app-dependency-addition-dialog/div/div[3]/ag-grid-angular/div/div[2]/div/div/div[2]/div/div/div/div[3]/span/span")).click();
        element(by.xpath("//div[@class='ag-menu ag-ltr']/div[1]/div[@ref='tabHeader']/span[2]/span[@class='ag-icon ag-icon-filter']")).click();
        browser.sleep(2000);
        //Click on filter check box to uncheck
        //browser.actions().mouseMove(element(by.xpath("//label[@ref='eSelectAllContainer']/div[@ref='eSelectAll']/span[contains(@class,'ag-icon-checkbox-checked')]"))).click().perform();
        var c6 = element(by.xpath("//label[@ref='eSelectAllContainer']/div[@ref='eSelectAll']/span[contains(@class,'ag-icon-checkbox-checked')]"));
        browser.executeScript("arguments[0].click()", c6);
        browser.sleep(2000);
        element(by.xpath("//div[@class='ag-input-wrapper']/input[@placeholder='Search...']")).sendKeys('' + MEC['R6'].v + '');
        browser.sleep(1000);
        //Click again on filter check box
        //browser.actions().mouseMove(element(by.css("div[class='ag-filter-header-container'] label[ref='eSelectAllContainer'] div[ref='eSelectAll'] span"))).click().perform();
        var f6 = element(by.css("div[class='ag-filter-header-container'] label[ref='eSelectAllContainer'] div[ref='eSelectAll'] span"));
        browser.executeScript("arguments[0].click()", f6);
        browser.sleep(1000);
        //Apply Filter and click
        //browser.actions().mouseMove(element(by.xpath("//div[@ref='eButtonsPanel']/button[contains(text(),'Apply Filter')]"))).click().perform();
        var fc6 = element(by.xpath("//div[@ref='eButtonsPanel']/button[contains(text(),'Apply Filter')]"));
        browser.executeScript("arguments[0].click()", fc6);
        browser.sleep(1000);
        element(by.xpath("//b[contains(text(),'SELECT DEPENDENT(S): ')]")).click();
        browser.sleep(1000);
        //Selecting the dependency task checkbox
        element(by.xpath("//body/div[1]/div[4]/div[1]/mat-dialog-container[1]/app-dependency-addition-dialog[1]/div[1]/div[3]/ag-grid-angular[1]/div[1]/div[2]/div[1]/div[3]/div[1]/div[1]/div[1]/div[1]/span[1]/span[2]")).click();
        //5. Selecting the dependency type 
        mecsanitypom.dependency_type();
        var deptype = element(by.xpath("//span[contains(text(),'" + MEC['AN2'].v + "')]"));
        browser.executeScript("arguments[0].click()", deptype);
        //browser.actions().mouseMove(deptype).click().perform();
        browser.sleep(5000);
        //6. Click on Add button
        var add = element(by.xpath("//span[contains(text(),'Add')]"));
        browser.executeScript("arguments[0].click()", add);
        browser.sleep(4000);
        //Remove the filter
        var rfil2 = mecsanitypom.remove_depfil();
        browser.executeScript('arguments[0].click();', rfil2);
        browser.sleep(3000);
    });

    it('TS:-8 Set Reminder User', function () {
        //2. Filtering the task to send reminder
        var filtertask1 = element(by.xpath("//div[@ref='eLabel']/span[contains(text(),'Task Name')]"));
        browser.executeScript("arguments[0].click()", filtertask1);
        //browser.actions().mouseMove(filtertask1).perform();
        element(by.xpath("//div[@ref='ePinnedLeftHeader']/descendant::span[@ref='eMenu']/span[@class='ag-icon ag-icon-menu']")).click();
        browser.sleep(1000);
        //element(by.xpath("//div[@class='ag-menu ag-ltr']/div[1]/div[@ref='tabHeader']/span[2]/span[@class='ag-icon ag-icon-filter']")).click();
        //browser.sleep(2000);
        //Click on filter check box to uncheck
        var c8 = element(by.xpath("//label[@ref='eSelectAllContainer']/div[@ref='eSelectAll']/span[contains(@class,'ag-icon-checkbox-checked')]"));
        browser.executeScript("arguments[0].click()", c8);
        browser.sleep(2000);
        element(by.xpath("//div[@class='ag-input-wrapper']/input[@placeholder='Search...']")).sendKeys('' + MEC['R2'].v + '');
        browser.sleep(1000);
        //Click again on filter check box
        var f8 = element(by.css("div[class='ag-filter-header-container'] label[ref='eSelectAllContainer'] div[ref='eSelectAll'] span"));
        browser.executeScript("arguments[0].click()", f8);
        browser.sleep(1000);
        //Apply Filter and click
        var fc8 = element(by.xpath("//div[@ref='eButtonsPanel']/button[contains(text(),'Apply Filter')]"));
        browser.executeScript("arguments[0].click()", fc8);
        browser.sleep(1000);
        //browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
        element(by.xpath("//div/span[contains(text(),'List of MEC Tasks. Assign, Edit, Create Tasks.')]"));
        browser.sleep(1000);
        //Selecting the task for adding reminder
        mecsanitypom.reminder_task();
        browser.sleep(1000);
        //Click on Set Reminder user button
        mecsanitypom.set_reminderuser();
        browser.sleep(1000);
        //Click on Set Reminder 1 option
        mecsanitypom.set_reminder1();
        browser.sleep(1000);
        //Incrementing when to send
        var whentosend = mecsanitypom.whento_send();
        browser.executeScript("arguments[0].scrollIntoView()", whentosend);
        whentosend.click();
        browser.sleep(2000);
        //Clicking on Reminder Template dropdown
        element(by.xpath("//mat-select[@formcontrolname='reminderTemplateId']")).click();
        browser.sleep(1000);
        //Selecting reminder template 
        element(by.xpath("//mat-option/span[contains(text(),'" + MEC['AP2'].v + "')]")).click();
        //Clicking on Users dropdown
        element(by.xpath("//mat-select[@formcontrolname='sentToUserIds']/div/div/span")).click();
        browser.sleep(1000);
        //Selecting the user from dropdown
        var user = element(by.xpath("//span[contains(text(),'" + MEC['AO2'].v + "')]"));
        browser.executeScript("arguments[0].click()", user);
        browser.sleep(2000);
        //Submitting the reminder
        var q1 = element(by.xpath("//mat-dialog-container[1]/app-reminder-setup-dialog[1]/div[1]/div[1]/button[1]/span[1]/span[1]"));
        browser.executeScript('arguments[0].click();', q1);
        browser.sleep(2000);
        element(by.xpath("//span[contains(text(),'YES')]")).click();
        browser.sleep(6000);
        //7. Closing the window
        var closewin3 = mecsanitypom.rem_closewin();
        browser.executeScript("arguments[0].scrollIntoView()", closewin3).then(() => {
            browser.sleep(1000);
            browser.executeScript("arguments[0].click()", closewin3);
        });
        browser.sleep(2000);
    })

    it('TS:-9 Adding Milestone Task', function () {
        //1. Click on Milestone Config button
        mecsanitypom.milestone_config();
        //2. Click on Add Milestone Task
        mecsanitypom.add_milestonetask();
        //Entering the Task name
        mecsanitypom.milestone_taskname('' + MEC['AQ2'].v + '');
        //Entering the Task description
        mecsanitypom.milestone_taskdesc('' + MEC['AR2'].v + '');
        //Task Category dropdown
        mecsanitypom.milestone_taskcategory();
        //Selecting Task Category
        element(by.xpath("//span[contains(text(),'" + MEC['AS2'].v + "')]")).click();
        //Entering Sub-category
        mecsanitypom.milestone_tasksubcat('' + MEC['AT2'].v + '');
        //Criticality dropdown
        mecsanitypom.milestone_criticality();
        //Selecting criticality
        element(by.xpath("//span[contains(text(),'" + MEC['AU2'].v + "')]")).click();
        //Entering Input SPoC
        mecsanitypom.milestone_spoc(MEC['AV2'].v);
        //MonthEndClose dropdown
        mecsanitypom.milestone_monthend();
        element(by.xpath("//span[@class='mat-option-text'][contains(text(),'" + MEC['AW2'].v + "')]")).click();
        browser.sleep(1000);
        //Owner field
        mecsanitypom.milestone_owner();
        element(by.xpath("//span[@class='mat-option-text'][contains(text(),'" + MEC['AX2'].v + "')]")).click();
        browser.sleep(3000);
        //Control Checklist Configuration drop down
        mecsanitypom.milestone_checklist();
        //selecting Yes/No from drop down 
        element(by.xpath("//span[@class='mat-option-text'][contains(text(),'" + MEC['AY2'].v + "')]")).click();
        if (MEC['AY2'].v == 'Yes') {
            //Selecting Control template 
            mecsanitypom.milestone_controltemp();
            element(by.xpath("//span[contains(text(),'" + MEC['AZ2'].v + "')]")).click();
            //Selecting Checklist Reporter
            mecsanitypom.milestone_reporter();
            //Selecting ASSIGNEE/OWNER/APPROVER from Drop down
            element(by.xpath("//span[contains(text(),'" + MEC['BA2'].v + "')]")).click();
            //4. Click on Save
            mecsanitypom.milestone_save();
            browser.sleep(2000);
            //element(by.xpath("//span[contains(text(),'YES')]")).click();
            mecsanitypom.milestone_yes();
            browser.sleep(3000);
        }
    });

    it('TS:-10 Control Checklist Configuration', function () {
        browser.sleep(3000);
        mecsanitypom.controlchecklist_config();
        browser.sleep(1000);
        //Click on Add New Contorl Checklist
        mecsanitypom.addnew_checklist();
        browser.sleep(2000);
        //Enter the new control checklist name
        mecsanitypom.checklist_name('' + MEC['N2'].v + '');
        //Enter checklist question
        mecsanitypom.checklist_ques('' + MEC['O2'].v + '');
        for (N = 3; N <= 3; N++) {
            var qus = element(by.xpath("//button[@aria-label='+ ADD NEW QUESTION']"));
            browser.executeScript("arguments[0].click()", qus);
            //qus.click();
            element(by.xpath("//form[1]/div[1]/div[" + N + "]//input[@aria-label='question']")).sendKeys('' + MEC['P2'].v + '');
        }
        browser.sleep(1000);
        //8. Click on delete the question
        mecsanitypom.del_ques();
        //9. Click on Save
        mecsanitypom.save_checklist();
        browser.sleep(3000);
        mecsanitypom.checklist_yes();
        browser.sleep(6000);
    });

    it('TS:-11 Switch to Preparer with valid username and password', function () {
        click_SignIn();
        browser.sleep(1000);
        element(by.xpath("//div[contains(@class,'mat-select-panel mat-primary')]")).element(by.xpath("//mat-option/span[contains(text(),'" + MEC['E2'].v + "')]")).click();
        browser.sleep(2000);
        //4. Click on Month End Close tab
        element(by.xpath("//span[@class='mat-content']/mat-panel-title[contains(text(),'" + MEC['BB2'].v + "')]")).click();
        browser.sleep(3000);
        //5. Click on MEC program
        element(by.xpath("//div[contains(@class,'global-mat-card r2r-card')]/div[@class='px-2 py-4']/div[contains(text(),'" + MEC['BC2'].v + "')]")).click();
        browser.sleep(4000);
    });

    it('TS:-12 Task status from NEW to COMPLETED', function () {
        //Going into task view and selecting the workunit(840 line is for qa env)
        element(by.xpath("//div[@class='mat-tab-link-container']/div[@class='mat-tab-list']/div[@class='mat-tab-links']/a[@aria-label='Task View']")).click();
        browser.sleep(3000);
        //Selecting the month
        //element(by.xpath("//mat-option[@role='option']/span[contains(text(),'" + WorksheetWorkUnit['C2'].v + "')]")).click();
        //browser.sleep(2000);
        //Rows per page
        element(by.xpath("//mat-paginator[1]/div[1]/div[1]/div[1]/mat-form-field[1]/div[1]/div[1]/div[1]/mat-select[1]/div[1]/div[2]/div[1]")).click();
        browser.sleep(1000);
        element(by.xpath("//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/mat-option[4]/span[contains(text(),'200')]")).click();
        browser.sleep(2000);
        var mouse = element(by.xpath("//div[@ref='eLabel']/span[contains(text(),'Workunit Name')]"));
        browser.executeScript("arguments[0].click()", mouse);
        //Filter button 3 lines for workunit name
        element(by.xpath("//div[@col-id='workUnitName']//span[@ref='eMenu']/span")).click();
        browser.sleep(2000);
        element(by.xpath("//div[@class='ag-menu ag-ltr']/div[1]/div[@ref='tabHeader']/span[2]/span[@class='ag-icon ag-icon-filter']")).click();
        browser.sleep(2000);
        //Click on filter check box to uncheck
        var c9 = element(by.xpath("//label[@ref='eSelectAllContainer']/div[@ref='eSelectAll']/span[contains(@class,'ag-icon-checkbox-checked')]"));
        browser.executeScript("arguments[0].click()", c9);
        browser.sleep(2000);
        element(by.xpath("//div[@class='ag-input-wrapper']/input[@placeholder='Search...']")).sendKeys(MEC['K2'].v + d);
        browser.sleep(1000);
        //Click again on filter check box
        var f9 = element(by.css("div[class='ag-filter-header-container'] label[ref='eSelectAllContainer'] div[ref='eSelectAll'] span"));
        browser.executeScript("arguments[0].click()", f9);
        browser.sleep(1000);
        //Apply Filter and click
        var fc9 = element(by.xpath("//div[@ref='eButtonsPanel']/button[contains(text(),'Apply Filter')]"));
        browser.executeScript("arguments[0].click()", fc9);
        browser.sleep(1000);
        element(by.xpath("//p[contains(text(),'PROGRAM')]")).click();
        browser.sleep(1000);
        //Clicking on work unit name
        element(by.xpath("//div[@ref='eCenterColsClipper']/div[@ref='eCenterViewport']/div[@ref='eCenterContainer']/div[@row-index='0']/div[2]")).click();
        browser.sleep(8000);
        //Uncheck delay Task
        var uncheck_delay = element(by.xpath("//app-checkbox[2]//div[1]//button[1]//span[1]//mat-icon[1]"));
        uncheck_delay.click();
        browser.sleep(1000);
        //1. Filtering the tasks
        var mouse1 = element(by.xpath("//div[@ref='eLabel']/span[contains(text(),'Task Name')]"));
        //browser.actions().mouseMove(mouse1).perform();
        browser.executeScript("arguments[0].click()", mouse1);
        element(by.xpath("//div[@ref='ePinnedLeftHeader']/descendant::span[@ref='eMenu']/span[@class='ag-icon ag-icon-menu']")).click();
        browser.sleep(1000);
        element(by.xpath("//div[@class='ag-menu ag-ltr']/div[1]/div[@ref='tabHeader']/span[2]/span[@class='ag-icon ag-icon-filter']")).click();
        browser.sleep(2000);
        //Click on filter check box to uncheck
        //browser.actions().mouseMove(element(by.xpath("//label[@ref='eSelectAllContainer']/div[@ref='eSelectAll']/span[contains(@class,'ag-icon-checkbox-checked')]"))).click().perform();
        var c10 = element(by.xpath("//label[@ref='eSelectAllContainer']/div[@ref='eSelectAll']/span[contains(@class,'ag-icon-checkbox-checked')]"));
        browser.executeScript("arguments[0].click()", c10);
        browser.sleep(2000);
        element(by.xpath("//div[@class='ag-input-wrapper']/input[@placeholder='Search...']")).sendKeys('' + MEC['R2'].v + '');
        browser.sleep(1000);
        //Click again on filter check box
        var f10 = element(by.css("div[class='ag-filter-header-container'] label[ref='eSelectAllContainer'] div[ref='eSelectAll'] span"));
        browser.executeScript("arguments[0].click()", f10);
        browser.sleep(1000);
        //Apply Filter and click
        var fc10 = element(by.xpath("//div[@ref='eButtonsPanel']/button[contains(text(),'Apply Filter')]"));
        browser.executeScript("arguments[0].click()", fc10);
        browser.sleep(1000);
        //browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
        element(by.xpath("//p[contains(text(),'PROGRAM')]")).click();
        browser.sleep(1000);
        //Clicking on edit button
        mecsanitypom.edit_assigneestatus();
        //Change the status
        mecsanitypom.change_assigneestatus();
        browser.sleep(1000);
        //Change it into complete
        element(by.xpath("//span[contains(text(),'" + MEC['BD2'].v + "')]")).click();
        browser.sleep(1000);
        //3. Click on Submit button
        element(by.xpath("//span[contains(text(),'Submit')]")).click().then(() => {
            browser.sleep(5000);
        })
    });

    it('TS:-13 Submitting control checklist by assignee', function () {
        //Checklist submission
        var checklist_submission = element(by.xpath("//app-mec-task-view-tasks[1]/div[1]/div[1]/ag-grid-angular[1]/div[1]/div[2]/div[1]/div[3]/div[3]/div[1]/div[@col-id='checklist']/span[1]/div[1]"));
        browser.sleep(2000);
        checklist_submission.isPresent().then(function (t) {
            console.log(t);
            if (t == true) {
                //Click on checklist option
                browser.sleep(6000);
                element(by.xpath("//app-mec-task-view-tasks[1]/div[1]/div[1]/ag-grid-angular[1]/div[1]/div[2]/div[1]/div[3]/div[3]/div[1]/div[@col-id='checklist']/span[1]/div[1]")).click();
                browser.sleep(4000);

                //Enable pass/fail in checklist tab
                element(by.xpath("//div[@formarrayname='checkListContentReqs']/mat-card/form/div/app-checkbox/div/button/span/mat-icon[contains(text(),' check_box_outline_blank')]")).click();
                browser.sleep(1000);

                //Add comments
                element(by.xpath("//div/textarea[@placeholder='Comment...']")).sendKeys('' + MEC['BE2'].v + '');
                //Add attachments
                var fileToUpload = 'C:/Users/SandipNandi/Project/SingleTouchAutomationAvnet/MEC/MECSanityQADatasheet.xlsx';
                var absolutepath = path.resolve(__dirname, fileToUpload);
                $('input[type="file"]').sendKeys(absolutepath);
                browser.sleep(2000);

                //Click on submit
                element(by.xpath("//span[contains(text(),'Submit')]")).click();
                element(by.xpath("//span[contains(text(),'YES')]")).click();
                browser.sleep(4000);
            }
        });
    });

    it('TS:-14 Logout from the present credentials', function () {
        //Changing the credentials
        browser.sleep(2000);
        var login = element(by.css("button span[class='mat-button-wrapper'] div img[class='avatar']"));
        browser.executeScript("arguments[0].scrollIntoView()", login);
        browser.executeScript("arguments[0].click()", login);
        browser.sleep(1000);
        element(by.xpath("//button[contains(text(),' Signout ')]")).click();
    });

    it('TS:-15 Login as preparer/reviewer/approver and approve the task', function () {
        //2. Login with valid credentials
        browser.ignoreSynchronization = true;
        //Here we are entering the username
        element(by.id('username')).sendKeys('' + MEC['B3'].v + '');
        //Here we are enetring the password
        element(by.id('password')).sendKeys('' + MEC['C3'].v + '');
        browser.executeScript('window.scrollTo(100,100);');
        element(by.id('kc-login')).sendKeys(protractor.Key.ENTER);
        browser.sleep(10000);
        //3. switch to reviewer
        click_SignIn();
        element(by.xpath("//div[contains(@class,'mat-select-panel mat-primary')]")).element(by.xpath("//mat-option/span[contains(text(),'" + MEC['F2'].v + "')]")).click();
        browser.sleep(3000);
        //4. Click on Month End Close tab
        element(by.xpath("//span[@class='mat-content']/mat-panel-title[contains(text(),'" + MEC['BB2'].v + "')]")).click();
        browser.sleep(1000);
        //5. Click on one MEC Program
        element(by.xpath("//div[contains(@class,'global-mat-card r2r-card')]/div[@class='px-2 py-4']/div[contains(text(),'" + MEC['BC2'].v + "')]")).click();
        //Going into task view and selecting the workunit(994 line is for qa env)
        element(by.xpath("//div[@class='mat-tab-link-container']/div[@class='mat-tab-list']/div[@class='mat-tab-links']/a[@aria-label='Task View']")).click();
        browser.sleep(3000);
        //Rows per page
        element(by.xpath("//mat-paginator[1]/div[1]/div[1]/div[1]/mat-form-field[1]/div[1]/div[1]/div[1]/mat-select[1]/div[1]/div[2]/div[1]")).click();
        browser.sleep(1000);
        element(by.xpath("//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/mat-option[4]/span[contains(text(),'200')]")).click();
        browser.sleep(2000);
        //Clicking on period dropdown
        //var period2 = element(by.xpath("//div/app-mec-task-view/div/div/app-mec-task-view-workunits/div[1]/mat-toolbar/mat-form-field/div/div/div/mat-select/div/div[2]/div[@class='mat-select-arrow']"));
        //browser.actions().mouseMove(period2).click().perform();
        //browser.executeScript("arguments[0].click()", period2);
        //browser.sleep(2000);
        //Selecting the month
        //element(by.xpath("//mat-option[@role='option']/span[contains(text(),'" + WorksheetWorkUnit['C2'].v + "')]")).click();
        //Clicking on For approval by me button
        element(by.xpath("//div[contains(text(),'FOR APPROVAL BY ME')]")).click();
        browser.sleep(1000);
        var mouse = element(by.xpath("//div[@ref='eLabel']/span[contains(text(),'Workunit Name')]"));
        //browser.actions().mouseMove(mouse).perform();
        browser.executeScript("arguments[0].click()", mouse);
        //Filter button 3 lines for workunit name
        element(by.xpath("//div[@col-id='workUnitName']//span[@ref='eMenu']/span")).click();
        browser.sleep(2000);
        element(by.xpath("//div[@class='ag-menu ag-ltr']/div[1]/div[@ref='tabHeader']/span[2]/span[@class='ag-icon ag-icon-filter']")).click();
        browser.sleep(2000);
        //Click on filter check box to uncheck
        //browser.actions().mouseMove(element(by.xpath("//label[@ref='eSelectAllContainer']/div[@ref='eSelectAll']/span[contains(@class,'ag-icon-checkbox-checked')]"))).click().perform();
        var c11 = element(by.xpath("//label[@ref='eSelectAllContainer']/div[@ref='eSelectAll']/span[contains(@class,'ag-icon-checkbox-checked')]"));
        browser.executeScript("arguments[0].click()", c11);
        browser.sleep(2000);
        element(by.xpath("//div[@class='ag-input-wrapper']/input[@placeholder='Search...']")).sendKeys(MEC['K2'].v + d);
        browser.sleep(1000);
        //Click again on filter check box
        var f11 = element(by.css("div[class='ag-filter-header-container'] label[ref='eSelectAllContainer'] div[ref='eSelectAll'] span"));
        browser.executeScript("arguments[0].click()", f11);
        browser.sleep(1000);
        //Apply Filter and click
        var fc11 = element(by.xpath("//div[@ref='eButtonsPanel']/button[contains(text(),'Apply Filter')]"));
        browser.executeScript("arguments[0].click()", fc11);
        browser.sleep(1000);
        element(by.xpath("//p[contains(text(),'PROGRAM')]")).click();
        browser.sleep(1000);
        //Clicking on work unit name
        element(by.xpath("//div[@ref='eCenterColsClipper']/div[@ref='eCenterViewport']/div[@ref='eCenterContainer']/div[@row-index='0']/div[2]")).click();
        browser.sleep(10000);
        //Uncheck delay Task
        var uncheck_delay = element(by.xpath("//app-checkbox[2]//div[1]//button[1]//span[1]//mat-icon[1]"));
        //browser.wait(EC.visibilityOf(uncheck_delay), 10000);
        uncheck_delay.click();
        browser.sleep(1000);
        //1. Filtering the tasks
        var mouse2 = element(by.xpath("//div[@ref='eLabel']/span[contains(text(),'Task Name')]"));
        //browser.actions().mouseMove(mouse2).perform();
        browser.executeScript("arguments[0].click()", mouse2);
        element(by.xpath("//div[@ref='ePinnedLeftHeader']/descendant::span[@ref='eMenu']/span[@class='ag-icon ag-icon-menu']")).click();
        browser.sleep(1000);
        element(by.xpath("//div[@class='ag-menu ag-ltr']/div[1]/div[@ref='tabHeader']/span[2]/span[@class='ag-icon ag-icon-filter']")).click();
        browser.sleep(2000);
        //Click on filter check box to uncheck
        //browser.actions().mouseMove(element(by.xpath("//label[@ref='eSelectAllContainer']/div[@ref='eSelectAll']/span[contains(@class,'ag-icon-checkbox-checked')]"))).click().perform();
        var c12 = element(by.xpath("//label[@ref='eSelectAllContainer']/div[@ref='eSelectAll']/span[contains(@class,'ag-icon-checkbox-checked')]"));
        browser.executeScript("arguments[0].click()", c12);
        browser.sleep(2000);
        element(by.xpath("//div[@class='ag-input-wrapper']/input[@placeholder='Search...']")).sendKeys('' + MEC['R2'].v + '');
        browser.sleep(1000);
        //Click again on filter check box
        var f12 = element(by.css("div[class='ag-filter-header-container'] label[ref='eSelectAllContainer'] div[ref='eSelectAll'] span"));
        browser.executeScript("arguments[0].click()", f12);
        browser.sleep(1000);
        //Apply Filter and click
        var fc12 = element(by.xpath("//div[@ref='eButtonsPanel']/button[contains(text(),'Apply Filter')]"));
        browser.executeScript("arguments[0].click()", fc12);
        browser.sleep(1000);
        //browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
        element(by.xpath("//p[contains(text(),'PROGRAM')]")).click();
        browser.sleep(1000);
        //Clicking on edit button
        mecsanitypom.edit_approverstatus();
        //Change the status
        mecsanitypom.change_approverstatus();
        browser.sleep(1000);
        //Change it into approved
        element(by.xpath("//span[contains(text(),'" + MEC['BF2'].v + "')]")).click();
        browser.sleep(1000);
        //3. Click on Submit button
        element(by.xpath("//span[contains(text(),'Submit')]")).click().then(() => {
            browser.sleep(5000);
        })
    });

    it('TS:-16 Submitting control checklist by approver', function () {
        //Checklist submission
        var checklist_submission = element(by.xpath("//app-mec-task-view-tasks[1]/div[1]/div[1]/ag-grid-angular[1]/div[1]/div[2]/div[1]/div[3]/div[3]/div[1]/div[@col-id='checklist']/span[1]/div[1]"));
        checklist_submission.isPresent().then(function (t1) {
            console.log(t1);
            if (t1 == true) {
                //Click on checklist option
                element(by.xpath("//app-mec-task-view-tasks[1]/div[1]/div[1]/ag-grid-angular[1]/div[1]/div[2]/div[1]/div[3]/div[3]/div[1]/div[@col-id='checklist']/span[1]/div[1]")).click();

                //Enable pass/fail in checklist tab
                element(by.xpath("//div[@formarrayname='checkListContentReqs']/mat-card/form/div/app-checkbox/div/button/span/mat-icon[contains(text(),' check_box_outline_blank')]")).click();
                browser.sleep(1000);

                //Add comments
                element(by.xpath("//div/textarea[@placeholder='Comment...']")).sendKeys('' + MEC['BE2'].v + '');
                //6. Add attachments
                var fileToUpload = 'C:/Users/SandipNandi/Project/SingleTouchAutomationAvnet/MEC/MECSanityQADatasheet.xlsx';
                var absolutepath = path.resolve(__dirname, fileToUpload);
                $('input[type="file"]').sendKeys(absolutepath);
                browser.sleep(2000);

                //Click on submit
                element(by.xpath("//span[contains(text(),'Submit')]")).click();
                element(by.xpath("//span[contains(text(),'YES')]")).click();
                browser.sleep(1000);
            }
        });
        browser.sleep(10000);
        var avtar = element(by.css("button span[class='mat-button-wrapper'] div img[class='avatar']"));
        browser.executeScript("arguments[0].scrollIntoView();", avtar).then(() => {
            avtar.click();
        });
        element(by.xpath("//button[contains(text(),'Signout')]")).click();
        browser.sleep(8000);
    });
});

