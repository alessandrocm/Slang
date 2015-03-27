var Message = require('./../lib/slackMessage').Message
  , Attachment = require('./../lib/slackMessage').Attachment
  , expect = require('chai').expect
  , should = require('chai').should();

describe('SlackAttachment',function(){
  describe('#contructor',function(){
    it('should return instance of SlackAttachment',function(done){
      var target = new Attachment('fallback text','blue');
      expect(target).to.be.instanceof(Attachment);
      done();
    });
    it('should initialize properties',function(done){
      var target = new Attachment('fallback text','blue');
      expect(target).to.have.property('fallback')
        .that.equals('fallback text');
      expect(target).to.have.property('color')
        .that.equals('blue');
      expect(target).to.have.property('fields')
        .to.be.instanceof(Array);
      done();
    });
  });
  describe('#addField',function(){
    it('should add field object to fields Array',function(done){
      var target = new Attachment('fallback text','blue');
      target.addField('title text','value text',true);
      expect(target).to.have.deep.property('fields[0].title')
        .that.equals('title text');
      expect(target).to.have.deep.property('fields[0].value')
        .that.equals('value text');
      expect(target).to.have.deep.property('fields[0].short')
        .that.equals(true);
      done();
    });
  });
});

describe('SlackMessage',function(){
  describe('#constructor',function(){
    it('should return instance of SlackMessage',function(done){
      var target = new Message('test text', '#channel','user',':smiley_face:');
      expect(target).to.be.instanceof(Message);
      done();
    });

    it('should initialize properties.',function(done){
      var target = new Message('test text', '#channel','user',':smiley_face:');
      expect(target).to.have.property('text')
        .that.equal('test text');
      expect(target).to.have.property('channel')
        .that.equal('#channel');
      expect(target).to.have.property('username')
        .that.equal('user');
      expect(target).to.have.property('icon_emoji')
        .that.equal(':smiley_face:');
      expect(target).to.have.property('attachments')
        .that.deep.equals([]);
      done();
    });
  });
  describe('#addAttachment',function(){
    it('should add attachment object to attachments array',function(done){
      var target = new Message('test','#channel','user',':smiley_face:');
      var attachment = new Attachment('fallback text','blue');
      target.addAttachment(attachment);
      expect(target).to.have.deep.property('attachments[0].fallback')
        .that.equals('fallback text');
      expect(target).to.have.deep.property('attachments[0].color')
        .that.equals('blue');
      expect(target).to.have.deep.property('attachments[0].fields')
        .that.equals([]);
      done();
    });
  });
});
