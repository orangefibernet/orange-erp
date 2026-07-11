import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ProvisionOnuDto {
  /**
   * GPON Port
   * Example:
   * 1/5/9
   */
  @IsString()
  @IsNotEmpty()
  ponPort: string;

  /**
   * ONU ID on PON
   * Example:
   * 1
   */
  @IsInt()
  @Min(1)
  onuId: number;

  /**
   * ONU Serial Number
   * Example:
   * ZTEGD1A97068
   */
  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  /**
   * ONU Type Template
   * Must match the template configured on the OLT.
   *
   * Example:
   * zte-f670l
   */
  @IsString()
  @IsNotEmpty()
  onuType: string;

  /**
   * Line Profile
   *
   * Example:
   * SMARTOLT-1G-UP
   */
  @IsString()
  @IsNotEmpty()
  lineProfile: string;

  /**
   * Service Profile
   *
   * Example:
   * SMARTOLT-VOIPMNG-10M
   */
  @IsString()
  @IsNotEmpty()
  serviceProfile: string;

  /**
   * ONU Name
   *
   * Example:
   * 9704313555
   */
  @IsOptional()
  @IsString()
  name?: string;

  /**
   * ONU Description
   *
   * Example:
   * zone_ANAPARTHY_descr_CHITYANYA
   */
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * Customer VLAN
   *
   * Example:
   * 100
   */
  @IsOptional()
  @IsInt()
  userVlan?: number;

  /**
   * Service VLAN
   *
   * Example:
   * 100
   */
  @IsOptional()
  @IsInt()
  serviceVlan?: number;

  /**
   * Management VLAN
   *
   * Example:
   * 300
   */
  @IsOptional()
  @IsInt()
  managementVlan?: number;

  /**
   * ONU Authentication Mode
   *
   * Supported:
   * sn
   * sn+pw
   * sn+hpw
   * pw
   * loid
   *
   * Example:
   * sn
   */
  @IsOptional()
  @IsString()
  authenticationMode?: string;
}