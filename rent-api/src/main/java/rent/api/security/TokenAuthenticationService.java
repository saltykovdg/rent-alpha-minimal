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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import rent.api.utils.Constants;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TokenAuthenticationService {
    private static final Logger log = LoggerFactory.getLogger(TokenAuthenticationService.class);

    private static final long EXPIRATION_TIME = 86400 * 1000; // 1 days
    private static final String SECRET = "ed748327-9432-4cbb-a35f-bc2bc823cba3";
    private static final String CLAIM_ROLE = "role";

    static void addAuthentication(HttpServletResponse res, String username, String role) {
        try {
            Algorithm algorithmHS = Algorithm.HMAC512(SECRET);
            String jwt = JWT.create()
                    .withSubject(username)
                    .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                    .withClaim(CLAIM_ROLE, role)
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
                String user = jwt.getSubject();
                if (user == null) return null;
                Claim claimRole = jwt.getClaim(CLAIM_ROLE);
                String role = claimRole.asString();
                List<GrantedAuthority> authorities = new ArrayList<>(1);
                if (role != null) {
                    authorities.add(new SimpleGrantedAuthority(role));
                }
                return new UsernamePasswordAuthenticationToken(user, null, authorities);
            } catch (UnsupportedEncodingException | JWTVerificationException e) {
                log.error(e.getMessage());
            }
        }
        return null;
    }
}
