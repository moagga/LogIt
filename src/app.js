var LogIt = LogIt || {};
LogIt.settings = {};
LogIt.settings.dateFormat = 'dd/MM/yyyy';

LogIt.Tasks = new LogIt.TaskCollection();
new LogIt.EditView();
new LogIt.SummaryView();
