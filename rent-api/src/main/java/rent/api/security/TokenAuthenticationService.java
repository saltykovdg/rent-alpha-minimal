package rent.api.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import rent.api.utils.Constants;
import rent.common.entity.UserEntity;
import rent.common.repository.UserRepository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.util.Collections;
import java.util.Date;

@Service
public class TokenAuthenticationService {
    private static final Logger log = LoggerFactory.getLogger(TokenAuthenticationService.class);

    private static final long EXPIRATION_TIME = 864_000_000; // 10 days
    private static final String SECRET = "ed748327-9432-4cbb-a35f-bc2bc823cba3";
    private static final String CLAIM_USERNAME = "username";
    private static final String CLAIM_NAME = "name";
    private static final String CLAIM_ROLE = "role";

    static void addAuthentication(HttpServletResponse res, String username, UserRepository userRepository) {
        try {
            UserEntity user = userRepository.findByLogin(username);
            Algorithm algorithmHS = Algorithm.HMAC512(SECRET);
            String jwt = JWT.create()
                    .withSubject(username)
                    .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                    .withClaim(CLAIM_USERNAME, username)
                    .withClaim(CLAIM_ROLE, user.getRole().getName())
                    .sign(algorithmHS);
            res.addHeader(Constants.HEADER_AUTHORIZATION, jwt);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    static Authentication getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(Constants.HEADER_AUTHORIZATION);
        if (token != null) {
            try {
                Algorithm algorithm = Algorithm.HMAC512(SECRET);
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT jwt = verifier.verify(token);
                Claim claim = jwt.getClaim(CLAIM_USERNAME);
                String user = claim.asString();
                if (user == null) return null;
                return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
            } catch (UnsupportedEncodingException | JWTVerificationException e) {
                log.error(e.getMessage());
            }
        }
        return null;
    }
}
