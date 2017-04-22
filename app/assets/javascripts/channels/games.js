App.messages = App.cable.subscriptions.create('GamesChannel', {  
  received: function(data) {
    $("#games").removeClass('hidden')
    return $('#games').append("<p>" + data.winner + "</p>");
  }
});
