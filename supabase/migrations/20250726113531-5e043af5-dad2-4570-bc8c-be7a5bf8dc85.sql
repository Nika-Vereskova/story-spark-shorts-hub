-- Fix the remaining has_role function with different signature
CREATE OR REPLACE FUNCTION public.has_role(role_name text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM auth.auth_roles
        WHERE role_name = has_role.role_name
        AND auth_roles.role_name = (SELECT role FROM auth.jwt_claims(current_setting('request.jwt.claim.sub', true)))
    );
END;
$function$;