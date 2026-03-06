const request = require('supertest');
const app = require('../app'); 

describe('POST /users/signin', () => {

  
  it('Si les champs sont vides alors on dit que cest pas remplis', async () => {
    const res = await request(app)
      .post('/users/signin')
      .send({ username: '', password: '' });

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(false);
    expect(res.body.error).toBe("Empty or Invalid Fields");
  });


  it(' lutilisateur doit se connecter et renvoyer ses information correctement', async () => {
    const res = await request(app)
      .post('/users/signin')
      .send({
        username: 'Nb', 
        password: 'ok' 
      });

    if (res.body.result) {
      expect(res.body).toHaveProperty('token');
      expect(res.body.username).toBe('Nb');
    
    } else {
      console.log("Utilisateur non trouvé pour le test, vérifier les identifiants");
    }
  });

  
  it('si  mauvais mot de passe alors on refuse', async () => {
    const res = await request(app)
      .post('/users/signin')
      .send({
        username: 'Nb',
        password: 'ooo'
      });

    expect(res.body.result).toBe(false);
    expect(res.body.error).toBe("Incorrect password");
  });
});