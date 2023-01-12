window.watsonAssistantChatOptions = {
    integrationID: "36111b20-9883-49c3-9e04-df0110afe0c3", // The ID of this integration.
    region: "us-east", // The region your integration is hosted in.
    serviceInstanceID: "bf5215e7-2cf7-4fb7-8bda-09d547f261d0", // The ID of your service instance.
    onLoad: function(instance) { instance.render(); }
};

setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
});

