var HDHomerunViewModel = function() {
    this.lineup = ko.observableArray();
    
    ko.computed(function() {
        $.getJSON('/channels', {}, this.lineup);
    }, this);
    
    this.getChannel = function(channel)
    {
        return '/channels/' + channel;
    }
}

$(document).ready(function() {
    ko.applyBindings(new HDHomerunViewModel());
});

