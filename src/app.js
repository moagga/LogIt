var qLog = qLog || {};
qLog.settings = {};
qLog.settings.dateFormat = 'dd/MM/yyyy';

qLog.Tasks = new qLog.TaskCollection();
new qLog.EditView();
new qLog.SummaryView();
