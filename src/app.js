var LogIt = LogIt || {};
LogIt.Tasks = new LogIt.TaskCollection();
new LogIt.EditView();
new LogIt.SummaryView();
LogIt.Settings.init(function(){
	console.log('Loading data');
	LogIt.ds.init();
});
