using System;
using System.Security.Cryptography;

namespace Middleware
{
    public class Encryptor: IEncryptor
    {
        private static readonly int saltSize = 40;
        private static readonly int iterationsCount = 10000;

        public string GetSalt(string value)
        {
            var saltBytes = new byte[saltSize];
            var rng = RandomNumberGenerator.Create();
            rng.GetBytes(saltBytes);

            return Convert.ToBase64String(saltBytes);
        }

        public string GetHash(string value, string salt)
        {
            var pbkdf2 = new Rfc2898DeriveBytes(value, GetBytes(salt), iterationsCount);

            return Convert.ToBase64String(pbkdf2.GetBytes(saltSize));
        }

        private static byte[] GetBytes(string value)
        {
            var bytes = new byte[value.Length + sizeof(char)];
            Buffer.BlockCopy(value.ToCharArray(), 0, bytes, 0, bytes.Length);

            return bytes;
        }
    }
}
